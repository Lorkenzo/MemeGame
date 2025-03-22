import { Row,Col,Button,Image, Container,ButtonGroup,Alert ,Card, CardImg} from "react-bootstrap"
import { useState,useEffect } from "react";
import API from "../API/API.mjs"
import { captions } from "../classes/meme.mjs";
import { roundRecording, match } from "../classes/match.mjs";
import { Route, useNavigate, Routes } from "react-router-dom";
import { SummaryCard } from "./EndMatch";
import dayjs from "dayjs";

function MatchLayout(props){

    return (
        <Routes>
            <Route path="/" element={
                <Round 
                user={props.user}
                loggedIn={props.loggedIn} 
                handleMeme={props.handleMeme} 
                meme={props.meme} 
                captions={props.captions} 
                rounds={props.roundsRecording}
                setRoundsRecording={props.setRoundsRecording} 
                setScore={props.setScore} 
                score={props.score}
                >     
                </Round>
            }/>

            <Route path="/end" element={
                <SummaryCard rounds={props.roundsRecording} score={props.score} loggedIn={props.loggedIn} handleMeme={props.handleMeme}></SummaryCard>
            }/>
            
        </Routes>
    )
}

function Round(props){
    const [isWaiting, setIsWaiting] = useState(false);
    const [round, setRound] = useState(1);
    const [group1, setGroup1] = useState([]);
    const [group2, setGroup2] = useState([]);
    const [ansMessage, setansMessage] = useState("");
    const [count, setCount] = useState(30);
    const [currRound,setCurrRound] = useState("");
    const [end,setEnd] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{
        const handleEndMatch = async () => {
            try{
                if(props.loggedIn){
                    
                    const mid= await API.newMatch(dayjs().format("YYYY-MM-DD"))
    
                    for (let r of props.rounds){
                        await API.newRound(mid,r)
                    }
    
                    await API.updateScore(props.score)

                }
                navigate("end",{relative:"path"})
            }catch(err){
                console.log(err);
            }
        };
        if (round==3 && end==true) handleEndMatch();
    },[end])

    const handleRound = () =>{
        
        if (props.loggedIn && round<3){ 
            setansMessage("");
            setCurrRound("");
            props.handleMeme();
            setIsWaiting(false);
            setRound(r => r + 1);   
        }
        else if (props.loggedIn && round==3){
            setEnd(true);
        }
        else{
            navigate("end",{relative:"path"})
        } 
    }

    const handleAnswer = async (caption) =>{
        let color;
        let recordround;
        try{
            setIsWaiting(true);

            const res = await API.checkCaption(props.meme,caption.id)
            
            if(res==false) {
                setansMessage({msg:"Wrong! 0 Points" , type: 'danger'})
                color="bg-danger"  
                recordround = new roundRecording(caption,props.meme,0,color);
            }
            else{
                setansMessage({msg:"Correct! 5 Points" , type: 'success'})
                color="bg-success"
                recordround = new roundRecording(caption,props.meme,5,color);
                props.setScore(prevScore=>prevScore+5)
            }
            
            if (props.rounds.length==0) props.setRoundsRecording([recordround])
            else props.setRoundsRecording([...props.rounds,recordround])
            setCurrRound(recordround)

        }catch(err){
            console.log("Errore")
        }

        setTimeout(() => {
            handleRound();
            setCount(30)
            }, 3000);
    }

    const divideCaptions = () => {
        setGroup1(props.captions.slice(0, 4));
        setGroup2(props.captions.slice(4, 7));
    };

    useEffect(() => {
        divideCaptions();
    }, [props.captions]);

    return (
        <Row>   
            <Col md={3} className="position-relative d-flex align-items-center justify-content-center">
                <Card className="text-center w-100 bg-nav">
                    <Card.Header className="bg-form">Guess the meme caption</Card.Header>
                    <Card.Body>
                        <Image src={props.meme.path} alt="meme" className="d-block mx-auto" style={{ maxHeight: '400px', maxWidth:'300px', objectFit: 'contain' }} />
                        {ansMessage && 
                            //<AlertMessage ansMessage={ansMessage} className="position-absolute top-0 start-0 w-100"></AlertMessage>
                            <Alert className={`d-flex bg-${ansMessage.type} text-white`} >
                                <Alert.Heading>{ansMessage.msg}</Alert.Heading>
                            </Alert>
                        }
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4} className="d-block">
                <ButtonGroup className="btn-group-vertical w-100" vertical>
                    {group1.map((c)=><MemeCaptions handleAnswer={handleAnswer} key={c.id} caption={c} ansMessage={ansMessage} currRound={currRound} isWaiting={isWaiting}></MemeCaptions>)}
                </ButtonGroup>
            </Col>
            <Col md={4} className="d-block">
                <ButtonGroup className="btn-group-vertical w-100" vertical>
                    {group2.map((c)=><MemeCaptions handleAnswer={handleAnswer} key={c.id} caption={c} ansMessage={ansMessage} currRound={currRound} isWaiting={isWaiting}></MemeCaptions>)}
                    <Timer handleAnswer={handleAnswer} count={count} setCount={setCount} isWaiting={isWaiting}></Timer>
                </ButtonGroup>
                {props.loggedIn &&<div className={`score-square bg-${isWaiting?ansMessage.type:"form"} ${isWaiting?"text-white":"text-dark"} border border-2 border-dark`}>{isWaiting?`+ ${currRound.score}`: `Score: ${props.score}`}</div>}
            </Col>
        </Row>  
    )
}

function MemeCaptions(props){
    
    const [color,setColor] = useState("bg-nav")
    
    useEffect(()=>{
        try{
        const getCapColor = async () =>{
            
            if (props.currRound){
                if (props.caption.id==props.currRound.cap.id) setColor(props.currRound.color);
                if (props.currRound.score==0){
                    const check = await API.checkCaption(props.currRound.img,props.caption.id)
                    if (check) setColor("bg-success")
                } 
            }
            else{
                setColor("bg-nav")
            }
        }
        getCapColor();
        }
        catch(err){
            console.log(err)
        } 
    
    },[props.currRound])
    
    return(
        <>
            <Button onClick={()=>props.handleAnswer(props.caption)} className={`meme-caption-btn text-btn btn-xl ${color} mx-2 my-3 border border-4 border-dark`} disabled={props.isWaiting}>
                {props.caption.text}
            </Button>
        </>
    )
}

function Timer(props){
    
    useEffect(()=>{

        const tid = setTimeout(() => {
            
            if (props.count>0 && !props.isWaiting) props.setCount(prevCount => prevCount -1);
            else if (props.count==0 && !props.isWaiting) props.handleAnswer(new captions(0,"No answer given"));
            
        }, 1000);

        return () => clearTimeout(tid);
    },[props.count])

    return (
        <>
            <div className="counter-circle border border-2 border-dark">
                {props.isWaiting?"--":props.count}
            </div>
        </>
    )
}

export {MatchLayout}