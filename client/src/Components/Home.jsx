import {Row,Col, Button, Container, Image, Alert} from "react-bootstrap"
import { Link } from "react-router-dom"

function Home(props){
    return (
        
        <Row>
            <Col className="text-center mt-5">
                <Image src="app_img\title.png" height={200} width={400} className="bg-black rounded-pill border border-4 border-info p-3 my-auto"></Image>
                {props.message && 
                    <Alert className="my-3" variant={props.message.type} onClose={() => props.setMessage('')} dismissible>{props.message.msg}</Alert>
                }
                <p className="text-above bg-form p-3 border border-3 border-dark rounded mx-5 my-4">Play Now a single round or Login to expand your WDYM experience</p>
                <Link to={"/round"}><Button onClick={()=>props.handleMeme(true)} data-bs-theme='dark' variant="outline-light" className='btn-xl bg-nav border border-4 border-dark'>Play Now{' '}<i className="bi bi-play-fill align-middle" style={{fontSize:"70px"}}></i></Button></Link>
            </Col>
        </Row>
    )
}

export {Home}