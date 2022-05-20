import React, { useEffect, useState, Fragment } from 'react';
import '../css/review.css'
import { useAuth } from "../contexts/AuthContext"
import {Navbar,Nav,Container,Row,Col,Button,Card,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate  } from "react-router-dom";
import ReactStars from 'react-stars'
import Avatar from '@mui/material/Avatar';
import { faHome, faAngleLeft, faTrash} from '@fortawesome/free-solid-svg-icons'

const ReviewScreen = () => {

    const navigate = useNavigate();
    const { getAlldata,deletedata } = useAuth();
    const [tablevalues,setTablevalues] = useState([]);

    const [deletemodalShow, setDeletemodalShow] = useState(false);
    const [tablenull,setTablenull] = useState(false);
    const [pathvalue,setPathvalue] = useState('');
    const [idvalue,setIdvalue] = useState('');
    const [usernamevalue,setUsernamevalue] = useState('');

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        let color = "#" + hex.toString(16);
      
        return color;
    }

    const homeClick = () => {
        navigate("/home");
    }

    const backClick = () => {
        navigate(-1);
    }

    const deletepopup = (pathval,idval,usernameval) => {
        setDeletemodalShow(true);
        setPathvalue(pathval);
        setIdvalue(idval);
        setUsernamevalue(usernameval);
    }
    
    const deleteData = async() => {
        setDeletemodalShow(false);
        setTablevalues([]);
        deletedata(pathvalue,idvalue)
        .then(() => {
        console.log('Data deleted successfully!');
        })
        .catch((e) => {
        console.log(e);
        });
    }

    function DeleteModal(props) {
        return (
          <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <div className='deletemodalheader'>
                  <h4>{usernamevalue}</h4>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='deletemodalquestion'>
                <h2>Are you Sure?</h2>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Cancel</Button>
              <Button variant='success' onClick={deleteData}>OK</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    const reviewData = async() => {
        try {
          getAlldata('feedbackdata').on('value', snapshot => {
           if (snapshot.val() != null) 
           {
            setTablenull(false);
             let mainarr = [];
             snapshot.forEach((item) => {
              let dbkey = item.key;
              let data = item.val();
              mainarr.push({
                dbkey: dbkey,
                uniqueID:data.uniqueID,
                username: data.usernameval,
                rating:data.rate,
                feedback: data.feedbackval,
              });
            });
  
             setTablevalues(mainarr.reverse());
             console.log("mail arr  ",mainarr);
            }
            else
            {
                setTablenull(true);
            }  
         })
       } catch(err) {
         console.log(err)
       }
      };

      useEffect(() => {
        reviewData();
      },[]);


    return (
        <div className="ReviewContainer h-100 pb-4">

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


            <Container fluid>
            <DeleteModal
                  show={deletemodalShow}
                  onHide={() => setDeletemodalShow(false)}
                />
                {tablenull ? <p className='emptydataerr'>There is no Data!!</p> : null }

                { tablevalues.map((item,key) => {
                  return(
                    <Fragment key={key}>
                      <Row>
                        <Col xs="0" sm="2" md="2" lg="2" xl="3" xxl="4" xxxl="4"></Col>
                        <Col xs="12" sm="8" md="8" lg="8" xl="6" xxl="4" xxxl="4">
                          <div className='reviewMain-cont'>
                            <Card 
                                className='mt-3 mb-3 p-2 shadow-lg' >
                                <Card.Body>
                                  <Row>
                                    <Col xs="2" sm="2" md="2" lg="2" xl="2" xxl="2" xxxl="2">
                                      <Avatar id='avatarContent' style={{
                                              backgroundColor: randomColor()
                                            }}>
                                          <p>{item?.username ?.charAt(0) || "UN"}</p>
                                      </Avatar>
                                    </Col>
                                    <Col xs="9" sm="9" md="9" lg="9" xl="9" xxl="9" xxxl="9">
                                      <div className='reviewcard-header-cont'>
                                            <div className='reviewcard-title'>
                                              <h3>{item.username}</h3>
                                            </div>
                                            
                                            <span style={{display:'flex',flexDirection:'row'}}>
                                              <ReactStars
                                                  count={5}
                                                  value={item.rating}
                                                  size={25}
                                                  edit={false}
                                                  color={'#ffd700'}>
                                              </ReactStars>
                                              <p className='review-rating-number'>{item.rating}</p>
                                            </span>

                                            <div className='reviewcard-date-cont'>
                                              <p>{item.feedbackdate}</p>
                                            </div>
                                      </div>
                                    </Col>
                                    <Col xs="1" sm="1" md="1" lg="1" xl="1" xxl="1" xxxl="1">
                                      <div onClick={() => deletepopup('feedbackdata',item.dbkey,item.username)}>
                                          <FontAwesomeIcon icon={faTrash} size="sm" color="red" />
                                      </div>
                                    </Col>
                                  </Row>
                                  
                                  <Row>
                                    <Col>
                                      <div className='reviewcard-feedback-decription'>
                                        <p style={{paddingTop:'20px'}}>
                                          {item.feedback}
                                        </p>
                                      </div>
                                    </Col>
                                  </Row>
                                </Card.Body>
                            </Card>
                          </div>

                          
                        </Col>
                        <Col xs="0" sm="2" md="2" lg="2" xl="3" xxl="4" xxxl="4"></Col>
                      </Row>
                    </Fragment>
                  )
                })}

            


            </Container>
        </div>
    );
}

export default ReviewScreen;