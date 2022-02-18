import React from 'react';
import {Navbar,Nav,Container,Row,Col,Button,Card,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useNavigate  } from "react-router-dom";

const ReviewScreen = () => {

    const navigate = useNavigate();

    const homeClick = () => {
        navigate("/home");
    }

    const backClick = () => {
        navigate(-1);
    }


    return (
        <div className="AppContainer">

            <Container fluid className="p-0 mb-4" >
                <Navbar bg="light" expand="lg" className="p-3 ">
                    <Navbar.Brand className='navheadertext' style={{color:'#00008b'}}>Resume Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='navheadersubtext text-dark' onClick={homeClick}>
                                <FontAwesomeIcon icon={faHome} />&nbsp;&nbsp;Home
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link className='navheadersubtext text-primary' onClick={backClick}>
                                    <FontAwesomeIcon size='lg' icon={faAngleLeft} />&nbsp;&nbsp;Back
                                </Nav.Link>
                            </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>


            <Container  className="p-0" >
                <Card>
                    <Card.Header>Sanath</Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>
                            Good review
                        </p>
                        <footer className="blockquote-footer">
                            Rating: <span className='text-danger'>4</span>
                        </footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default ReviewScreen;