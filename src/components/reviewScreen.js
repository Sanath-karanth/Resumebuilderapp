import React, { useEffect, useState } from 'react';
import {Navbar,Nav,Container,Row,Col,Button,Card,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import { useNavigate  } from "react-router-dom";
import '../css/feedback.css'
import { useAuth } from "../contexts/AuthContext"

const ReviewScreen = () => {

    const navigate = useNavigate();
    const { getAlldata,createdata,deletedata } = useAuth();
    const [tablevalues,setTablevalues] = useState([]);
    const [tablenull,setTablenull] = useState(false);

    const homeClick = () => {
        navigate("/home");
    }

    const backClick = () => {
        navigate(-1);
    }

    const reviewData = async() => {
        try {
          getAlldata('feedbackdata').on('value', snapshot => {
           if (snapshot.val() != null) 
           {
            setTablenull(false);
             let mainarr = [];
             let x=[];
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
        <div className="ReviewContainer pb-4">

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


            <Container>
                {tablenull ? <p className='emptydataerr'>There is no Data!!</p> : null }
                { tablevalues.map((item,key) => {
                    return(
                    <Card key={key} className='mt-4'>
                        <Card.Header>{item.username}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                            <p>
                                {item.feedback}
                            </p>
                            <footer className="blockquote-footer">
                                Rating: <span className='text-danger'>{item.rating}</span>
                            </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    );
                })}

            


            </Container>
        </div>
    );
}

export default ReviewScreen;