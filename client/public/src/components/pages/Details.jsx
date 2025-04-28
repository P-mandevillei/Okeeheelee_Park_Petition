import { useContext, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import PadBottomContext from "../contexts/PadBottomContext";
import hardwood_hammock from "../../assets/hardwood_hammock.jpg";
import prairie from "../../assets/prairie.jpeg"
import australian_pine from "../../assets/australian_pine.jpeg"
import melaleuca from "../../assets/melaleuca.jpeg"
import gopher from "../../assets/gopher.jpeg"
import screech from "../../assets/screech.jpeg"
import atala from "../../assets/atala.jpeg"
import { proposalPath } from "../../../../../paths/clientPaths";

export default function Details() {
    const padBottomPx = useContext(PadBottomContext);
    const nav = useNavigate();
    const [showProposal, setShowProposal] = useState(false);

    return <div className="pad" style={{'paddingBottom': `${padBottomPx}px`}}>
    <Card style={{border: "rgba(0,0,0,0)"}}>
    <p className='pad center' style={{'fontSize': '1em', 'fontWeight': 'bold'}}>
        Okeeheelee Park South encompasses 960 acres of native south Florida ecological communities.<br/>
        However, current preparations envision its conversion into an RV park using ~$4.1 million from the park's budget. <br />
    </p>
            

    <Container style={{'width': "90%"}}>
    <Row style={{"marginTop": '3vw', 'marginBottom': '3vw'}}>
        <Col xs={12} sm={6} className="d-flex justify-content-center">
        <Card>
            <Carousel>
                <Carousel.Item>
                    <img src={hardwood_hammock} alt="A picture of the hardwood hammock ecological community" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Hardwood Hammock
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={prairie} alt="A picture of the wet prairie ecological community" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Wet Prairie
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
        </Card>
        </Col>
        <Col xs={12} sm={6} className="d-flex justify-content-center">
            <p className='center' style={{'fontSize': "2vw"}}>
                The area in question is the most biodiverse section of the park and provides an essential ecosystem for native species. 
            </p>
        </Col>
    </Row>

    <Row style={{"marginTop": '3vw', 'marginBottom': '3vw'}}>
        <Col xs={12} sm={{span:6, order: 'last'}} className="d-flex justify-content-center">
            <Card>
            <Carousel>
                <Carousel.Item>
                    <img src={australian_pine} alt="A picture of the invasive Australian pine" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Invasive Australian pine
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={melaleuca} alt="A picture of the invasive Melaleuca" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Invasive Melaleuca
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </Card>
        </Col>
        <Col xs={12} sm={{span:6, order: 'first'}} className="d-flex justify-content-center">
            <p className='center' style={{'fontSize': "2vw"}}>
                Facing chronic neglect, it has been overrun with invasive species, which threaten to degrade the surrounding communities without intervension.
            </p>
        </Col>
    </Row>

    <Row style={{"marginTop": '3vw', 'marginBottom': '3vw'}}>
        <Col xs={12} sm={6} className="d-flex justify-content-center">
        <Card>
            <Carousel>
                <Carousel.Item>
                    <img src={atala} alt="A picture of the Atala hairstreak butterfly" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Atala Hairstreak Butterfly
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={gopher} alt="A picture of the gopher tortoise" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Gopher Tortoise
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={screech} alt="A picture of the Eastern Screech Owl" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Eastern Screech Owl
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
        </Card>
        </Col>
        <Col xs={12} sm={6} className="d-flex justify-content-center">
            <p className='center' style={{'fontSize': "2vw"}}>
            The park is home to many critters, including endangered tortoises, rattlesnakes, owls, wading birds like wood storks, as well as a variety of small mammals and rare invertebrates.
            </p>
        </Col>
    </Row>

    </Container>
    <p className='pad center' style={{'fontSize': '1em', 'fontWeight': 'bold'}}>
        We herein propose reallocating these funds toward the restoration of native communities.<br/>
    </p>
    
    <Button size='lg' onClick={()=>{nav('/contribute')}} className="primaryColor primaryHover">Contribute</Button>
    <p className='center notice' style={{'fontSize': '0.8em'}}>
        We cannot do this alone. Your voice is greatly appreciated!
    </p>

    <p className="pad center selectablePrimary" onClick={()=>{setShowProposal(old=>!old)}}>
        {showProposal? "Hide Proposal"
        : "Read the Full Proposal"}
    </p>
    {showProposal?
    <iframe height={550} src={`https://docs.google.com/gview?url=${proposalPath}&embedded=true`}></iframe>
    : <></>}

    </Card>

    </div>
}