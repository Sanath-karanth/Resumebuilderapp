import React, { useState } from 'react';
import '../css/feedback.css'
import { useAuth } from "../contexts/AuthContext"
import {Navbar,Nav, Card, Form, Button, Container,Alert, Row, Col } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import ReactStars from 'react-stars'
import { Formik } from 'formik';


function FeedbackScreen() {

    const navigate = useNavigate();
    const { createdata } = useAuth();
    const [usernameval, setUsernameval] = useState('');
    const [feedbackval, setFeedbackval] = useState('');
    const [alertshowsuccess, setAlertshowsuccess] = useState(false);
    const [alertshowfail, setAlertshowfail] = useState(false);
    const [rate,setRate] = useState(5);
    var interval = null;

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

    const timeoutfinish = () => {
        clearInterval(interval);
        setAlertshowsuccess(false);
        setAlertshowfail(false);
        navigate("/home");
    }

    const handleSubmit = async(values) => {
        interval = setTimeout(timeoutfinish, 3000);
        let userstorevalue = localStorage.getItem('UserName');
        if(userstorevalue === usernameval)
        {
          console.log("username equal");
          setAlertshowfail(true);
          setAlertshowsuccess(false);
        }
        else
        {
            console.log("username not equal");
            localStorage.setItem('UserName',usernameval);
            let uniqueID = Math.floor(Math.random() * 1000);
            let formfielddata = {uniqueID,usernameval,feedbackval,rate}
            try {
              await createdata('feedbackdata',formfielddata)
              console.log("db created");
              setAlertshowfail(false);
              setAlertshowsuccess(true);
              values.username = ""
              values.feedback = ""
            } catch(err) {
              console.log(err);
              setAlertshowfail(true);
            }
        }
      }

    return (
        <>
        <div className="AppContainer">
            <Container fluid className="p-0" >
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

           <Container fluid className='pb-4'>
             <Row>
                <Col xs="12" sm="1" md="3" lg="3" xl="4" xxl="4"></Col>
                <Col xs="12" sm="10" md="6" lg="6" xl="4" xxl="4">
                    <Card className='mt-4 p-2' 
                      style={{width:'100%'}}
                      >
                    <Card.Body>
                        <h4 className="text-center mb-3 Loginheadtext">Feedback Form</h4>
                            <Alert show={alertshowsuccess} variant="success">Thanks for your valuable feedback.</Alert>
                            <Alert show={alertshowfail} variant="danger">You have already submitted your feedback!</Alert>
                        <Formik 
                            initialValues={{ username: usernameval, feedback: feedbackval }}
                            validate={validate}
                            onSubmit={handleSubmit}
                            >
                        {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (

                        <Form>        
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
                            <Form.Group id="rating">
                                <div className='rating-cont'>
                                    <Form.Label className="labeltext" >
                                        Rating 
                                    </Form.Label>
                                    <p>
                                        (<span className='ratechange'> {rate} </span>
                                        /
                                        <span className='ratefixed'> 5 </span>)
                                    </p>
                                </div>
                                
                                <ReactStars
                                    count={5}
                                    value={rate}
                                    onChange={ratingChange}
                                    size={30}
                                    color={'#ffd700'} />
                            </Form.Group>
                            
                            <Button type="submit"
                                    onClick={handleSubmit}
                                    className="w-100 mt-4 mb-2 buttontext">SUBMIT
                            </Button>
                        </Form>
                        )}
                        </Formik>   
                    </Card.Body>
                    </Card>
                    </Col>
                    <Col xs="12" sm="1" md="3" lg="3" xl="4" xxl="4"></Col>
                </Row>
           </Container>
        </div>
    </>
    );
}

export default FeedbackScreen;