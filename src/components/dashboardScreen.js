import React, { Fragment,useState } from 'react';
import { Link,useNavigate  } from "react-router-dom";
import {Navbar,Nav,Container,Row,Col,Button,Card} from 'react-bootstrap'
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBookmark } from '@fortawesome/free-solid-svg-icons'
import '../css/dashboard.css'


const DashboardScreen = (props) => {

    const [RadioVal, setRadioVal] = useState('Resume 1');
    const [idVal, setIdVal] = useState(97);
    const navigate = useNavigate();

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

    const proceedClick = () => {
        navigate("/resumeform", { state: {resumeid: idVal, resumename: RadioVal }});
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
                    <Col sm={4}>
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
                    <Col sm={8}>
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
                            {/* <embed
                                src={'./sample.pdf'}
                                type="application/pdf"
                                height={600}
                                // width={600}
                                width="100%"
                            /> */}
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