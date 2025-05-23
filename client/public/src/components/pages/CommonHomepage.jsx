import { Link, Outlet } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useId, useState, useEffect, useRef } from "react";
import ExpandContactContext from "../contexts/ExpandContactContext";
import { isValidEmail } from "../auth/SubmissionValidations";
import { adminPublicEmail, emailPath } from "../../../../../paths/clientPaths";
import MessageBox from "./MessageBox";
import { ClipLoader } from "react-spinners";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function CommonHomepage() {
    const [expandContact, setexpandContact] = useState(false);
    useEffect(()=> {
        if (expandContact) {
            window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
        }
    }, [expandContact])

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

    const [showSubmitText, setShowSubmitText] = useState(true);
    const { executeRecaptcha } = useGoogleReCaptcha();

    async function sendEmail(e) {
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

        const token = await executeRecaptcha();
        const data = {
            "subject": `message from ${email}`, 
            "msg": msg,
            "recaptchaToken": token
        };
        setShowSubmitText(false);
        fetch(emailPath, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(result => {
            setShowSubmitText(true);
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
        }).catch(() => {
            setShowSubmitText(true);
            setHeader("Sorry, something went wrong with your email.");
            setBody(`Unable to connect to the server. Please try again later or contact our admin at ${adminPublicEmail}.`);
            setShowMsg(true);
        });
    }
    
    const [header, setHeader] = useState("");
    const [body, setBody] = useState("");
    const [showMsg, setShowMsg] = useState(false);
 
    return <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
    <Navbar sticky="top" expand="sm" className="primaryColor" data-bs-theme="dark">
    <Container>
        <Navbar.Brand as={Link} to='/'><img src="./pine_icon.png" alt="An icon of a pine leaf" width="30" style={{'aspectRatio': '1/1'}} className="d-inline-block align-top"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link as={Link} to='/details'>Learn More</Nav.Link>
            <Nav.Link as={Link} to='/contribute'>Join Coalition</Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>

    <div style={{flex: 1}}>
        <ExpandContactContext.Provider value={setexpandContact}>
            <Outlet/>
        </ExpandContactContext.Provider>
    </div>

    <Navbar className="primaryColor" data-bs-theme="dark" ref={footerRef}>
    <Container>
    <div className="center" style={{'padding': '0.8em'}}>
    <Row>
        <Col xs={12}>
            <Navbar.Text>
                <Nav.Link as={Link} to="/" className="greyHover">Home</Nav.Link>
                <Nav.Link className="greyHover" onClick={()=>{setexpandContact(old=>!old)}}>{expandContact? "Hide Contact Form":"Contact Us"}</Nav.Link>
            </Navbar.Text>
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
                <Button className="secondaryColor secondaryColorHover hugeBtnEffect" onClick={(e)=>{sendEmail(e)}} disabled={!showSubmitText}>
                    {showSubmitText? "Submit": <ClipLoader color="#36d7b7" />}
                </Button>
            </Card>
            : <></>}
        </Col>

        <Col xs={12}>
            <Navbar.Text style={{'fontSize': '0.8em'}}>
                This initiative is led by the Okeeheelee Wildlife Society, a registered 501(c)(3) nonprofit organization. 
                Please contact {" "}
                <a className="selectableGrey" href="mailto:golfinl@gmail.com">golfinl@gmail.com</a> or {" "}
                <a className="selectableGrey" href="mailto:tasman@wustl.edu">tasman@wustl.edu</a> with questions.
            </Navbar.Text>
        </Col>
    </Row>
    </div>
        
    
    </Container>
    </Navbar>
    </div>
}