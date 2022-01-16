import React, { Fragment,useState } from 'react';
import { Link } from "react-router-dom";
import {Navbar,Nav,Container,Row,Col,Button,Card} from 'react-bootstrap'
import logo from '../logo.svg';


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
                <Navbar.Brand href="#home">Resume Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            </Container>

            <Container fluid className="pt-4">
                <Row>
                    <Col xs={4}>
                        <Card>
                            <Card.Body>
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
                                padding:30,
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
                        <div
                            style={{
                                height: '50rem',
                                width: '50rem',
                                margin: '1rem auto',
                            }}>
                            {/* <embed
                                src={'./sample.pdf'}
                                type="application/pdf"
                                height={800}
                                width={800}
                            /> */}
                        </div>
                    </Col>
                </Row>
                
            </Container>
        </div>
    );
}

export default DashboardScreen;