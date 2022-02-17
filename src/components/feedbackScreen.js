import React, { useState } from 'react';
import {Navbar,Nav, Card, Form, Button, Container,Alert, Row, Col } from 'react-bootstrap';
import { Link,useNavigate  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import ReactStars from 'react-stars'
import { Formik } from 'formik';
import '../css/feedback.css'
import { useAuth } from "../contexts/AuthContext"

function FeedbackScreen(props) {

    const navigate = useNavigate();
    const { getAlldata,createdata,deletedata } = useAuth();
    const [usernameval, setUsernameval] = useState('');
    const [feedbackval, setFeedbackval] = useState('');
    const [rate,setRate] = useState(4);

    const homeClick = () => {
        navigate("/home");
    }

    const backClick = () => {
        navigate(-1);
    }

    const ratingChange = (newRating) => {
        setRate(newRating);
      }

      const validate = (values) => {
        const errors = {};
    
        if (!values.username) {
            errors.username = '* Username is required.';
        }else if (!/^[A-Za-z\b\s]+$/.test(values.username)) {
            errors.username = 'Please enter a Valid username.';
        }

        if (!values.feedback) {
            errors.feedback = '* Feedback is required!';
            }else if (!/^[a-zA-Z0-9\&\)\(\+\/\.\,\:\;\'\"\-\b\s ]+$/g.test(values.feedback)) {
            errors.feedback = 'Please enter the valid characters.';
        }
    
        return errors;
    };

    return (
        <>
        <div className="AppContainer">
            
            <Container fluid className="p-0" >
                <Navbar bg="light" expand="lg" className="p-3 ">
                    <Navbar.Brand className='navheadertext' style={{color:'#00008b'}} href="#home">Resume Builder</Navbar.Brand>
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

            <div className="feedbackcontainer pb-2">
                <Card className='mt-4 p-2' style={{width:'70vH'}}>
                <Card.Body>
                    <h4 className="text-center mb-3 Loginheadtext">Feedback Form</h4>
                    
                    <Formik 
                        initialValues={{ username: usernameval, feedback: feedbackval }}
                        validate={validate}
                        >
                    {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                    <Form 
                    // onSubmit={handleSubmit}
                    >
                        
                        
                        <Form.Group id="username" className='mb-3'>
                            <Form.Label className="labeltext pb-1">User Name</Form.Label>
                            <Form.Control type="text" 
                                          placeholder="Enter Full name"
                                          autoComplete='off' 
                                          id="placeholdertext"
                                          name="username" 
                                          value={values.username}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setUsernameval(e.target.value)}
                                            }
                                        ></Form.Control>
                        </Form.Group>
                        { errors.username &&
                            <div className='errortext mb-2'>
                                {errors.username}
                            </div>
                        }
                        <Form.Group id="password" className='mb-3'>
                            <Form.Label className="labeltext pb-1">Feedback</Form.Label>
                            <Form.Control type="text"
                                          as="textarea" 
                                          style={{ height: '100px' }}
                                          placeholder="Enter your Valuable Feedback" 
                                          id="placeholdertext"
                                          name="feedback"
                                          value={values.feedback}
                                          onChange={(e) => {
                                            handleChange(e);
                                            setFeedbackval(e.target.value)}
                                        } 
                                          ></Form.Control>
                        </Form.Group>
                        { errors.feedback &&
                            <div className='errortext mb-2'>
                                {errors.feedback}
                            </div>
                        }
                        <Form.Group id="password">
                            <Row style={{marginBottom:-15}} >
                                <Col md={2}>
                                    <Form.Label className="labeltext" >
                                        Rating 
                                    </Form.Label>
                                </Col>
                                <Col md={3} style={{paddingLeft:4}}>
                                    <p>(<span className='ratechange'> {rate} </span>
                                    /
                                    <span className='ratefixed'> 5 </span>)</p>
                                </Col>
                                <Col md={7}></Col>
                            </Row>
                            
                            <ReactStars
                                count={5}
                                value={rate}
                                onChange={ratingChange}
                                size={30}
                                color={'#ffd700'} />
                        </Form.Group>
                        
                        <Button type="submit"
                                // disabled={loading} 
                                className="w-100 mt-4 mb-2 buttontext">SUBMIT
                        </Button>
                    </Form>
                    )}
                    </Formik>   
                </Card.Body>
                </Card>
            </div>
        </div>
    </>
    );
}

export default FeedbackScreen;