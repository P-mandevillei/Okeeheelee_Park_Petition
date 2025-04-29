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
            <img src={background_1} alt="background image" style={{'position': 'relative', 'zIndex': 1, "filter": "blur(8px)", "WebkitFilter": "blur(8px)"}}/> 
            <Container style={{'padding': '5vw', 'position':'absolute', 'zIndex': 999}}>
                <p className="center whiteBold" style={{fontSize: "6vw", 'padding': "2vw"}}>Protect Okeeheelee Park!</p>
                <Col xs={12} className="center">
                    <Button onClick={()=>{nav('/contribute')}} className="secondaryColor secondaryColorHover" style={{'fontSize': "2.5vw", 'width': '50%'}}>
                        Contribute!
                    </Button>
                </Col>
                <p className="center" style={{"color": "rgb(246, 240, 240)", fontSize: "3vw", 'padding': "3vw"}}>
                    Call for reallocation of <span className="notice">~$4.1M</span> funds <br/> 
                    toward <span style={{'fontWeight': "bold"}}>natural restoration</span> <br/> 
                    instead of turning it into an RV park 
                </p>
                <Row style={{'padding': '3vw'}}>
                <Col xs={12} className="center">
                    <span className="selectablePrimaryFlipped" onClick={()=>nav("/details")} style={{'fontSize': "2.5vw"}}>
                        Read More
                    </span>
                </Col>
                
                </Row>
            </Container>
        </Card>
    </div>
}