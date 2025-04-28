import { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PadBottomContext from "../contexts/PadBottomContext";
import background_1 from "../../assets/background_1.jpeg"
import background_2 from "../../assets/background_2.jpeg"

export default function PublicHomepage(props) {
    const padBottomPx = useContext(PadBottomContext);

    const nav = useNavigate();

    return <div style={{"paddingBottom": `${padBottomPx}px`}}>
        <Card style={{"border": "rgba(0,0,0,0)", 'position': 'relative'}}>
            <img src={background_1} alt="background image" style={{'position': 'relative', 'zIndex': 1, "filter": "blur(8px)", "-webkit-filter": "blur(8px)"}}/> 
            <Container style={{'padding': '5vw', 'position':'absolute', 'zIndex': 999}}>
                
                <p className="center whiteBold" style={{fontSize: "6vw", 'padding': "1vw"}}>Protect Okeeheelee Park!</p>
                <p className="center" style={{"color": "rgb(246, 240, 240)", fontSize: "3vw", 'padding': "6vw"}}>
                    Call for reallocation of <span className="notice">~$4.1M</span> funds <br/> 
                    toward <span style={{'fontWeight': "bold"}}>natural restoration</span> <br/> 
                    instead of turning it into an RV park 
                </p>
                <Row style={{'padding': '3vw'}}>
                <Col xs={6} className="center">
                    <span className="selectablePrimaryFlipped" onClick={()=>nav("/details")} style={{'fontSize': "2.5vw"}}>
                        Read More
                    </span>
                </Col>
                <Col xs={6} className="center">
                    <Button onClick={()=>{nav('/contribute')}} className="primaryColor primaryHover" style={{'fontSize': "2.5vw"}}>
                        Contribute!
                    </Button>
                </Col>
                </Row>
            </Container>
        </Card>
    </div>
}