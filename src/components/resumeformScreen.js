import React,{useState , useEffect} from 'react';
import { Link,useNavigate,useLocation  } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAngleLeft, faUser, faEnvelope, 
         faPhone, faSuitcase,faInfoCircle,
         faLightbulb,faGraduationCap, faAward, faCalendar, 
         faBriefcase, faCommentDots, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import {Navbar,Nav,Container,Row,Col,Button,Card,Modal,Tooltip,OverlayTrigger, Accordion} from 'react-bootstrap'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import moment from 'moment';
import YearPicker from "react-year-picker";
import Pdf from "react-to-pdf";
import { Formik } from 'formik';
import '../css/resumeform.css'
import Loader from '../common/loader'
import { langOptions, educationOptions, monthNames, yearData, 
        yearfromData, yeartoData, roleOptions, summarysuggestOptions } from "../json/json"

const animatedComponents = makeAnimated();

function ResumeformScreen(props) {

    const navigate = useNavigate();
    const pdffileref = React.createRef();
    const {state} = useLocation();
    let currentyear = moment().format('YYYY');
    const [spin, setSpin] = useState(true);
    const { resumeid,resumename } = state;
    console.log("resume id is "+resumeid);
    console.log("resume id is "+resumename);

    const [modalShow, setModalShow] = useState(false);
    const [genbuttonvisible, setGenbuttonvisible] = useState(false)
    const [suggestmodalShow, setSuggestmodalShow] = useState(false);
    const [instructionmodalShow, setInstructionmodalShow] = useState(false);
    const [fresherForm, setFresherForm] = useState(true);
    const [experienceForm, setExperienceForm] = useState(false);
    const [isselectLoading, setIsselectLoading] = useState(true);
    const [progSelectval, setProgSelectval] = useState('');
    const [eduSelectval, setEduSelectval] = useState('B.E');
    const [monthfrom, setMonthfrom] = useState('January');
    const [monthto, setMonthto] = useState('');
    const [certificateMonth, setCertificateMonth] = useState('January');
    const [certificateYear, setCertificateyear] = useState('2020');
    const [yearfromval, setFromyearval] = useState('2015');
    const [yeartoval, setToyearval] = useState('2019');


    const [fullnamefresher, setFullnamefresher] = useState('');
    const [emailfresher, setEmailfresher] = useState('');
    const [phonefresher, setPhonefresher] = useState('');
    const [summaryfresher, setSummaryfresher] = useState('');

    const [skillnullfresher, setSkillnullfresher] = useState(false);

    const [projectonefresher, setProjectonefresher] = useState('');
    const [projectonerolefresher, setProjectonerolefresher] = useState('');
    const [projectonetech1fresher, setProjectonetech1fresher] = useState('');
    const [projectonetech2fresher, setProjectonetech2fresher] = useState('');
    const [projectonetech3fresher, setProjectonetech3fresher] = useState('');
    const [projectonepoint1fresher, setProjectonepoint1fresher] = useState('');
    const [projectonepoint2fresher, setProjectonepoint2fresher] = useState('');
    const [projectonepoint3fresher, setProjectonepoint3fresher] = useState('');

    const [projecttwofresher, setProjecttwofresher] = useState('');
    const [projecttworolefresher, setProjecttworolefresher] = useState('');
    const [projecttwotech1fresher, setProjecttwotech1fresher] = useState('');
    const [projecttwotech2fresher, setProjecttwotech2fresher] = useState('');
    const [projecttwotech3fresher, setProjecttwotech3fresher] = useState('');
    const [projecttwopoint1fresher, setProjecttwopoint1fresher] = useState('');
    const [projecttwopoint2fresher, setProjecttwopoint2fresher] = useState('');
    const [projecttwopoint3fresher, setProjecttwopoint3fresher] = useState('');

    const [isChecked, setIsChecked] = useState(false);

    const [streamfresher, setStreamfresher] = useState('');
    const [universityfresher, setUniversityfresher] = useState('');

    const [coursenamefresher, setCoursenamefresher] = useState('');
    const [platnamefresher, setPlatnamefresher] = useState('');

    const [exproleSelectval,setExproleSelectval] = useState('Software Engineer');

    const [isworkChecked2, setIsworkChecked2] = useState(false);
    const [isworkChecked3, setIsworkChecked3] = useState(false);

    const [ispresentChecked1, setIspresentChecked1] = useState(false);
    const [ispresentChecked2, setIspresentChecked2] = useState(false);
    const [ispresentChecked3, setIspresentChecked3] = useState(false);

    const [disablemontheyear1, setDisablemontheyear1] = useState(false);
    const [disablemontheyear2, setDisablemontheyear2] = useState(false);
    const [disablemontheyear3, setDisablemontheyear3] = useState(false);

    const [companynamework1, setCompanynamework1] = useState('');
    const [companylocation1, setCompanylocation1] = useState('');
    const [rolework1, setRolework1] = useState('');
    const [workonemonthfromval, setWorkonemonthfromval] = useState('January');
    const [workonemonthtoval, setWorkonemonthtoval] = useState('May');
    const [workoneyearfromval, setWorkoneFromyearval] = useState('2015');
    const [workoneyeartoval, setWorkoneToyearval] = useState('2019');
    const [workonepoint1exp, setWorkonepoint1exp] = useState('');
    const [workonepoint2exp, setWorkonepoint2exp] = useState('');

    const [companynamework2, setCompanynamework2] = useState('');
    const [companylocation2, setCompanylocation2] = useState('');
    const [rolework2, setRolework2] = useState('');
    const [worktwomonthfromval, setWorktwomonthfromval] = useState('January');
    const [worktwomonthtoval, setWorktwomonthtoval] = useState('May');
    const [worktwoyearfromval, setWorktwoFromyearval] = useState('2015');
    const [worktwoyeartoval, setWorktwoToyearval] = useState('2019');
    const [worktwopoint1exp, setWorktwopoint1exp] = useState('');
    const [worktwopoint2exp, setWorktwopoint2exp] = useState('');

    const [companynamework3, setCompanynamework3] = useState('');
    const [companylocation3, setCompanylocation3] = useState('');
    const [rolework3, setRolework3] = useState('');
    const [workthreemonthfromval, setWorkthreemonthfromval] = useState('January');
    const [workthreemonthtoval, setWorkthreemonthtoval] = useState('May');
    const [workthreeyearfromval, setWorkthreeFromyearval] = useState('2015');
    const [workthreeyeartoval, setWorkthreeToyearval] = useState('2019');
    const [workthreepoint1exp, setWorkthreepoint1exp] = useState('');
    const [workthreepoint2exp, setWorkthreepoint2exp] = useState('');

    const options = {
        orientation: 'portrait',
        unit: 'in',
        format: fresherForm ? [8,14] : [8,16]
    };


    const programSelect = (newValue, actionMeta) => {
        if (newValue === null || newValue == '') {
            newValue = [0];
            setSkillnullfresher(true);
          }
          else
          {
            setSkillnullfresher(false);
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

    const expRoleSelect = (e) => {
        setExproleSelectval(e.target.value);
    }

    const monthfromSelect = (e) => {
        setMonthfrom(e.target.value);
    }

    const monthtoSelect = (e) => {
        setMonthto(e.target.value);
    }

    const workonemonthfromSelect = (e) => {
        setWorkonemonthfromval(e.target.value);
    }
    const workonemonthtoSelect = (e) => {
        setWorkonemonthtoval(e.target.value);
    }

    const worktwomonthfromSelect = (e) => {
        setWorktwomonthfromval(e.target.value);
    }
    const worktwomonthtoSelect = (e) => {
        setWorktwomonthtoval(e.target.value);
    }

    const workthreemonthfromSelect = (e) => {
        setWorkthreemonthfromval(e.target.value);
    }
    const workthreemonthtoSelect = (e) => {
        setWorkthreemonthtoval(e.target.value);
    }

    const yearfromdropdownSelect = (e) => {
        setFromyearval(e.target.value);
    }

    const yeartodropdownSelect = (e) => {
        setToyearval(e.target.value);
    }

    const workoneyearfromSelect = (e) => {
        setWorkoneFromyearval(e.target.value);
    }

    const workoneyeartoSelect = (e) => {
        setWorkoneToyearval(e.target.value);
    }

    const worktwoyearfromSelect = (e) => {
        setWorktwoFromyearval(e.target.value);
    }

    const worktwoyeartoSelect = (e) => {
        setWorktwoToyearval(e.target.value);
    }

    const workthreeyearfromSelect = (e) => {
        setWorkthreeFromyearval(e.target.value);
    }

    const workthreeyeartoSelect = (e) => {
        setWorkthreeToyearval(e.target.value);
    }

    const certificatemonthSelect = (e) => {
        setCertificateMonth(e.target.value);
    }

    const certificateyearSelect = (e) => {
        setCertificateyear(e.target.value);
    }

    const InfoClick = () => {
        setSuggestmodalShow(true)
    }

    const InstructionClick = () => {
        setInstructionmodalShow(true)
    }
    
    const backClick = (event) => {
        event.preventDefault();
        // navigate(-1)
        // navigate(-2)
        navigate("/home", { replace: true });
    }

    const feedbackClick = () => {
        navigate("/feedback");
    }

    const fresherClick = () => {
        setFresherForm(true);
        setExperienceForm(false);
    }

    const experienceClick = () => {
        setFresherForm(false);
        setExperienceForm(true);
    }

    const prject2checkClick = () => {
        setIsChecked(!isChecked);
      };

      const work2checkClick = () => {
        setIsworkChecked2(!isworkChecked2);
      };

      const work3checkClick = () => {
        setIsworkChecked3(!isworkChecked3);
      };

      const present1checkClick = () => {
        setIspresentChecked1(!ispresentChecked1);
        setDisablemontheyear1(!disablemontheyear1);
      };

      const present2checkClick = () => {
        setIspresentChecked2(!ispresentChecked2);
        setDisablemontheyear2(!disablemontheyear2);
      };

      const present3checkClick = () => {
        setIspresentChecked3(!ispresentChecked3);
        setDisablemontheyear3(!disablemontheyear3);
      };

      const scrollToTop = () =>{
        setGenbuttonvisible(true);
        window.scrollTo({
          top: 0, 
          behavior: 'smooth'
        });
      };

    const freshervalidate = (values) => {
        const errors = {};
    
        if (!values.fusername) {
            errors.fusername = 'Username is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.fusername)) {
            errors.fusername = 'Please enter a Valid username.';
        }

        if (!values.femail) {
            errors.femail = 'Email ID is required!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.femail)) {
            errors.femail = 'Please enter a Valid Email ID.';
        }

        if (!values.fphoneno) {
            errors.fphoneno = 'Phone no is required!';
            }else if (!/[6-9]\d{9}$/i.test(values.fphoneno)) {
            errors.fphoneno = 'Please enter a Valid 10-digit phone number.';
        }

        if (!values.fsummary) {
            errors.fsummary = 'Career Objective / Summary is required!';
            }else if (!/^[a-zA-Z0-9\&\)\(\+\/\.\,\:\;\'\"\-\b\s ]+$/g.test(values.fsummary)) {
            errors.fsummary = 'Please enter the valid characters only.';
        }

        if (!values.fprojectonename) {
            errors.fprojectonename = 'Project name is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.fprojectonename)) {
            errors.fprojectonename = 'Please enter a Valid Alphanumerical Characters only.';
        }

        if (!values.fprojectonerole) {
            errors.fprojectonerole = 'Project Role is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.fprojectonerole)) {
            errors.fprojectonerole = 'Please enter a Valid Alphanumerical Characters only.';
        }

        if (!values.fprojectonetech1 || !values.fprojectonetech2 || !values.fprojectonetech3) {
            errors.fprojectonetech1 = 'Please enter Atleast 3-4 Technologies.';
        }

        if (!values.fprojectonepoint1 || !values.fprojectonepoint2) {
            errors.fprojectonepoint1 = 'Please enter Atleast 2-3 Points.';
        }

        if (!values.fprojecttwotech1 || !values.fprojecttwotech2 || !values.fprojecttwotech3) {
            errors.fprojecttwotech1 = 'Please enter Atleast 3-4 Technologies.';
        }

        if (!values.fprojecttwopoint1 || !values.fprojecttwopoint2) {
            errors.fprojecttwopoint1 = 'Please enter Atleast 2-3 Points.';
        }

        if (!values.fstream) {
            errors.fstream = 'Education stream is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.fstream)) {
            errors.fstream = 'Please enter a valid Alpha Characters only.';
        }

        if (!values.funiversity) {
            errors.funiversity = 'University name is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.funiversity)) {
            errors.funiversity = 'Please enter a valid Alpha Characters only.';
        }

        if (!values.fcoursename) {
            errors.fcoursename = 'Course name is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.fcoursename)) {
            errors.fcoursename = 'Please enter a valid Alpha Characters only.';
        }

        if (!values.fplatform) {
            errors.fplatform = 'Platform name is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.fplatform)) {
            errors.fplatform = 'Please enter a valid Alpha Characters only.';
        }

        if (!values.ecompanyname) {
            errors.ecompanyname = 'Company name is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.ecompanyname)) {
            errors.ecompanyname = 'Please enter a valid Alpha Characters only.';
        }

        if (!values.ecompanylocation) {
            errors.ecompanylocation = 'Company location is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.ecompanylocation)) {
            errors.ecompanylocation = 'Please enter a valid Alpha Characters only.';
        }

        if (!values.erole) {
            errors.erole = 'Role is required!';
            }else if (!/^[A-Za-z\b ]+$/.test(values.erole)) {
            errors.erole = 'Please enter a valid Alpha Characters only.';
        }

        return errors;
    };
    
      
      function SuggesionModal(props) {
        return (
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
                {summarysuggestOptions.map((item,key) => {
                    return (
                        <Card key={key} className='m-3'  border="secondary">
                            <Card.Header >{item.role}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {item.summary}
                                </Card.Text>
                            </Card.Body>
                        </Card>)
                })}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
      }

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
                                <li>After filling all the detials in the form, Go to the end of the form and click the button to get the Generate PDF button.</li>
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
                    //   style={{ paddingLeft: 0, paddingRight: 0 }}
           >
           <Navbar bg="light" expand="lg" className="p-3">
                <Navbar.Brand className='navheadertext' style={{color:'#00008b'}}>Resume Builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link 
                        className='navheadersubtext' 
                        onClick={() => setModalShow(true)}>
                        <FontAwesomeIcon size='lg' icon={faAngleLeft} color={'black'} />
                        &nbsp;&nbsp;Back to Home
                    </Nav.Link>
                    <Nav.Link 
                            className='navheadersubtext' 
                            onClick={InstructionClick}>
                                <FontAwesomeIcon icon={faQuestionCircle} color={'green'} />
                            {' '}Instructions
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link 
                                className='navheadersubtext' 
                                onClick={feedbackClick}>
                                    <FontAwesomeIcon icon={faCommentDots} color={'blue'} /> 
                                {' '}Feedback
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
            <InstructionsModal
                show={instructionmodalShow}
                onHide={() => setInstructionmodalShow(false)}
            />
                <Row>
                    <Col md={5}>
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
                                    <p className='leftcardmandatorytext text-danger'>
                                        <span className='asteriskkey'>*</span> Please fill all the details in this form to get the complete resume.</p>
                                    <p className='leftcardheadertext text-info'>Complete the Profile:</p>
                                </div>
{/* -----------------------  Fresher Form   --------------------- */}
                                {fresherForm ?
                                <Formik initialValues={{ 
                                        fusername: fullnamefresher, 
                                        femail: emailfresher , 
                                        fphoneno: phonefresher , 
                                        fsummary: summaryfresher ,
                                        fprojectonename: projectonefresher ,
                                        fprojectonerole: projectonerolefresher ,
                                        fprojectonetech1: projectonetech1fresher ,
                                        fprojectonetech2: projectonetech2fresher ,
                                        fprojectonetech3: projectonetech3fresher ,
                                        fprojectonepoint1: projectonepoint1fresher ,
                                        fprojectonepoint2: projectonepoint2fresher ,
                                        fprojectonepoint3: projectonepoint3fresher ,
                                        fprojecttwoname: projecttwofresher ,
                                        fprojecttworole: projecttworolefresher ,
                                        fprojecttwotech1: projecttwotech1fresher ,
                                        fprojecttwotech2: projecttwotech2fresher ,
                                        fprojecttwotech3: projecttwotech3fresher ,
                                        fprojecttwopoint1: projecttwopoint1fresher ,
                                        fprojecttwopoint2: projecttwopoint2fresher ,
                                        fprojecttwopoint3: projecttwopoint3fresher ,
                                        fstream: streamfresher ,
                                        funiversity: universityfresher ,
                                        fyearfrom: yearfromval ,
                                        fyearto: yeartoval,
                                        fcoursename: coursenamefresher,
                                        fplatform: platnamefresher }} 
                                // onSubmit={createPurchaseOrder} 
                                validate={freshervalidate}
                                >
                                  {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                                    <>
                                    <div className="row mb-4">
                                        <div className="col-md-6 p-2">
                                            <label htmlFor="firstname" className="pb-2">Full Name<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faUser} />
                                                    </div>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Full name"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setFullnamefresher(e.target.value)}
                                                    }
                                                    value={values.fusername}
                                                    name="fusername">
                                                </input>
                                            </div>
                                            { errors.fusername &&
                                                    <div className='errortext pt-2'>
                                                        {errors.fusername}
                                                    </div>
                                            }
                                        </div>
                                        <div className="col-md-6 p-2">
                                            <label htmlFor="lastname" className="pb-2">Role:</label>
                                                <select className="form-control form-select">
                                                    <option>Fresher</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-md-6 p-2">
                                            <label htmlFor="firstname" className="pb-2">Email-ID<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faEnvelope} />
                                                    </div>
                                                </div>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    placeholder="Email address"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setEmailfresher(e.target.value)}
                                                    }
                                                    value={values.femail}
                                                    name="femail">
                                                </input>
                                            </div>
                                            { errors.femail &&
                                                    <div className='errortext pt-2'>
                                                        {errors.femail}
                                                    </div>
                                            }
                                        </div>
                                        <div className="col-md-6 p-2">
                                            <label htmlFor="lastname" className="pb-2">Phone No<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon rotation={90} icon={faPhone} />
                                                    </div>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter 10-digit number"
                                                    maxLength="10"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setPhonefresher(e.target.value)}
                                                    }
                                                    value={values.fphoneno}
                                                    name="fphoneno">
                                                </input>
                                            </div>
                                            { errors.fphoneno &&
                                                    <div className='errortext pt-2'>
                                                        {errors.fphoneno}
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-12">
                                            <label htmlFor="firstname" style={{paddingRight:10}} className="pb-2">Career Objective / Summary<span className='asteriskkey'>*</span></label>
                                            
                                            <OverlayTrigger 
                                                overlay={
                                                <Tooltip id="tooltip-disabled">Suggession</Tooltip>
                                                }>
                                                <span className="d-inline-block" onClick={InfoClick}>
                                                <FontAwesomeIcon size='lg'
                                                                 className="infoIcon" 
                                                                 color="green" 
                                                                 icon={faInfoCircle} /> Click me
                                                </span>
                                            </OverlayTrigger>
                                           
                                            <div className="input-group mb-0">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon icon={faSuitcase} />
                                                    </div>
                                                </div>
                                                <textarea 
                                                    className="form-control" 
                                                    rows="3"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setSummaryfresher(e.target.value)}
                                                    }
                                                    value={values.fsummary}
                                                    name="fsummary">
                                                </textarea>
                                            </div>
                                            { errors.fsummary &&
                                                    <div className='errortext pt-2'>
                                                        {errors.fsummary}
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="border d-md-block"></div>

                                    <div className="row mb-4 mt-4">
                                    <p className='leftcardskilltext text-info'>Select your skills <span className='asteriskkey'>*</span></p>
                                        <div className="col-md-12 mb-0">
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
                                            {/* <span>Selected option: {progSelectval}</span> */}
                                        </div>
                                        { skillnullfresher === true &&
                                                <div className='errortext pt-3'>
                                                    Please select Atleast 3-4 Skills.
                                                </div>
                                        }
                                    </div>

                                    <div className="border d-md-block"></div>

                                        <div className="row mb-2 mt-4">
                                            <p className='leftcardprojecttext text-info'>Projects:</p>           
                                        </div>


                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Project 1 <span className='asteriskkey'>*</span></Accordion.Header>
                                                <Accordion.Body>
                                                    <div className="row mb-4 mt-3">
                                                        <div className="col-md-7 p-2">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text h-100">
                                                                        <FontAwesomeIcon  icon={faLightbulb} />
                                                                    </div>
                                                                </div>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Project Name"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonefresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonename}
                                                                    name="fprojectonename">
                                                                </input>
                                                            </div>
                                                            { errors.fprojectonename &&
                                                                    <div className='errortext pt-2'>
                                                                        {errors.fprojectonename}
                                                                    </div>
                                                            }
                                                        </div>
                                                        
                                                        <div className="col-md-5 p-2">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Role(Ex:Developer)"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonerolefresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonerole}
                                                                    name="fprojectonerole">
                                                                </input>
                                                            </div>
                                                            { errors.fprojectonerole &&
                                                                    <div className='errortext pt-2'>
                                                                        {errors.fprojectonerole}
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="row mb-2">
                                                    <p className='leftcardtechnologytext'>Technologies used (Example: Java):</p>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Technology 1"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonetech1fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonetech1}
                                                                    name="fprojectonetech1">
                                                                </input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Technology 2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonetech2fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonetech2}
                                                                    name="fprojectonetech2">
                                                                </input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Technology 3"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonetech3fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonetech3}
                                                                    name="fprojectonetech3">
                                                                </input>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                    <div className="row mb-4">
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Technology 4"></input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Technology 5"></input>
                                                            </div>
                                                        </div>
                                                        { errors.fprojectonetech1 &&
                                                            <div className='errortext pt-2'>
                                                                {errors.fprojectonetech1}
                                                            </div>
                                                        }
                                                    </div>

                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea 
                                                                    className="form-control" 
                                                                    placeholder="Enter point 1" 
                                                                    rows="2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonepoint1fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonepoint1}
                                                                    name="fprojectonepoint1">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea 
                                                                    className="form-control" 
                                                                    placeholder="Enter point 2" 
                                                                    rows="2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonepoint2fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonepoint2}
                                                                    name="fprojectonepoint2">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea 
                                                                    className="form-control" 
                                                                    placeholder="Enter point 3" 
                                                                    rows="2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjectonepoint3fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojectonepoint3}
                                                                    name="fprojectonepoint3">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 4" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    { errors.fprojectonepoint1 &&
                                                            <div className='errortext'>
                                                                {errors.fprojectonepoint1}
                                                            </div>
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Project 2 (Optional)</Accordion.Header>
                                                <Accordion.Body>
                                                <div className="p-2">
                                                    <input
                                                        type="checkbox"
                                                        style={{ 
                                                            height: '15px',
                                                            width: '15px'
                                                        }}
                                                        checked={isChecked}
                                                        onChange={prject2checkClick}
                                                        />
                                                        <span className="leftcardcheckboxtext text-danger">
                                                            &nbsp;&nbsp;Please Checkmark this if Project 2 is required.
                                                        </span>
                                                    </div>
                                                    <div className="row mb-4 mt-3">
                                                        <div className="col-md-7 p-2">
                                                            <div className="input-group">
                                                                <div className="input-group-prepend">
                                                                    <div className="input-group-text h-100">
                                                                        <FontAwesomeIcon  icon={faLightbulb} />
                                                                    </div>
                                                                </div>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Project Name"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttwofresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttwoname}
                                                                    name="fprojecttwoname">
                                                                </input>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-md-5 p-2">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Role(Ex:Developer)"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttworolefresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttworole}
                                                                    name="fprojecttworole">
                                                                </input>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row mb-2">
                                                    <p className='leftcardtechnologytext'>Technologies used (Example: Java):</p>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Technology 1"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttwotech1fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttwotech1}
                                                                    name="fprojecttwotech1">
                                                                </input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Technology 2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttwotech2fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttwotech2}
                                                                    name="fprojecttwotech2">
                                                                </input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    placeholder="Technology 3"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttwotech3fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttwotech3}
                                                                    name="fprojecttwotech3">
                                                                </input>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>

                                                    <div className="row mb-4">
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Technology 4"></input>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 pb-1">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Technology 5"></input>
                                                            </div>
                                                        </div>
                                                        { errors.fprojecttwotech1 &&
                                                            <div className='errortext pt-2'>
                                                                {errors.fprojecttwotech1}
                                                            </div>
                                                        }
                                                    </div>

                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea 
                                                                    className="form-control" 
                                                                    placeholder="Enter point 1" 
                                                                    rows="2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttwopoint1fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttwopoint1}
                                                                    name="fprojecttwopoint1">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea 
                                                                    className="form-control" 
                                                                    placeholder="Enter point 2" 
                                                                    rows="2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttwopoint2fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttwopoint2}
                                                                    name="fprojecttwopoint2">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-2">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea 
                                                                    className="form-control" 
                                                                    placeholder="Enter point 3" 
                                                                    rows="2"
                                                                    onChange={(e) => {
                                                                        handleChange(e);
                                                                        setProjecttwopoint3fresher(e.target.value)}
                                                                    }
                                                                    value={values.fprojecttwopoint3}
                                                                    name="fprojecttwopoint3">
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-md-12">
                                                            <div className="input-group">
                                                                <textarea className="form-control" placeholder="Enter point 4" rows="2"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    { errors.fprojecttwopoint1 &&
                                                            <div className='errortext'>
                                                                {errors.fprojecttwopoint1}
                                                            </div>
                                                    }
                                                </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>

                                    <div className="border d-md-block"></div>

                                    <div className="row mb-4 mt-4">
                                    <p className='leftcardskilltext text-info'>Education details:</p>
                                        <div className="col-md-4">
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
                                        <div className="col-md-8">
                                            <label htmlFor="lastname" className="pt-2 pb-2">Enter the Stream<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Ex: Computer Science"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setStreamfresher(e.target.value)}
                                                    }
                                                    value={values.fstream}
                                                    name="fstream">
                                                </input>
                                            </div>
                                            { errors.fstream &&
                                                    <div className='errortext pt-2'>
                                                        {errors.fstream}
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-4 mt-4">
                                        <div className="col-md-12">
                                            <label htmlFor="lastname" className="pt-2 pb-2">Enter University Name<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon icon={faGraduationCap} />
                                                    </div>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Ex: Visveswaraya Technological University"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setUniversityfresher(e.target.value)}
                                                    }
                                                    value={values.funiversity}
                                                    name="funiversity">
                                                </input>
                                            </div>
                                            { errors.funiversity &&
                                                    <div className='errortext pt-2'>
                                                        {errors.funiversity}
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-4 mt-4">
                                        <div className="col-md-12">
                                            <label htmlFor="degree" className="pt-2 pb-2">Select Month: </label>  
                                            <select className="form-control form-select"
                                                    onChange={monthfromSelect}
                                                    value={monthfrom}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                        {/* <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Month To: </label>  
                                            <select className="form-control form-select"
                                                    onChange={monthtoSelect}
                                                    value={monthto}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div> */}
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6 pb-2">
                                            <label htmlFor="yearfrom" className="pb-2">Year From:</label>
                                            <div className="input-group h-50">
                                            {/* <YearPicker 
                                                onChange={yearfromSelect} 
                                            /> */}
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faCalendar} />
                                                    </div>
                                                </div>
                                                <select className="form-control form-select"
                                                        onChange={yearfromdropdownSelect}
                                                        value={yearfromval}
                                                        >
                                                    {yearfromData.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.year}>
                                                            {item.label}
                                                        </option>)
                                                    })}
                                                </select>
                                            </div>    
                                            </div>

                                            

                                        </div>
                                        <div className="col-md-6 pb-2">
                                            <label htmlFor="yearto" className="pb-2">Year To:</label>
                                            <div className="input-group h-50">
                                            {/* <YearPicker 
                                                onChange={yeartoSelect} 
                                            /> */}
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faCalendar} />
                                                    </div>
                                                </div>
                                                <select className="form-control form-select"
                                                        onChange={yeartodropdownSelect}
                                                        value={yeartoval}
                                                        >
                                                    {yeartoData.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.year}>
                                                            {item.label}
                                                        </option>)
                                                    })}
                                                </select>
                                            </div>    
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border d-md-block"></div>

                                    <div className="row mb-4 mt-4">
                                    <p className='leftcardskilltext text-info'>Certificate details:</p>
                                        <div className="col-md-12">
                                            <label htmlFor="lastname" className="pt-2 pb-2">Enter Course Name<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon icon={faAward} />
                                                    </div>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Ex: AWS Cloud"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setCoursenamefresher(e.target.value)}
                                                    }
                                                    value={values.fcoursename}
                                                    name="fcoursename">
                                                </input>
                                            </div>
                                            { errors.fcoursename &&
                                                    <div className='errortext pt-2'>
                                                        {errors.fcoursename}
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-4 mt-2">
                                        <div className="col-md-12">
                                            <label htmlFor="lastname" className="pt-2 pb-2"> Platform Name<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Ex: Udemy"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        setPlatnamefresher(e.target.value)}
                                                    }
                                                    value={values.fplatform}
                                                    name="fplatform">
                                                </input>
                                            </div>
                                            { errors.fplatform &&
                                                    <div className='errortext pt-2'>
                                                        {errors.fplatform}
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <div className="row mb-4 mt-4">
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Issued Month: </label>  
                                            <select className="form-control form-select"
                                                    onChange={certificatemonthSelect}
                                                    value={certificateMonth}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Issued Year: </label>  
                                            
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text h-100">
                                                        <FontAwesomeIcon  icon={faCalendar} />
                                                    </div>
                                                </div>
                                                <select className="form-control form-select"
                                                    onChange={certificateyearSelect}
                                                    value={certificateYear}
                                                    >
                                                    {yearData.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.year}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="text-center mt-4 pt-4 d-grid"> 
                                        <Button variant="dark" size="md" onClick={scrollToTop} >
                                            Click here to get Generate-PDF button 
                                        </Button>
                                    </div>
                                   </>
                                   )}
                                   </Formik>
                                :
// {/* -----------------------  Experience Form   --------------------- */}
                                <Formik initialValues={{ 
                                    fusername: fullnamefresher, 
                                    femail: emailfresher , 
                                    fphoneno: phonefresher , 
                                    fsummary: summaryfresher ,
                                    fprojectonename: projectonefresher ,
                                    fprojectonerole: projectonerolefresher ,
                                    fprojectonetech1: projectonetech1fresher ,
                                    fprojectonetech2: projectonetech2fresher ,
                                    fprojectonetech3: projectonetech3fresher ,
                                    fprojectonepoint1: projectonepoint1fresher ,
                                    fprojectonepoint2: projectonepoint2fresher ,
                                    fprojectonepoint3: projectonepoint3fresher ,
                                    fprojecttwoname: projecttwofresher ,
                                    fprojecttworole: projecttworolefresher ,
                                    fprojecttwotech1: projecttwotech1fresher ,
                                    fprojecttwotech2: projecttwotech2fresher ,
                                    fprojecttwotech3: projecttwotech3fresher ,
                                    fprojecttwopoint1: projecttwopoint1fresher ,
                                    fprojecttwopoint2: projecttwopoint2fresher ,
                                    fprojecttwopoint3: projecttwopoint3fresher ,
                                    fstream: streamfresher ,
                                    funiversity: universityfresher ,
                                    fyearfrom: yearfromval ,
                                    fyearto: yeartoval,
                                    fcoursename: coursenamefresher,
                                    fplatform: platnamefresher,
                                    ecompanyname: companynamework1,
                                    ecompanylocation: companylocation1,
                                    erole: rolework1,
                                    eworkyearfrom1: workoneyearfromval ,
                                    eworkyearto1: workoneyeartoval,
                                    eworkonepoint1: workonepoint1exp,
                                    eworkonepoint2: workonepoint2exp, }} 
                            // onSubmit={createPurchaseOrder} 
                            validate={freshervalidate}
                            >
                              {({ handleChange, handleBlur, handleSubmit, touched, values, errors }) => (
                                <>
                                <div className="row mb-1">
                                    <div className="col-md-12 p-2">
                                        <label htmlFor="firstname" className="pb-2">Full Name<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faUser} />
                                                </div>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Full name"
                                                // autocomplete="off"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFullnamefresher(e.target.value)}
                                                }
                                                value={values.fusername}
                                                name="fusername">
                                            </input>
                                        </div>
                                        { errors.fusername &&
                                                <div className='errortext pt-2'>
                                                    {errors.fusername}
                                                </div>
                                        }
                                    </div>
                                    
                                </div>

                                <div className="row mb-2">
                                    <div className="col-md-12 p-2">
                                        <label htmlFor="lastname" className="pb-2">Role:</label>
                                            <select className="form-control form-select"
                                                    onChange={expRoleSelect}
                                                    value={exproleSelectval}
                                                    >
                                                    {roleOptions.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.value}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6 p-2">
                                        <label htmlFor="firstname" className="pb-2">Email-ID<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faEnvelope} />
                                                </div>
                                            </div>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                placeholder="Email address"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setEmailfresher(e.target.value)}
                                                }
                                                value={values.femail}
                                                name="femail">
                                            </input>
                                        </div>
                                        { errors.femail &&
                                                <div className='errortext pt-2'>
                                                    {errors.femail}
                                                </div>
                                        }
                                    </div>
                                    <div className="col-md-6 p-2">
                                        <label htmlFor="lastname" className="pb-2">Phone No<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon rotation={90} icon={faPhone} />
                                                </div>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Enter 10-digit number"
                                                maxLength="10"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setPhonefresher(e.target.value)}
                                                }
                                                value={values.fphoneno}
                                                name="fphoneno">
                                            </input>
                                        </div>
                                        { errors.fphoneno &&
                                                <div className='errortext pt-2'>
                                                    {errors.fphoneno}
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-12">
                                        <label htmlFor="firstname" style={{paddingRight:10}} className="pb-2">Career Objective / Summary<span className='asteriskkey'>*</span></label>
                                        
                                        <OverlayTrigger 
                                            overlay={
                                            <Tooltip id="tooltip-disabled">Suggession</Tooltip>
                                            }>
                                            <span className="d-inline-block" onClick={InfoClick}>
                                            <FontAwesomeIcon size='lg'
                                                             className="infoIcon" 
                                                             color="green" 
                                                             icon={faInfoCircle} /> Click me
                                            </span>
                                        </OverlayTrigger>
                                       
                                        <div className="input-group mb-0">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon icon={faSuitcase} />
                                                </div>
                                            </div>
                                            <textarea 
                                                className="form-control" 
                                                rows="3"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setSummaryfresher(e.target.value)}
                                                }
                                                value={values.fsummary}
                                                name="fsummary">
                                            </textarea>
                                        </div>
                                        { errors.fsummary &&
                                                <div className='errortext pt-2'>
                                                    {errors.fsummary}
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="border d-md-block"></div>

                                <div className="row mb-4 mt-4">
                                <p className='leftcardskilltext text-info'>Select your skills <span className='asteriskkey'>*</span></p>
                                    <div className="col-md-12 mb-0">
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
                                        {/* <span>Selected option: {progSelectval}</span> */}
                                    </div>
                                    { skillnullfresher === true &&
                                            <div className='errortext pt-3'>
                                                Please select Atleast 3-4 Skills.
                                            </div>
                                    }
                                </div>

                                <div className="border d-md-block"></div>

                                <div className="row mt-4 mb-3">
                                    <p className='leftcardskilltext text-info'>Work Experience 1 <span className='asteriskkey'>*</span></p>
                                        <div className="col-md-7">
                                            <label htmlFor="lastname" className="pb-2">Company Name<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon icon={faBriefcase} />
                                                </div>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Enter Full name"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setCompanynamework1(e.target.value)}
                                                }
                                                value={values.ecompanyname}
                                                name="ecompanyname">
                                            </input>
                                        </div>
                                        { errors.ecompanyname &&
                                                <div className='errortext pt-2'>
                                                    {errors.ecompanyname}
                                                </div>
                                        }
                                        </div>

                                        <div className="col-md-5">
                                            <label htmlFor="lastname" className="pb-2">Location<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                            
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Company location"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setCompanylocation1(e.target.value)}
                                                }
                                                value={values.ecompanylocation}
                                                name="ecompanylocation">
                                            </input>
                                        </div>
                                        { errors.ecompanylocation &&
                                                <div className='errortext pt-2'>
                                                    {errors.ecompanylocation}
                                                </div>
                                        }
                                    </div>
                                </div>


                                    <div className="row mb-3 mt-2">
                                        <div className="col-md-12">
                                            <label htmlFor="lastname" className="pb-2">Role<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon icon={faBriefcase} />
                                                </div>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Ex: Associate Software Engineer"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setRolework1(e.target.value)}
                                                }
                                                value={values.erole}
                                                name="erole">
                                            </input>
                                        </div>
                                        { errors.erole &&
                                                <div className='errortext pt-2'>
                                                    {errors.erole}
                                                </div>
                                        }
                                        </div>
                                    </div>

                                    <div className="row mb-4 mt-4">
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Month From: </label>  
                                            <select className="form-control form-select"
                                                    onChange={workonemonthfromSelect}
                                                    value={workonemonthfromval}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Month To: </label>  
                                            <select className="form-control form-select"
                                                    onChange={workonemonthtoSelect}
                                                    value={workonemonthtoval}
                                                    disabled={disablemontheyear1}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                    </div>


                                <div className="row mb-3">
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearfrom" className="pb-2">Year From:</label>
                                        <div className="input-group h-50">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={workoneyearfromSelect}
                                                    value={workoneyearfromval}
                                                    >
                                                {yearfromData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearto" className="pb-2">Year To:</label>
                                        <div className="input-group h-50">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={workoneyeartoSelect}
                                                    value={workoneyeartoval}
                                                    disabled={disablemontheyear1}
                                                    >
                                                {yearData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>
                                    </div>
                                </div>

                                <div className="pb-2 mb-2">
                                    <input
                                        type="checkbox"
                                        style={{ 
                                            height: '15px',
                                            width: '15px'
                                        }}
                                        checked={ispresentChecked1}
                                        onChange={present1checkClick}
                                        />
                                        <span className="leftcardcheckboxtext text-danger">
                                            &nbsp;&nbsp;Present 
                                        </span>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <textarea 
                                                className="form-control" 
                                                placeholder="Enter point 1" 
                                                rows="2"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setWorkonepoint1exp(e.target.value)}
                                                }
                                                value={values.eworkonepoint1}
                                                name="eworkonepoint1">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <textarea 
                                                className="form-control" 
                                                placeholder="Enter point 2" 
                                                rows="2"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setWorkonepoint2exp(e.target.value)}
                                                }
                                                value={values.eworkonepoint2}
                                                name="eworkonepoint2">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="pb-2 mb-2">
                                    <input
                                        type="checkbox"
                                        style={{ 
                                            height: '15px',
                                            width: '15px'
                                        }}
                                        checked={isworkChecked2}
                                        onChange={work2checkClick}
                                        />
                                        <span className="leftcardcheckboxtext text-info">
                                            &nbsp;&nbsp;Work Experience 2 
                                            <span className="leftcardcheckboxtext text-danger"> (Check this If Applicable)</span>
                                        </span>
                                </div>

                                { isworkChecked2  ? 
                                <>
                                <div className="row mt-3 mb-3">
                                    <div className="col-md-7">
                                        <label htmlFor="lastname" className="pb-2">Company Name<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text h-100">
                                                <FontAwesomeIcon icon={faBriefcase} />
                                            </div>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter Full name"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCompanynamework2(e.target.value)}
                                            }
                                            value={companynamework2}
                                            name="companynamework2">
                                        </input>
                                    </div>
                                    </div>

                                    <div className="col-md-5">
                                            <label htmlFor="lastname" className="pb-2">Location<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                            
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Company location"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setCompanylocation2(e.target.value)}
                                                }
                                                value={companylocation2}
                                                name="companylocation2">
                                            </input>
                                        </div>
                                    </div>
                                </div>


                                <div className="row mb-3 mt-2">
                                    <div className="col-md-12">
                                        <label htmlFor="lastname" className="pb-2">Role<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text h-100">
                                                <FontAwesomeIcon icon={faBriefcase} />
                                            </div>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Ex: Associate Software Engineer"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setRolework2(e.target.value)}
                                            }
                                            value={rolework2}
                                            name="rolework2">
                                        </input>
                                    </div>
                                    </div>
                                </div>

                                <div className="row mb-4 mt-4">
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Month From: </label>  
                                            <select className="form-control form-select"
                                                    onChange={worktwomonthfromSelect}
                                                    value={worktwomonthfromval}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Month To: </label>  
                                            <select className="form-control form-select"
                                                    onChange={worktwomonthtoSelect}
                                                    value={worktwomonthtoval}
                                                    disabled={disablemontheyear2}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                    </div>


                                <div className="row mb-3">
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearfrom" className="pb-2">Year From:</label>
                                        <div className="input-group h-50">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={worktwoyearfromSelect}
                                                    value={worktwoyearfromval}
                                                    >
                                                {yearfromData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearto" className="pb-2">Year To:</label>
                                        <div className="input-group h-50">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={worktwoyeartoSelect}
                                                    value={worktwoyeartoval}
                                                    disabled={disablemontheyear2}
                                                    >
                                                {yearData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>
                                    </div>
                                </div>

                                <div className="pb-2 mb-2">
                                    <input
                                        type="checkbox"
                                        style={{ 
                                            height: '15px',
                                            width: '15px'
                                        }}
                                        checked={ispresentChecked2}
                                        onChange={present2checkClick}
                                        />
                                        <span className="leftcardcheckboxtext text-danger">
                                            &nbsp;&nbsp;Present 
                                        </span>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <textarea 
                                                className="form-control" 
                                                placeholder="Enter point 1" 
                                                rows="2"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setWorktwopoint1exp(e.target.value)}
                                                }
                                                value={worktwopoint1exp}
                                                name="worktwopoint1exp">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <textarea 
                                                className="form-control" 
                                                placeholder="Enter point 2" 
                                                rows="2"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setWorktwopoint2exp(e.target.value)}
                                                }
                                                value={worktwopoint2exp}
                                                name="worktwopoint1exp">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            
                            </>
                            :
                            null    
                            }

                                <div className="pb-2 mb-2">
                                    <input
                                        type="checkbox"
                                        style={{ 
                                            height: '15px',
                                            width: '15px'
                                        }}
                                        checked={isworkChecked3}
                                        onChange={work3checkClick}
                                        />
                                        <span className="leftcardcheckboxtext text-info">
                                            &nbsp;&nbsp;Work Experience 3
                                            <span className="leftcardcheckboxtext text-danger"> (Check this If Applicable)</span>.
                                        </span>
                                </div>

                                { isworkChecked3  ? 
                                <>
                                <div className="row mt-3 mb-3">
                                    <div className="col-md-7">
                                        <label htmlFor="lastname" className="pb-2">Company Name<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text h-100">
                                                <FontAwesomeIcon icon={faBriefcase} />
                                            </div>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Enter Full name"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCompanynamework3(e.target.value)}
                                            }
                                            value={companynamework3}
                                            name="companynamework3">
                                        </input>
                                    </div>
                                    </div>

                                    <div className="col-md-5">
                                            <label htmlFor="lastname" className="pb-2">Location<span className='asteriskkey'>*</span></label>
                                            <div className="input-group">
                                            
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Company location"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setCompanylocation3(e.target.value)}
                                                }
                                                value={companylocation3}
                                                name="companylocation3">
                                            </input>
                                        </div>
                                    </div>
                                </div>


                                <div className="row mb-3 mt-2">
                                    <div className="col-md-12">
                                        <label htmlFor="lastname" className="pb-2">Role<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text h-100">
                                                <FontAwesomeIcon icon={faBriefcase} />
                                            </div>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Ex: Associate Software Engineer"
                                            onChange={(e) => {
                                                handleChange(e);
                                                setRolework3(e.target.value)}
                                            }
                                            value={rolework3}
                                            name="rolework3">
                                        </input>
                                    </div>
                                    </div>
                                </div>

                                <div className="row mb-4 mt-4">
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Month From: </label>  
                                            <select className="form-control form-select"
                                                    onChange={workthreemonthfromSelect}
                                                    value={workthreemonthfromval}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="degree" className="pt-2 pb-2">Month To: </label>  
                                            <select className="form-control form-select"
                                                    onChange={workthreemonthtoSelect}
                                                    value={workthreemonthtoval}
                                                    disabled={disablemontheyear3}
                                                    >
                                                    {monthNames.map((item,keyindex) => {
                                                        return(
                                                        <option key={keyindex} 
                                                                value={item.month}>
                                                            {item.label}
                                                        </option>)
                                                    })} 
                                            </select>
                                        </div>
                                    </div>

                                <div className="row mb-3">
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearfrom" className="pb-2">Year From:</label>
                                        <div className="input-group h-50">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={workthreeyearfromSelect}
                                                    value={workthreeyearfromval}
                                                    >
                                                {yearfromData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearto" className="pb-2">Year To:</label>
                                        <div className="input-group h-50">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={workthreeyeartoSelect}
                                                    value={workthreeyeartoval}
                                                    disabled={disablemontheyear3}
                                                    >
                                                {yearData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>
                                    </div>
                                </div>

                                <div className="pb-2 mb-2">
                                    <input
                                        type="checkbox"
                                        style={{ 
                                            height: '15px',
                                            width: '15px'
                                        }}
                                        checked={ispresentChecked3}
                                        onChange={present3checkClick}
                                        />
                                        <span className="leftcardcheckboxtext text-danger">
                                            &nbsp;&nbsp;Present 
                                        </span>
                                </div>

                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <textarea 
                                                className="form-control" 
                                                placeholder="Enter point 1" 
                                                rows="2"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setWorkthreepoint1exp(e.target.value)}
                                                }
                                                value={workthreepoint1exp}
                                                name="workthreepoint1exp">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <textarea 
                                                className="form-control" 
                                                placeholder="Enter point 2" 
                                                rows="2"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setWorkthreepoint2exp(e.target.value)}
                                                }
                                                value={workthreepoint2exp}
                                                name="workthreepoint1exp">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            null    
                            }

                                <div className="border d-md-block"></div>

                                    <div className="row mb-2 mt-4">
                                        <p className='leftcardprojecttext text-info'>Projects:</p>           
                                    </div>


                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Project 1 <span className='asteriskkey'>*</span></Accordion.Header>
                                            <Accordion.Body>
                                                <div className="row mb-4 mt-3">
                                                    <div className="col-md-7 p-2">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text h-100">
                                                                    <FontAwesomeIcon  icon={faLightbulb} />
                                                                </div>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Project Name"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonefresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonename}
                                                                name="fprojectonename">
                                                            </input>
                                                        </div>
                                                        { errors.fprojectonename &&
                                                                <div className='errortext pt-2'>
                                                                    {errors.fprojectonename}
                                                                </div>
                                                        }
                                                    </div>
                                                    
                                                    <div className="col-md-5 p-2">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Role(Ex:Developer)"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonerolefresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonerole}
                                                                name="fprojectonerole">
                                                            </input>
                                                        </div>
                                                        { errors.fprojectonerole &&
                                                                <div className='errortext pt-2'>
                                                                    {errors.fprojectonerole}
                                                                </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                <p className='leftcardtechnologytext'>Technologies used (Example: Java):</p>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Technology 1"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonetech1fresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonetech1}
                                                                name="fprojectonetech1">
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Technology 2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonetech2fresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonetech2}
                                                                name="fprojectonetech2">
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Technology 3"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonetech3fresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonetech3}
                                                                name="fprojectonetech3">
                                                            </input>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <div className="row mb-4">
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" placeholder="Technology 4"></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" placeholder="Technology 5"></input>
                                                        </div>
                                                    </div>
                                                    { errors.fprojectonetech1 &&
                                                        <div className='errortext pt-2'>
                                                            {errors.fprojectonetech1}
                                                        </div>
                                                    }
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea 
                                                                className="form-control" 
                                                                placeholder="Enter point 1" 
                                                                rows="2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonepoint1fresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonepoint1}
                                                                name="fprojectonepoint1">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea 
                                                                className="form-control" 
                                                                placeholder="Enter point 2" 
                                                                rows="2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonepoint2fresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonepoint2}
                                                                name="fprojectonepoint2">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea 
                                                                className="form-control" 
                                                                placeholder="Enter point 3" 
                                                                rows="2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjectonepoint3fresher(e.target.value)}
                                                                }
                                                                value={values.fprojectonepoint3}
                                                                name="fprojectonepoint3">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea className="form-control" placeholder="Enter point 4" rows="2"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                { errors.fprojectonepoint1 &&
                                                        <div className='errortext'>
                                                            {errors.fprojectonepoint1}
                                                        </div>
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Project 2 (Optional)</Accordion.Header>
                                            <Accordion.Body>
                                            <div className="p-2">
                                                <input
                                                    type="checkbox"
                                                    style={{ 
                                                        height: '15px',
                                                        width: '15px'
                                                    }}
                                                    checked={isChecked}
                                                    onChange={prject2checkClick}
                                                    />
                                                    <span className="leftcardcheckboxtext text-danger">
                                                        &nbsp;&nbsp;Please Checkmark this if Project 2 is required.
                                                    </span>
                                                </div>
                                                <div className="row mb-4 mt-3">
                                                    <div className="col-md-7 p-2">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text h-100">
                                                                    <FontAwesomeIcon  icon={faLightbulb} />
                                                                </div>
                                                            </div>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Project Name"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttwofresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttwoname}
                                                                name="fprojecttwoname">
                                                            </input>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-md-5 p-2">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Role(Ex:Developer)"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttworolefresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttworole}
                                                                name="fprojecttworole">
                                                            </input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                <p className='leftcardtechnologytext'>Technologies used (Example: Java):</p>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Technology 1"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttwotech1fresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttwotech1}
                                                                name="fprojecttwotech1">
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Technology 2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttwotech2fresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttwotech2}
                                                                name="fprojecttwotech2">
                                                            </input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                placeholder="Technology 3"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttwotech3fresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttwotech3}
                                                                name="fprojecttwotech3">
                                                            </input>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <div className="row mb-4">
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" placeholder="Technology 4"></input>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 pb-1">
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" placeholder="Technology 5"></input>
                                                        </div>
                                                    </div>
                                                    { errors.fprojecttwotech1 &&
                                                        <div className='errortext pt-2'>
                                                            {errors.fprojecttwotech1}
                                                        </div>
                                                    }
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea 
                                                                className="form-control" 
                                                                placeholder="Enter point 1" 
                                                                rows="2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttwopoint1fresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttwopoint1}
                                                                name="fprojecttwopoint1">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea 
                                                                className="form-control" 
                                                                placeholder="Enter point 2" 
                                                                rows="2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttwopoint2fresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttwopoint2}
                                                                name="fprojecttwopoint2">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea 
                                                                className="form-control" 
                                                                placeholder="Enter point 3" 
                                                                rows="2"
                                                                onChange={(e) => {
                                                                    handleChange(e);
                                                                    setProjecttwopoint3fresher(e.target.value)}
                                                                }
                                                                value={values.fprojecttwopoint3}
                                                                name="fprojecttwopoint3">
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <div className="input-group">
                                                            <textarea className="form-control" placeholder="Enter point 4" rows="2"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                { errors.fprojecttwopoint1 &&
                                                        <div className='errortext'>
                                                            {errors.fprojecttwopoint1}
                                                        </div>
                                                }
                                            </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                                <div className="border d-md-block"></div>

                                <div className="row mb-4 mt-4">
                                <p className='leftcardskilltext text-info'>Education details:</p>
                                    <div className="col-md-4">
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
                                    <div className="col-md-8">
                                        <label htmlFor="lastname" className="pt-2 pb-2">Enter the Stream<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Ex: Computer Science"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setStreamfresher(e.target.value)}
                                                }
                                                value={values.fstream}
                                                name="fstream">
                                            </input>
                                        </div>
                                        { errors.fstream &&
                                                <div className='errortext pt-2'>
                                                    {errors.fstream}
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="row mb-4 mt-4">
                                    <div className="col-md-12">
                                        <label htmlFor="lastname" className="pt-2 pb-2">Enter University Name<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon icon={faGraduationCap} />
                                                </div>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Ex: Visveswaraya Technological University"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setUniversityfresher(e.target.value)}
                                                }
                                                value={values.funiversity}
                                                name="funiversity">
                                            </input>
                                        </div>
                                        { errors.funiversity &&
                                                <div className='errortext pt-2'>
                                                    {errors.funiversity}
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="row mb-4 mt-4">
                                    <div className="col-md-12">
                                        <label htmlFor="degree" className="pt-2 pb-2">Select Month: </label>  
                                        <select className="form-control form-select"
                                                onChange={monthfromSelect}
                                                value={monthfrom}
                                                >
                                                {monthNames.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.month}>
                                                        {item.label}
                                                    </option>)
                                                })} 
                                        </select>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <label htmlFor="degree" className="pt-2 pb-2">Month To: </label>  
                                        <select className="form-control form-select"
                                                onChange={monthtoSelect}
                                                value={monthto}
                                                >
                                                {monthNames.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.month}>
                                                        {item.label}
                                                    </option>)
                                                })} 
                                        </select>
                                    </div> */}
                                </div>

                                <div className="row mb-4">
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearfrom" className="pb-2">Year From:</label>
                                        <div className="input-group h-50">
                                        {/* <YearPicker 
                                            onChange={yearfromSelect} 
                                        /> */}
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={yearfromdropdownSelect}
                                                    value={yearfromval}
                                                    >
                                                {yearfromData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>

                                        

                                    </div>
                                    <div className="col-md-6 pb-2">
                                        <label htmlFor="yearto" className="pb-2">Year To:</label>
                                        <div className="input-group h-50">
                                        {/* <YearPicker 
                                            onChange={yeartoSelect} 
                                        /> */}
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                    onChange={yeartodropdownSelect}
                                                    value={yeartoval}
                                                    >
                                                {yeartoData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })}
                                            </select>
                                        </div>    
                                        </div>
                                    </div>
                                </div>

                                <div className="border d-md-block"></div>

                                <div className="row mb-4 mt-4">
                                <p className='leftcardskilltext text-info'>Certificate details:</p>
                                    <div className="col-md-12">
                                        <label htmlFor="lastname" className="pt-2 pb-2">Enter Course Name<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon icon={faAward} />
                                                </div>
                                            </div>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Ex: AWS Cloud"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setCoursenamefresher(e.target.value)}
                                                }
                                                value={values.fcoursename}
                                                name="fcoursename">
                                            </input>
                                        </div>
                                        { errors.fcoursename &&
                                                <div className='errortext pt-2'>
                                                    {errors.fcoursename}
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="row mb-4 mt-2">
                                    <div className="col-md-12">
                                        <label htmlFor="lastname" className="pt-2 pb-2"> Platform Name<span className='asteriskkey'>*</span></label>
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Ex: Udemy"
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setPlatnamefresher(e.target.value)}
                                                }
                                                value={values.fplatform}
                                                name="fplatform">
                                            </input>
                                        </div>
                                        { errors.fplatform &&
                                                <div className='errortext pt-2'>
                                                    {errors.fplatform}
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="row mb-4 mt-4">
                                    <div className="col-md-6">
                                        <label htmlFor="degree" className="pt-2 pb-2">Issued Month: </label>  
                                        <select className="form-control form-select"
                                                onChange={certificatemonthSelect}
                                                value={certificateMonth}
                                                >
                                                {monthNames.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.month}>
                                                        {item.label}
                                                    </option>)
                                                })} 
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="degree" className="pt-2 pb-2">Issued Year: </label>  
                                        
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text h-100">
                                                    <FontAwesomeIcon  icon={faCalendar} />
                                                </div>
                                            </div>
                                            <select className="form-control form-select"
                                                onChange={certificateyearSelect}
                                                value={certificateYear}
                                                >
                                                {yearData.map((item,keyindex) => {
                                                    return(
                                                    <option key={keyindex} 
                                                            value={item.year}>
                                                        {item.label}
                                                    </option>)
                                                })} 
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                <div className="text-center mt-4 pt-4 d-grid"> 
                                    <Button variant="dark" size="md" onClick={scrollToTop} >
                                        Click here to get Generate-PDF button 
                                    </Button>
                                </div>
                               </>
                               )}
                               </Formik>
                                }

                                


                            </div>
                        </Card>
                    </Col>
                    <Col md={7}>
                        <Card className='p-4'>
                        {fresherForm ?
                        <>
{/* ------------------   Right side resume fresher starts here -------- */}

                        <div style={{paddingLeft:20}}>
                            <Pdf targetRef={pdffileref} x={0} y={0} scale={1.15} options={options} filename="FresherResume.pdf">
                                {({ toPdf }) => genbuttonvisible === true ? <Button onClick={toPdf} variant="dark" size="md" >
                                                Generate PDF 
                                                </Button> : null
                                                }
                            </Pdf>
                        </div>
                        <div ref={pdffileref} style={{height: '100%'}}>
                        {resumename === "Resume 1" ?
                            <Container className='p-4'>
                                <Row>
                                    <Col md={12} className='pt-3'>
                                        <div>
                                            <h3 className='nametext'>{fullnamefresher}</h3>
                                            <h5 className='roletext'>Fresher</h5>
                                            
                                            <p className='mailtext'>
                                                {emailfresher}
                                            </p>
                                            <p className='phonetext'>
                                                +91 {phonefresher}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <p className='workexperiencetext text-info pt-3'>Professional Summary</p>
                                    <p>{summaryfresher}</p>
                                </Row>
                                <Row>
                                    <Col md={8} className='pt-2'>
                                        <div>
                                            <p className='workexperiencetext text-info pt-3'>Projects</p>
                                            <p className='projecttext'>{projectonefresher}</p>
                                            <p className='projectroletext'>{projectonerolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projectonetech1fresher},{projectonetech2fresher},{projectonetech3fresher}
                                            </p>
                                            <ul>
                                                { projectonepoint1fresher === '' ? null : <li>{projectonepoint1fresher}</li>}
                                                { projectonepoint2fresher === '' ? null : <li>{projectonepoint2fresher}</li>}
                                                { projectonepoint3fresher === '' ? null : <li>{projectonepoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        { isChecked ? 
                                        <div className='pt-4'>
                                            <p className='projecttext'>{projecttwofresher}</p>
                                            <p className='projectroletext'>{projecttworolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projecttwotech1fresher},{projecttwotech2fresher},{projecttwotech3fresher}
                                            </p>
                                            <ul>
                                                { projecttwopoint1fresher === '' ? null : <li>{projecttwopoint1fresher}</li>}
                                                { projecttwopoint2fresher === '' ? null : <li>{projecttwopoint2fresher}</li>}
                                                { projecttwopoint3fresher === '' ? null : <li>{projecttwopoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        : 
                                        null
                                        }
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={3} className='pt-2'>
                                        <div>
                                            <p className='skillstext text-info pt-3'>Skills</p>
                                            { progSelectval === '' ? 
                                                null 
                                            :
                                              progSelectval.map((item,key) => {
                                                  return(
                                                  <p key={key} className='skilllisttext'>
                                                    {item}
                                                  </p>)
                                              })
                                            }
                                        </div>
                                        <div>
                                            <p className='educationtext text-info pt-4'>Education</p>
                                            <p className='degreetext'>{eduSelectval} ({streamfresher})</p>
                                            <p className='universitytext'>{universityfresher}</p>
                                            <p className='yeartext'>{monthfrom} {yearfromval}-{yeartoval}</p>
                                        </div>

                                        <div>
                                            <p className='educationtext text-info pt-4'>Certificates</p>
                                            <p className='degreetext'>{coursenamefresher}</p>
                                            <p className='universitytext'>{platnamefresher}</p>
                                            <p className='yeartext'>{certificateMonth} {certificateYear}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            :
                            <Container className='p-4'>
                                <Row style={{backgroundColor:'#16365d'}}>
                                    <Col md={12} className='p-3'>
                                        <div>
                                            <h3 className='nametext' style={{color:"#FFFFFF"}}>{fullnamefresher}</h3>
                                            <h5 className='roletext' style={{color:"#FFFFFF"}}>Fresher</h5>
                                            <p className='mailtext' style={{color:"#FFFFFF"}}>
                                                {emailfresher}
                                            </p>
                                            <p className='phonetext' style={{color:"#FFFFFF"}}>
                                                +91 {phonefresher}
                                            </p>
                                        </div>
                                        
                                    </Col>
                                   
                                </Row>
                                <Row style={{border: '1px solid #ddd'}}>
                                    <Col md={8} className='pt-2' style={{backgroundColor:'#FCFCFC',paddingRight:20}}>
                                        <div>
                                            <p className='workexperiencetext text-danger pt-3'>Professional Summary</p>
                                            <p>{summaryfresher}</p>
                                        </div>
                                        <div>
                                            <p className='workexperiencetext text-danger pt-3'>Projects</p>
                                            <p className='projecttext'>{projectonefresher}</p>
                                            <p className='projectroletext'>{projectonerolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projectonetech1fresher},{projectonetech2fresher},{projectonetech3fresher}
                                            </p>
                                            <ul>
                                                { projectonepoint1fresher === '' ? null : <li>{projectonepoint1fresher}</li>}
                                                { projectonepoint2fresher === '' ? null : <li>{projectonepoint2fresher}</li>}
                                                { projectonepoint3fresher === '' ? null : <li>{projectonepoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        { isChecked ?
                                        <div className='pt-4'>
                                            <p className='projecttext'>{projecttwofresher}</p>
                                            <p className='projectroletext'>{projecttworolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projecttwotech1fresher},{projecttwotech2fresher},{projecttwotech3fresher}
                                            </p>
                                            <ul>
                                                { projecttwopoint1fresher === '' ? null : <li>{projecttwopoint1fresher}</li>}
                                                { projecttwopoint2fresher === '' ? null : <li>{projecttwopoint2fresher}</li>}
                                                { projecttwopoint3fresher === '' ? null : <li>{projecttwopoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        : 
                                        null
                                        }
                                    </Col>
                                    <Col md={4} className='pt-2' style={{backgroundColor:'#f1f1f1',paddingLeft:20}}>
                                        <div>
                                            <p className='skillstext text-danger pt-3'>Skills</p>
                                            { progSelectval === '' ? 
                                                null 
                                            :
                                              progSelectval.map((item,key) => {
                                                  return(
                                                  <p key={key} className='skilllisttext'>
                                                    {item}
                                                  </p>)
                                              })
                                            }
                                        </div>
                                        <div>
                                            <p className='educationtext text-danger pt-4'>Education</p>
                                            <p className='degreetext'>{eduSelectval} ({streamfresher})</p>
                                            <p className='universitytext'>{universityfresher}</p>
                                            <p className='yeartext'>{monthfrom} {yearfromval}-{yeartoval}</p>
                                        </div>

                                        <div>
                                            <p className='educationtext text-danger pt-4'>Certificates</p>
                                            <p className='degreetext'>{coursenamefresher}</p>
                                            <p className='universitytext'>{platnamefresher}</p>
                                            <p className='yeartext'>{certificateMonth} {certificateYear}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            }
                        </div>
                            </>
                            :
                            <>
{/* ------------------   Right side resume experience starts here -------- */}

                        <div style={{paddingLeft:20}}>
                            <Pdf targetRef={pdffileref} x={0} y={0} scale={1.15} options={options} filename="ExperienceResume.pdf">
                                {({ toPdf }) => genbuttonvisible === true ? <Button onClick={toPdf} variant="dark" size="md" >
                                                Generate PDF 
                                                </Button> : null
                                                }
                            </Pdf>
                        </div>
                        <div ref={pdffileref} style={{height: '100%'}}>
                        {resumename === "Resume 1" ?
                            <Container className='p-4'>
                                <Row>
                                    <Col md={12} className='pt-3'>
                                        <div>
                                            <h3 className='nametext'>{fullnamefresher}</h3>
                                            <h5 className='roletext'>{exproleSelectval}</h5>
                                            
                                            <p className='mailtext'>
                                                {emailfresher}
                                            </p>
                                            <p className='phonetext'>
                                                +91 {phonefresher}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <p className='workexperiencetext text-info pt-3'>Professional Summary</p>
                                    <p>{summaryfresher}</p>
                                </Row>
                                
                                <Row>
                                    <Col md={8} className='pt-2'>
                                        <div>
                                            <p className='workexperiencetext text-info pt-3'>Work Experience</p>
                                            <h3 className='worknametext'>{companynamework1}{companylocation1 === '' ? null : ` - ${companylocation1}`}</h3>
                                            <h5 className='workroletext'>{rolework1}</h5>
                                            <p className='workmonthyeartext'>
                                                {workonemonthfromval} {workoneyearfromval} - { ispresentChecked1 ? 'Present' :  `${workonemonthtoval} ${workoneyeartoval}` }
                                            </p>
                                            <ul>
                                                { workonepoint1exp === '' ? null : <li>{workonepoint1exp}</li>}
                                                { workonepoint2exp === '' ? null : <li>{workonepoint2exp}</li>}
                                            </ul>
                                        </div>
                                        {isworkChecked2 ? 
                                            <div>
                                                <h3 className='worknametext'>{companynamework2}{companylocation2 === '' ? null : ` - ${companylocation2}`}</h3>
                                                <h5 className='workroletext'>{rolework2}</h5>
                                                <p className='workmonthyeartext'>
                                                    {worktwomonthfromval} {worktwoyearfromval} - { ispresentChecked2 ? 'Present' :  `${worktwomonthtoval} ${worktwoyeartoval}` }
                                                </p>
                                                <ul>
                                                    { worktwopoint1exp === '' ? null : <li>{worktwopoint1exp}</li>}
                                                    { worktwopoint2exp === '' ? null : <li>{worktwopoint2exp}</li>}
                                                </ul>
                                            </div>
                                        :null
                                        }
                                        {isworkChecked3 ? 
                                            <div>
                                                <h3 className='worknametext'>{companynamework3}{companylocation3 === '' ? null : ` - ${companylocation3}`}</h3>
                                                <h5 className='workroletext'>{rolework3}</h5>
                                                <p className='workmonthyeartext'>
                                                    {workthreemonthfromval} {workthreeyearfromval} - { ispresentChecked3 ? 'Present' :  `${workthreemonthtoval} ${workthreeyeartoval}` }
                                                </p>
                                                <ul>
                                                    { workthreepoint1exp === '' ? null : <li>{workthreepoint1exp}</li>}
                                                    { workthreepoint2exp === '' ? null : <li>{workthreepoint2exp}</li>}
                                                </ul>
                                            </div>
                                        :null
                                        }
                                        <div>
                                            <p className='workexperiencetext text-info pt-3'>Projects</p>
                                            <p className='projecttext'>{projectonefresher}</p>
                                            <p className='projectroletext'>{projectonerolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projectonetech1fresher},{projectonetech2fresher},{projectonetech3fresher}
                                            </p>
                                            <ul>
                                                { projectonepoint1fresher === '' ? null : <li>{projectonepoint1fresher}</li>}
                                                { projectonepoint2fresher === '' ? null : <li>{projectonepoint2fresher}</li>}
                                                { projectonepoint3fresher === '' ? null : <li>{projectonepoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        { isChecked ? 
                                        <div className='pt-4'>
                                            <p className='projecttext'>{projecttwofresher}</p>
                                            <p className='projectroletext'>{projecttworolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projecttwotech1fresher},{projecttwotech2fresher},{projecttwotech3fresher}
                                            </p>
                                            <ul>
                                                { projecttwopoint1fresher === '' ? null : <li>{projecttwopoint1fresher}</li>}
                                                { projecttwopoint2fresher === '' ? null : <li>{projecttwopoint2fresher}</li>}
                                                { projecttwopoint3fresher === '' ? null : <li>{projecttwopoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        : 
                                        null
                                        }
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={3} className='pt-2'>
                                        <div>
                                            <p className='skillstext text-info pt-3'>Skills</p>
                                            { progSelectval === '' ? 
                                                null 
                                            :
                                              progSelectval.map((item,key) => {
                                                  return(
                                                  <p key={key} className='skilllisttext'>
                                                    {item}
                                                  </p>)
                                              })
                                            }
                                        </div>
                                        <div>
                                            <p className='educationtext text-info pt-4'>Education</p>
                                            <p className='degreetext'>{eduSelectval} ({streamfresher})</p>
                                            <p className='universitytext'>{universityfresher}</p>
                                            <p className='yeartext'>{monthfrom} {yearfromval}-{yeartoval}</p>
                                        </div>

                                        <div>
                                            <p className='educationtext text-info pt-4'>Certificates</p>
                                            <p className='degreetext'>{coursenamefresher}</p>
                                            <p className='universitytext'>{platnamefresher}</p>
                                            <p className='yeartext'>{certificateMonth} {certificateYear}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            :
                            <Container className='p-4'>
                                <Row style={{backgroundColor:'#16365d'}}>
                                    <Col md={12} className='p-3'>
                                        <div>
                                            <h3 className='nametext' style={{color:"#FFFFFF"}}>{fullnamefresher}</h3>
                                            <h5 className='roletext' style={{color:"#FFFFFF"}}>{exproleSelectval}</h5>
                                            <p className='mailtext' style={{color:"#FFFFFF"}}>
                                                {emailfresher}
                                            </p>
                                            <p className='phonetext' style={{color:"#FFFFFF"}}>
                                                +91 {phonefresher}
                                            </p>
                                        </div>
                                        
                                    </Col>
                                   
                                </Row>
                                <Row style={{border: '1px solid #ddd'}}>
                                    <Col md={8} className='pt-2' style={{backgroundColor:'#FCFCFC',paddingRight:20}}>
                                        <div>
                                            <p className='workexperiencetext text-danger pt-3'>Professional Summary</p>
                                            <p>{summaryfresher}</p>
                                        </div>
                                        <div>
                                            <p className='workexperiencetext text-danger pt-3'>Work Experience</p>
                                            <h3 className='worknametext'>{companynamework1}{companylocation1 === '' ? null : ` - ${companylocation1}`}</h3>
                                            <h5 className='workroletext'>{rolework1}</h5>
                                            <p className='workmonthyeartext'>
                                                {workonemonthfromval} {workoneyearfromval} - { ispresentChecked1 ? 'Present' :  `${workonemonthtoval} ${workoneyeartoval}` }
                                            </p>
                                            <ul>
                                                { workonepoint1exp === '' ? null : <li>{workonepoint1exp}</li>}
                                                { workonepoint2exp === '' ? null : <li>{workonepoint2exp}</li>}
                                            </ul>
                                        </div>
                                        {isworkChecked2 ? 
                                            <div>
                                                <h3 className='worknametext'>{companynamework2}{companylocation2 === '' ? null : ` - ${companylocation2}`}</h3>
                                                <h5 className='workroletext'>{rolework2}</h5>
                                                <p className='workmonthyeartext'>
                                                    {worktwomonthfromval} {worktwoyearfromval} - { ispresentChecked2 ? 'Present' :  `${worktwomonthtoval} ${worktwoyeartoval}` }
                                                </p>
                                                <ul>
                                                    { worktwopoint1exp === '' ? null : <li>{worktwopoint1exp}</li>}
                                                    { worktwopoint2exp === '' ? null : <li>{worktwopoint2exp}</li>}
                                                </ul>
                                            </div>
                                        :null
                                        }
                                        {isworkChecked3 ? 
                                            <div>
                                                <h3 className='worknametext'>{companynamework3}{companylocation3 === '' ? null : ` - ${companylocation3}`}</h3>
                                                <h5 className='workroletext'>{rolework3}</h5>
                                                <p className='workmonthyeartext'>
                                                    {workthreemonthfromval} {workthreeyearfromval} - { ispresentChecked3 ? 'Present' :  `${workthreemonthtoval} ${workthreeyeartoval}` }
                                                </p>
                                                <ul>
                                                    { workthreepoint1exp === '' ? null : <li>{workthreepoint1exp}</li>}
                                                    { workthreepoint2exp === '' ? null : <li>{workthreepoint2exp}</li>}
                                                </ul>
                                            </div>
                                        :null
                                        }
                                        <div>
                                            <p className='workexperiencetext text-danger pt-3'>Projects</p>
                                            <p className='projecttext'>{projectonefresher}</p>
                                            <p className='projectroletext'>{projectonerolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projectonetech1fresher},{projectonetech2fresher},{projectonetech3fresher}
                                            </p>
                                            <ul>
                                                { projectonepoint1fresher === '' ? null : <li>{projectonepoint1fresher}</li>}
                                                { projectonepoint2fresher === '' ? null : <li>{projectonepoint2fresher}</li>}
                                                { projectonepoint3fresher === '' ? null : <li>{projectonepoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        { isChecked ?
                                        <div className='pt-4'>
                                            <p className='projecttext'>{projecttwofresher}</p>
                                            <p className='projectroletext'>{projecttworolefresher}</p>
                                            <p className='developertext'>
                                                Technologies used: {projecttwotech1fresher},{projecttwotech2fresher},{projecttwotech3fresher}
                                            </p>
                                            <ul>
                                                { projecttwopoint1fresher === '' ? null : <li>{projecttwopoint1fresher}</li>}
                                                { projecttwopoint2fresher === '' ? null : <li>{projecttwopoint2fresher}</li>}
                                                { projecttwopoint3fresher === '' ? null : <li>{projecttwopoint3fresher}</li>}
                                            </ul>
                                        </div>
                                        : 
                                        null
                                        }
                                    </Col>
                                    <Col md={4} className='pt-2' style={{backgroundColor:'#f1f1f1',paddingLeft:20}}>
                                        <div>
                                            <p className='skillstext text-danger pt-3'>Skills</p>
                                            { progSelectval === '' ? 
                                                null 
                                            :
                                              progSelectval.map((item,key) => {
                                                  return(
                                                  <p key={key} className='skilllisttext'>
                                                    {item}
                                                  </p>)
                                              })
                                            }
                                        </div>
                                        <div>
                                            <p className='educationtext text-danger pt-4'>Education</p>
                                            <p className='degreetext'>{eduSelectval} ({streamfresher})</p>
                                            <p className='universitytext'>{universityfresher}</p>
                                            <p className='yeartext'>{monthfrom} {yearfromval}-{yeartoval}</p>
                                        </div>

                                        <div>
                                            <p className='educationtext text-danger pt-4'>Certificates</p>
                                            <p className='degreetext'>{coursenamefresher}</p>
                                            <p className='universitytext'>{platnamefresher}</p>
                                            <p className='yeartext'>{certificateMonth} {certificateYear}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            }
                        </div>
                            </>
                            }
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

export default ResumeformScreen;