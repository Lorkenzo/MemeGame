import { useEffect, useState } from "react"
import { Row,Col,Card } from "react-bootstrap"
import API from "../API/API.mjs"

function ProfileLog(props){
    const [matches,setMatches] =useState([])
    const [userScore,setUserScore] = useState()

    useEffect(()=>{
        const getMatches = async () =>{
            try{
                const usermatches = await API.getMatches();
                setMatches(usermatches);
                const score= await API.getUpdatedScore();
                setUserScore(score);
                    
            }catch(err){
                console.log(err)
            }
        }
        getMatches();
    },[])

    return(
        <>
        <Row>
            <Col md={8} className="mx-auto">
                <Card
                    border="dark"
                    bg="info"
                    key="info"
                    text='dark'
                    style={{height:"auto"}}
                    className="border border-3 p-5 rounded-3 text-center my-auto"
                >
                    <Card.Header className="bg-bd text-white p-2 rounded border border-4 border-dark" as="h2">Player Profile</Card.Header>
                    <Row>
                        <Col md="8">
                            <Card.Text className="bg-nav text-white mt-4 p-2 mx-auto rounded border border-4 border-dark" as="h4">Username : {props.user.username}</Card.Text>
                            <Card.Text className="bg-nav text-white mt-4 p-2 mx-auto rounded border border-4 border-dark" as="h4">Total Score : {userScore}</Card.Text>
                        </Col>
                        <Col md="4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-person-vcard" viewBox="0 -1 16 16">
                            <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
                            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
                            </svg>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={8} className="mx-auto">
                {matches.map((m)=><MatchCard key={m.id} match={m}></MatchCard>)}
            </Col>
        </Row>
        </>
    )
}

function MatchCard(props){
    const [rounds,setRounds] = useState([]);

    useEffect(()=>{
        const getMatch = async () =>{
            try{
                const r = await API.getRounds(props.match.id)
                setRounds(r)
            }catch(err){
                console.log(err)
            }
        }
        getMatch()
    },[])

    return(
        <>{rounds.length==3 &&
            <Card
            border="dark"
            bg="info"
            key="info"
            text='dark'
            style={{height:"auto"}}
            className="border border-3 p-5 rounded-3 text-center my-2"
            >
            <Card.Header className="bg-bd text-white p-2 rounded border border-4 border-dark mx-5" as="h3"> Match Score : {rounds[0].score +rounds[1].score+rounds[2].score}</Card.Header>
            <Card.Body>
                <Row>
                    {rounds.map((r,i)=>{
                        let bg = r.score==0?"bg-danger":"bg-success";
                        return(
                            <Col key={i} className="my-1">
                                <Card.Header className={`${bg} text-white p-3 border border-2 border-dark`}>+ {r.score}</Card.Header>
                                <Card.Img src={r.img} className="d-block mx-auto border border-2 border-dark bg-white my-2" alt={`Immagine ${i + 1}`} style={{ maxHeight: '200px', objectFit: 'contain' }}/>
                                <Card.Text as="h6" className="bg-nav text-white p-3 border border-2 border-dark my-2">Given Answer: <br/> <br/>{r.cap}</Card.Text>
                            </Col>
                            )
                    })}
                </Row>
            </Card.Body>
            <Card.Footer className="bg-bd text-white rounded border border-4 border-dark mx-5" as="h5">Match Date: {props.match.date}</Card.Footer>
        </Card>
    }
    </>
    )
}

export {ProfileLog}