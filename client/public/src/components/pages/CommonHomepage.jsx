import { Link, Outlet } from "react-router-dom";
import { Container, Navbar, Nav, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useId, useState, useEffect, useRef } from "react";
import PadBottomContext from "../contexts/PadBottomContext";

export default function CommonHomepage() {
    const [expandContact, setexpandContact] = useState(false);
    const emailId = useId();
    const titleId = useId();
    const bodyId = useId();
    const footerRef = useRef();

    function updatePadBottom() {
        const footer = footerRef.current;
        const navHeight = footer.offsetHeight;
        const padBottomNodes = document.getElementsByClassName('padBottom');
        for (let node of padBottomNodes) {
        node.style.paddingBottom = `${navHeight+50}px`;
        }
    }
    
    useEffect(updatePadBottom, [expandContact]);

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

    <PadBottomContext.Provider value={updatePadBottom}>
        <Outlet />
    </PadBottomContext.Provider>

    <Navbar fixed="bottom" className="primaryColor" data-bs-theme="dark" ref={footerRef}>
    <Container>
    <div className="center">
    <Row>
        <Col xs={12}>
            <Nav className="me-auto">
                <Nav.Link onClick={()=>{setexpandContact(old=>!old)}}>{expandContact? "Hide Contact Form":"Contact Us"}</Nav.Link>
            </Nav>
        </Col>
        <Col xs={12}>
        {expandContact? <Card style={{"backgroundColor": "#2E7D32", "border": "#2E7D32"}}>
        <Container>
        <Row>
            <Col xs={12} sm={6} >
                <Form.Label htmlFor={emailId}>Your Email<span className="warning">*</span></Form.Label>
                <Form.Control id={emailId} />
            </Col>
            <Col xs={12} sm={6} >
                <Form.Label htmlFor={titleId}>Subject<span className="warning">*</span></Form.Label>
                <Form.Control id={titleId} />
            </Col>
            <Col xs={12}>
                <Form.Label htmlFor={bodyId}>Message<span className="warning">*</span></Form.Label>
                <Form.Control id={bodyId} as="textarea" rows={4} />
            </Col>
        </Row>
        </Container>
        <br />
        <Button className="secondaryColor secondaryColorHover">Submit</Button>
        </Card>
        : <></>}
        </Col>
    </Row>
    </div>
        
    
    </Container>
    </Navbar>
    </>
}