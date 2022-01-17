import React, { Fragment,useState } from 'react';
import { Link } from "react-router-dom";
import {Navbar,Nav,Container,Row,Col,Button,Card} from 'react-bootstrap'
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookmark } from '@fortawesome/free-solid-svg-icons'
import '../css/dashboard.css'


const DashboardScreen = (props) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    return (
        <div className="AppContainer">
           <Container fluid
                      className="p-0" 
                    //   style={{ paddingLeft: 0, paddingRight: 0 }}
           >
           <Navbar bg="light" expand="lg" className="p-3">
                <Navbar.Brand className='navheadertext' style={{color:'#00008b'}} href="#home">Resume Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className='navheadersubtext' href="#home"><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
                    <Nav.Link className='navheadersubtext' href="#home"><FontAwesomeIcon icon={faBookmark} /> Saved</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            </Container>

            <Container fluid className="pt-4 pb-4">
                <Row>
                    <Col xs={4}>
                        <Card>
                            <Card.Body>
                            <p className='selecttext'>Select the Resume:</p>
                                <Card>
                                    <Card.Body>This is some text within a card body.</Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={8}>
                        <Card>
                           <div
                            style={{
                                // height: '50rem',
                                // width: '50rem',
                                // margin: 50 ,
                                padding:50,
                                justifyContent:'center',
                                alignItems:'center',
                                alignContent:'center'
                            }}>
                            <embed
                                src={'./sample.pdf'}
                                type="application/pdf"
                                height={600}
                                // width={600}
                                width="100%"
                            />
                        </div>
                        </Card>
                        {/* <div
                            style={{
                                height: '50rem',
                                width: '50rem',
                                margin: '1rem auto',
                            }}>
                        </div> */}
                    </Col>
                </Row>
                
            </Container>
        </div>
    );
}

export default DashboardScreen;