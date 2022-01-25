import React,{useState} from 'react';
import { Link,useNavigate,useLocation  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAngleLeft, faUser, faEnvelope, faPhone, faSuitcase,faInfoCircle,faLightbulb, faGraduationCap, faCalendar } from '@fortawesome/free-solid-svg-icons'
import {Navbar,Nav,Container,Row,Col,Button,Card,Modal,Tooltip,OverlayTrigger, Accordion} from 'react-bootstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import YearPicker from "react-year-picker";
import '../css/resumeform.css'

const animatedComponents = makeAnimated();

function ResumeformScreen(props) {

    const navigate = useNavigate();
    const {state} = useLocation();
    const { resumeid,resumename } = state;
    // console.log("resume id is "+resumeid);
    // console.log("resume id is "+resumename);

    const [modalShow, setModalShow] = useState(false);
    const [suggestmodalShow, setSuggestmodalShow] = useState(false);
    const [fresherForm, setFresherForm] = useState(true);
    const [experienceForm, setExperienceForm] = useState(false);
    const [isselectLoading, setIsselectLoading] = useState(true);
    const [progSelectval, setProgSelectval] = useState('');
    const [eduSelectval, setEduSelectval] = useState('');
    const [yearfromval, setFromyearval] = useState('');
    const [yeartoval, setToyearval] = useState('');


    const programSelect = (newValue, actionMeta) => {
        // console.log("selected value is "+progSelectval);
        // setProgSelectval(e.target.value);
        // toggleLoading(true);
        if (newValue === null || newValue == '') {
            newValue = [0];
          }
          const array = [];
          newValue.map((obj) => {
            array.push(obj.value);
            setProgSelectval(array)
            console.log("array-->", array);
          });
          setIsselectLoading(false);
    }

    const yearfromSelect = (date) => {
        setFromyearval(date);
    }

    const yeartoSelect = (date) => {
        setToyearval(date);
    }

    const educationSelect = (e) => {
        console.log(e.target.value);
        setEduSelectval(e.target.value);
    }

    const InfoClick = () => {
        setSuggestmodalShow(true)
    }

    
    const backClick = (event) => {
        event.preventDefault();
        // navigate(-1)
        // navigate(-2)
        navigate("/", { replace: true });
    }

    const fresherClick = () => {
        setFresherForm(true);
        setExperienceForm(false);
    }

    const experienceClick = () => {
        setFresherForm(false);
        setExperienceForm(true);
    }


    const langOptions = [
        { value: 'HTML', label: 'HTML'},
        { value: 'CSS', label: 'CSS'},
        { value: 'Bootstrap', label: 'Bootstrap'},
        { value: 'C', label: 'C'},
        { value: 'C++', label: 'C++'},
        { value: 'C#', label: 'C#'},
        { value: 'JavaScript', label: 'JavaScript'},
        { value: 'TypeScript', label: 'TypeScript'},
        { value: 'SQL', label: 'SQL'},
        { value: 'PHP', label: 'PHP'},
        { value: 'Java', label: 'Java'},
        { value: 'Python', label: 'Python'},
        { value: 'ReactJS', label: 'ReactJS'},
        { value: 'NodeJS', label: 'NodeJS'},
        { value: 'React-Native', label: 'React-Native'},
        { value: 'Angular', label: 'Angular'},
        { value: 'Swift', label: 'Swift'},
        { value: 'PowerShell', label: 'PowerShell'},
        { value: 'Kotlin', label: 'Kotlin'},
        { value: 'Ruby', label: 'Ruby'},
        { value: 'UiPath', label: 'UiPath'},
        { value: 'Blue Prism', label: 'Blue Prism'},
        { value: 'Automation Anywhere', label: 'Automation Anywhere'},
      ];

      const educationOptions = [
        { eduname: 'B.E', label: 'B.E'},
        { eduname: 'M.Tech', label: 'M.Tech'},
        { eduname: 'MBA', label: 'MBA'},
        { eduname: 'BBA', label: 'BBA'},
        { eduname: 'BCA', label: 'BCA'},
        { eduname: 'MCA', label: 'MCA'},
        { eduname: 'B.Sc', label: 'B.Sc'},
        { eduname: 'M.Sc', label: 'M.Sc'},
        { eduname: 'B.Com', label: 'B.Com'},
        { eduname: 'M.Com', label: 'M.Com'},
        { eduname: 'CA', label: 'CA'},
        { eduname: 'MBBS', label: 'MBBS'},
        { eduname: 'BA', label: 'BA'},
        { eduname: 'B.Pharma', label: 'B.Pharma'},
        { eduname: 'M.Pharma', label: 'M.Pharma'},
        
      ];
    
      
      function SuggesionModal(props) {
        return (
        // <Container>
          <Modal scrollable
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Suggessions for You
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h5>Copy your choice</h5>
            <Card className='m-3'  border="secondary">
                <Card.Header>Front-end Developer</Card.Header>
                <Card.Body>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='m-3'  border="secondary">
                <Card.Header>Back-end Developer</Card.Header>
                <Card.Body>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                </Card.Body>
            </Card>
            
            <Card className='m-3'  border="secondary">
                <Card.Header>Front-end Developer</Card.Header>
                <Card.Body>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className='m-3'  border="secondary">
                <Card.Header>Front-end Developer</Card.Header>
                <Card.Body>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                </Card.Body>
            </Card>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        //   </Container>
        );
      }

      function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="sm"
            // backdrop={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Are you sure?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                All the changes will be lost.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={props.onHide}>NO</Button>
              <Button variant="danger" onClick={backClick}>YES</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    return (
        <div className="AppContainer">
            <Container fluid
                      className="p-0" 
                    //   style={{ paddingLeft: 0, paddingRight: 0 }}
           >
           <Navbar bg="light" expand="lg" className="p-3">
                <Navbar.Brand className='navheadertext' style={{color:'#00008b'}}>Resume Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className='navheadersubtext' onClick={() => setModalShow(true)}>
                        <FontAwesomeIcon size='lg' icon={faAngleLeft} />&nbsp;&nbsp;Back to Home
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            </Container>
             <Container fluid className="pt-4 pb-4">
             <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <SuggesionModal
                show={suggestmodalShow}
                onHide={() => setSuggestmodalShow(false)}
            />
                <Row>
                    <Col sm={7}>
                        <Card className='leftContainer'>
                            
                            <div className='p-4'>
                                <div className='pt-2 pb-2' style={{textAlign: 'center'}}>
                                    <Button 
                                        variant={fresherForm ? 'primary' : 'outline-primary'}
                                        onClick={fresherClick}
                                        >Fresher
                                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button 
                                        variant={experienceForm ? 'secondary' : 'outline-secondary'}
                                        onClick={experienceClick}
                                        >Experienced
                                    </Button>  
                                </div>

                                <div className='pt-2 pb-2'>
                                    <p className='leftcardheadertext text-info'>Complete the Profile:</p>
                                </div>
                                {fresherForm ?
                                <form>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label htmlFor="firstname" className="pb-2">Full Name:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faUser} />
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Enter your Full name"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname" className="pb-2">Role:</label>
                                                <select className="form-control form-select">
                                                    <option>Fresher</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label htmlFor="firstname" className="pb-2">Email-ID:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faEnvelope} />
                                                    </div>
                                                </div>
                                                <input type="email" className="form-control" placeholder="Enter your Email address"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname" className="pb-2">Phone No:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon rotation={90} icon={faPhone} />
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Enter your 10-digit phone number"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-12">
                                            <label htmlFor="firstname" style={{paddingRight:10}} className="pb-2">Career Objective / Summary: </label>
                                            
                                            <OverlayTrigger 
                                                overlay={
                                                <Tooltip id="tooltip-disabled">Suggession</Tooltip>
                                                }>
                                                <span className="d-inline-block" onClick={InfoClick}>
                                                <FontAwesomeIcon size='lg'
                                                                 className="infoIcon" 
                                                                 color="green" 
                                                                 icon={faInfoCircle} />
                                                </span>
                                            </OverlayTrigger>
                                           
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon icon={faSuitcase} />
                                                    </div>
                                                </div>
                                                <textarea className="form-control" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border d-md-block"></div>

                                    <div className="row mb-4 mt-4">
                                    <p className='leftcardskilltext text-info'>Select your skills:</p>
                                        <div className="col-md-12 mb-3">
                                            {/* <label htmlFor="lastname" className="pb-2">Phone No:</label> */}
                                            {/* <select className="form-control form-select"
                                                    onChange={programSelect}
                                                    value={progSelectval}
                                                    multiple={true}
                                                    >
                                                 {programmingSkills.map((item,keyindex) => {
                                                     return(
                                                     <option key={keyindex} 
                                                             value={item.langval}>
                                                         {item.langname}
                                                     </option>)
                                                 })} 
                                            </select> */}

                                            <Select
                                                closeMenuOnSelect={true}
                                                isMulti
                                                isClearable={false}
                                                // onMenuClose={toggleLoading}
                                                isLoading={isselectLoading}
                                                components={animatedComponents}
                                                // defaultValue={[colourOptions[4], colourOptions[5]]}
                                                onChange={programSelect}
                                                isMulti
                                                options={langOptions}
                                            />
                                            <span>Selected option: {progSelectval}</span>
                                        </div>
                                    </div>

                                    <div className="border d-md-block"></div>

                                        <div className="row mb-2 mt-4">
                                            <p className='leftcardprojecttext text-info'>Projects:</p>           
                                        </div>


                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Project 1</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="row mb-4 mt-3">
                                                        <div className="col-md-8">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text h-100">
                                                                        <FontAwesomeIcon  icon={faLightbulb} />
                                                                    </div>
                                                                </div>
                                                                <input type="email" className="form-control" placeholder="Enter your project Name"></input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            
                                                        </div>
                                                    </div>

                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 1" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 2" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 3" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 4" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Project 2 (Optional)</Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="row mb-4 mt-3">
                                                        <div className="col-md-8">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text h-100">
                                                                        <FontAwesomeIcon  icon={faLightbulb} />
                                                                    </div>
                                                                </div>
                                                                <input type="email" className="form-control" placeholder="Enter your project Name"></input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            
                                                        </div>
                                                    </div>

                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 1" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 2" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 3" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-4">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 4" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                    <div className="border d-md-block"></div>

                                    <div className="row mb-4 mt-4">
                                    <p className='leftcardskilltext text-info'>Education details:</p>
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Select Degree: </label>  
                                            <select className="form-control form-select"
                                                    onChange={educationSelect}
                                                    value={eduSelectval}
                                                    >
                                                    {educationOptions.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.eduname}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname" className="pt-2 pb-2">Enter the Stream:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon icon={faGraduationCap} />
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder="Example: Computer Science"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6 pb-2">
                                            <label htmlFor="yearfrom" className="pb-2">Year From:</label>
                                            <div className="input-group h-50">
                                            <YearPicker 
                                                onChange={yearfromSelect} 
                                                />
                                                
                                            </div>

                                            {/* <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faCalendar} />
                                                    </div>
                                                </div>
                                                <select className="form-control form-select">
                                                    <option>2010</option>
                                                    <option>2011</option>
                                                    <option>2012</option>
                                                    <option>2013</option>
                                                    <option>2014</option>
                                                    <option>2015</option>
                                                    <option>2016</option>
                                                    <option>2017</option>
                                                    <option>2018</option>
                                                    <option>2019</option>
                                                    <option>2020</option>
                                                    <option>2021</option>
                                                    <option>2022</option>
                                                </select>
                                            </div> */}

                                        </div>
                                        <div className="col-md-6 pb-2">
                                            <label htmlFor="yearto" className="pb-2">Year To:</label>
                                            <div className="input-group h-50">
                                            <YearPicker 
                                                onChange={yeartoSelect} 
                                                />
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mt-4 pt-4 d-grid"> 
                                        <Button variant="dark" size="md" >
                                            SUBMIT 
                                        </Button>
                                    </div>
                                   
                                </form>
                                :
                                <form>
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <label htmlFor="firstname">dsds Name:</label>
                                            <input type="text" className="form-control" placeholder="Last name"></input>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastname">dsd Name:</label>
                                            <input type="text" className="form-control" placeholder="Last name"></input>
                                        </div>
                                    </div>
                                   
                                </form>
                                }

                                


                            </div>
                        </Card>
                    </Col>
                    <Col sm={5}>
                        <Card>
                            <p>Forms 2</p>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        </div>
    );
}

export default ResumeformScreen;