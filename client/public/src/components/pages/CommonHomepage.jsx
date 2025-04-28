import { Link, Outlet } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useId, useState, useEffect, useRef } from "react";
import PadBottomContext from "../contexts/PadBottomContext";
import ExpandContactContext from "../contexts/ExpandContactContext";
import { isValidEmail } from "../auth/SubmissionValidations";
import { emailPath } from "../../../../../paths/clientPaths";
import MessageBox from "./MessageBox";

export default function CommonHomepage() {
    const [expandContact, setexpandContact] = useState(false);
    const [padBottomPx, setPadBottomPx] = useState(100);
    const emailId = useId();
    const bodyId = useId();
    const footerRef = useRef();

    const emailRef = useRef();
    const [emailWarning, setEmailWarning] = useState("");
    const msgRef = useRef();
    const [msgWarning, setMsgWarning] = useState("");
    const resetFields = ()=>{
        setEmailWarning("");
        setMsgWarning("");
    }

    useEffect(()=> {
        setPadBottomPx(footerRef.current.offsetHeight + 50);
    }, [expandContact, emailWarning, msgWarning]);

    function sendEmail(e) {
        e?.preventDefault();
        resetFields();

        const email = emailRef.current.value;
        const msg = msgRef.current.value;
        if (!isValidEmail(email)) {
            setEmailWarning("Please enter a valid email address.");
            return;
        }
        if (!msg) {
            setMsgWarning("Please enter a message.");
            return;
        }

        const data = {"subject": `message from ${email}`, "msg": msg};
        fetch(emailPath, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            if (!result['error']) {
                setHeader("Success!");
                setBody("Your message has been sent to our team.");
                setShowMsg(true);
                emailRef.current.value = "";
                msgRef.current.value = "";
            } else {
                setHeader("Sorry, something went wrong with your email.");
                setBody(result['msg']);
                setShowMsg(true);
            }
        }).catch(err => console.log(err));
    }
    
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [showMsg, setShowMsg] = useState(false);
 
    return <>
    <Navbar sticky="top" expand="sm" className="primaryColor" data-bs-theme="dark">
    <Container>
        <Navbar.Brand as={Link} to='/'>Protect Okeeheelee Park</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/details'>Learn More</Nav.Link>
            <Nav.Link as={Link} to='/contribute'>Contribute</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>

    <ExpandContactContext.Provider value={setexpandContact}>
    <PadBottomContext.Provider value={padBottomPx}>
        <Outlet/>
    </PadBottomContext.Provider>
    </ExpandContactContext.Provider>

    <Navbar fixed="bottom" className="primaryColor" data-bs-theme="dark" ref={footerRef}>
    <Container>
    <div className="center">
    <Row>
        <Col xs={12}>
            <Nav className="me-auto">
                <Nav.Link onClick={()=>{setexpandContact(old=>!old)}}>{expandContact? "Hide Contact Form":"Contact Us"}</Nav.Link>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
        </Col>
        <Col xs={12}>
        {expandContact? <Card style={{"backgroundColor": "#2E7D32", "border": "#2E7D32"}}>
        <Container>
        <Row>
            <Col xs={12}>
                <Form.Label htmlFor={emailId}>Your Email Address<span className="warning">*</span></Form.Label>
                <Form.Control id={emailId} ref={emailRef}/>
                {emailWarning? <p className="warning">{emailWarning}</p>:<></>}
            </Col>
            
            <Col xs={12}>
                <Form.Label htmlFor={bodyId}>Message<span className="warning">*</span></Form.Label>
                <Form.Control id={bodyId} as="textarea" rows={4} ref={msgRef}/>
                {msgWarning? <p className="warning">{msgWarning}</p>:<></>}
            </Col>
        </Row>

        <MessageBox header={header} body={body} showMsg={showMsg} setShowMsg={setShowMsg} />

        </Container>
        <br />
        <Button className="secondaryColor secondaryColorHover" onClick={(e)=>{sendEmail(e)}}>Submit</Button>
        </Card>
        : <></>}
        </Col>
    </Row>
    </div>
        
    
    </Container>
    </Navbar>
    </>
}