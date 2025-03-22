import { Row,Col,Card, Button } from "react-bootstrap";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

function SummaryCard(props){
    const [message,setMessage] = useState("");

    useEffect(()=>{
        if(props.loggedIn){
            if(props.score==0) setMessage({text:"Not well! I know you are smart, but you have to apply!",type:"danger"})
            else if(props.score==5) setMessage({text:"Well! But i know you can do better!",type:"warning"})
            else if(props.score==10) setMessage({text:"Nice! You got 2 of 3, continue playing!",type:"success"})
            else if(props.score==15) setMessage({text:"Perfect! You are a meme Master!",type:"success"})
        }
        else {
            if(props.score==0) setMessage({text:"Try again or Login to record your improvements",type:"danger"})
            else setMessage({text:"Continue Playing or Login to record your scores",type:"success"})
        }
        
    },[])

    return(
        <>
        <Row>
            <Col md={6} className="mx-auto">
                <Card
                    border="dark"
                    bg="info"
                    key="info"
                    text='dark'
                    style={{height:"auto"}}
                    className="border border-3 p-5 rounded-3 text-center my-auto"
                >
                {props.loggedIn? <Card.Header as="h3" className={`bg-${message.type} rounded border border-2 border-dark text-white`}>You got {props.score} points!</Card.Header>:
                                <Card.Header as="h3" className={`bg-${message.type} rounded border border-2 border-dark text-white`}>{props.score>0?"Correct!":"Wrong!"}</Card.Header>
                }

                <Card.Body>
                    <Card.Text as="h4"> {message.text} </Card.Text>
                        <Row>
                        {props.loggedIn && [...props.rounds].filter(e=>e.score>0).map((r,i)=>{
                            return(
                            <Col key={i} className="my-1">
                            <>
                            <Card.Img src={r.img.path} className="d-block mx-auto border border-2 border-dark bg-white my-2" alt={`Immagine ${i + 1}`} style={{ maxHeight: '200px', objectFit: 'contain' }}/>
                            <Card.Header className="bg-nav text-white p-3 border border-2 border-dark my-2">{r.cap.text}</Card.Header>
                            </>
                            </Col>
                            )
                        })}
                        </Row>
                        <Card.Footer className={`bg-${message.type} rounded border border-2 border-dark mt-2`}>
                            <Row>
                            <Col>
                                <Link to={"/round"}><Button onClick={()=>props.handleMeme(true)} variant="outline-light" className="btn-md bg-nav mx-auto my-auto border border-dark">Play Again</Button></Link>
                            </Col>
                            <Col>
                                <Link to={'/'} ><Button data-bs-theme='dark' variant="outline-dark" className='btn-md bg-bd mx-auto my-auto text-white'>Back Home</Button></Link>
                            </Col>
                            </Row>
                        </Card.Footer>
                </Card.Body>
                </Card>
            </Col>
        </Row>
        </>
    
    )
}

export {SummaryCard}
