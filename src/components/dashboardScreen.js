import React, { useState, useEffect } from 'react';
import '../css/dashboard.css'
import Loader from '../common/loader'
import { useNavigate  } from "react-router-dom";
import {Navbar,Nav,Container,Row,Col,Button,Card,Modal} from 'react-bootstrap'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faQuestionCircle, faCommentDots, faHeart } from '@fortawesome/free-solid-svg-icons'



const DashboardScreen = () => {

    const [RadioVal, setRadioVal] = useState('Resume 1');
    const [idVal, setIdVal] = useState(97);
    const navigate = useNavigate();
    let currentyear = moment().format('YYYY');
    const [instructionmodalShow, setInstructionmodalShow] = useState(false);
    const [reviewshow, setReviewshow] = useState(false);
    const [spin, setSpin] = useState(true);

    const handleRadioChange = (e) => {
        console.log("radio value is "+ e.target.id)
        setRadioVal(e.target.value)
        setIdVal(e.target.id);
    }

    const filterforImage = (item) => {
        if(item.resumeName === RadioVal)
        {
            return true
        }
        else
        {
            return false
        }
    }

    const InstructionClick = () => {
        setInstructionmodalShow(true)
    }

    const reviewstoreCheck = async() => {
        let userstorevalue = localStorage.getItem('UserName');
        if(userstorevalue === "sanathorthotech")
        {
            setReviewshow(true);
        }
        else
        {
            setReviewshow(false);
        }
    }

    const proceedClick = () => {
        navigate("/resumeform", { replace: true , state: {resumeid: idVal, resumename: RadioVal }});
    }

    const feedbackClick = () => {
        navigate("/feedback");
    }

    const reviewClick = () => {
        navigate("/review");
    }

    const homeClick = () => {
        navigate("/home");
    }

    const resumeData = [
        {
            resumeID:97,
            resumeName:'Resume 1',
            labelOption:'option-1',
            resumeImg:'../resumes/Resume1.jpg'
        },
        {
            resumeID:98,
            resumeName:'Resume 2',
            labelOption:'option-2',
            resumeImg:'../resumes/Resume2.jpg'
        }
    ]

    function InstructionsModal(props) {
        return (
          <Modal scrollable
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Instructions
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className='m-3'  border="secondary">
                    <Card.Header style={{color:'red'}}><span className='asteriskkey'>*</span> Important Instructions</Card.Header>
                    <Card.Body>
                        <Card.Text style={{color:'green'}}>
                            <ol>
                                <li>Please fill all the details in the form to get the complete resume.</li>
                                <li>After filling all the details in the form, Go to the end of the form and click the button to get the Generate PDF button.</li>
                                <li><b><u>Note:</u></b> Resume will be restricted to only one page of PDF. So, Fill the details with short descriptions.</li>
                                <li>Kindly use <b>Laptop</b>, <b>Desktop</b> or <b>Mobile Desktop Site's</b> Chrome for generating resume with proper PDF layout.</li>
                                <li>Kindly Request you to please provide your valuable <b>feedback</b> at the end.</li>
                            </ol>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

      useEffect(() => {
        reviewstoreCheck();
      },[]);

      useEffect(() => {
        if (spin) {
          setTimeout(() => setSpin(false), 2000);
        }
      }, [spin]);

    return (
        
        <div className="AppContainer">
            {spin ? <Loader /> : null}
           <Container fluid
                      className="p-0" 
           >
           <Navbar bg="light" expand="lg" className="p-3">
                <Navbar.Brand className='navheadertext' style={{color:'#00008b'}}>Resume Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                                className='navheadersubtext'
                                onClick={homeClick}>
                            <FontAwesomeIcon icon={faHome} />
                            {' '}Home
                        </Nav.Link>
                        <Nav.Link 
                            className='navheadersubtext ' 
                            onClick={InstructionClick}>
                                <FontAwesomeIcon icon={faQuestionCircle} color={'green'} />
                            {' '}Instructions
                        </Nav.Link>
                        { reviewshow &&
                        <Nav.Link className='navheadersubtext ' 
                            onClick={reviewClick}>
                                <FontAwesomeIcon icon={faHeart} color={'red'} />
                            {' '}Reviews
                        </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link 
                                className='navheadersubtext ' 
                                onClick={feedbackClick}>
                                    <FontAwesomeIcon icon={faCommentDots} color={'blue'} /> 
                                {' '}Feedback
                            </Nav.Link>
                        </Nav>
                </Navbar.Collapse>
            </Navbar>
            </Container>

            <Container fluid className="pt-4 pb-4">
            <p className='mandatoryinfotext'><span className='asteriskkey'>*</span> Please read all the <b>Instructions</b> present within the Menubar before proceed!</p>
            <InstructionsModal
                show={instructionmodalShow}
                onHide={() => setInstructionmodalShow(false)}
            />
                <Row>
                    <Col xs="12" sm="5" md="4" lg="4" xl="4" xxl="4">
                        <Card>
                            <Card.Body>
                                <p className='selecttext'>Select the Resume:</p>
                                {resumeData.map((item,key) => {
                                    return(
                                    <div key={key} className="wrapper" style={{backgroundColor: RadioVal === item.resumeName ? '#f5fffa': '#FFFFFF'}}>   
                                        <label>
                                            <input
                                                type="radio" 
                                                id={item.resumeID} 
                                                name='Radio' 
                                                value={item.resumeName}
                                                onChange={handleRadioChange}
                                                checked={RadioVal === item.resumeName? true: false}
                                                >
                                            </input>
                                            <span>{item.resumeName}</span>
                                        </label>
                                    </div>
                                    )
                                })}
                            </Card.Body>
                        </Card>
                        <div className="d-grid pt-3 pb-3">
                            <Button variant="dark" size="md" onClick={proceedClick}>
                                PROCEED 
                            </Button>
                        </div>
                        
                    </Col>
                    <Col xs="12" sm="7" md="8" lg="8" xl="8" xxl="8">
                        <Card>
                           <div
                            style={{
                                padding:50,
                                justifyContent:'center',
                                alignItems:'center',
                                alignContent:'center'
                            }}>
                               
                               <Card 
                                style={{justifyContent:'center',
                                        alignItems:'center',
                                        alignContent:'center'}}>
                               {resumeData.filter(filterforImage).map((item,key) => {
                                    return(
                                    <img 
                                        key={key} 
                                        src={item.resumeImg} 
                                        alt={item.resumeName} 
                                        width="100%" 
                                        height="auto"> 
                                    </img>)
                                })}
                               </Card> 
                            </div>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
            <div className="mt-4 pt-2"></div>
            <div className="footer">
                <p className='footertext'>Copyright &#169; {currentyear}. All Rights Reserved</p>
            </div>
            </div>
    );
}

export default DashboardScreen;