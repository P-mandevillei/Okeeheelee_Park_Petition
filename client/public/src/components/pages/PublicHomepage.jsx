import { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import palm from "../../assets/pic/Habitat/DSC04274.jpg"

export default function PublicHomepage(props) {

    const nav = useNavigate();

    return <div>
        <Card style={{
            "border": "rgba(0,0,0,0)",
            position: 'relative', height: '90vh',
        }}>
            <img className='backgroundImgFlex' src={palm} alt="A background image of palm habitats" />
            
            <Container className="frontTextWrapper">
                <Row className="center whiteBold" style={{flex: 2, fontSize: "6vw"}}>
                    <div style={{margin: 'auto', background: 'rgba(25,118,210,0.4)'}}>
                        Protect Okeeheelee Park!
                    </div>
                </Row>
                <Row className="center" style={{flex: 1, width: '100%'}}>
                    <Col xs={12}>
                        <Button onClick={()=>{nav('/contribute')}} className="secondaryColor secondaryColorHover" style={{'fontSize': "2.5vw", 'width': '50%'}}>
                            Contribute!
                        </Button>
                    </Col>
                </Row>
                <Row style={{flex: 1}}>
                    <p className="center" style={{"color": "rgb(246, 240, 240)", fontSize: "2.2vw"}}>
                        Call for reallocation of <span className="whiteBold">~$4.1M</span> funds <br/> 
                        toward <span style={{'fontWeight': "bold"}}>natural restoration</span> <br/> 
                        instead of turning it into an RV park 
                    </p>
                </Row>
                
                <Row style={{'padding': '1vw', flex: 1}}>
                    <Col xs={12} className="center">
                        <span className="selectablePrimaryFlipped" onClick={()=>nav("/details")} style={{'fontSize': "1.5vw"}}>
                            Read More
                        </span>
                    </Col> 
                </Row>
            </Container>
        </Card>
    </div>
}