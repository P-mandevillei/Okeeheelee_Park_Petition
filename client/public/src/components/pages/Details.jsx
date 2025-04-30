import { useContext, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import hardwood_hammock from "../../assets/pic/Habitat/1-1-hardwood.jpg";
import pine_flatwoods from "../../assets/pic/Habitat/1-1-pine.jpg";
import prairie from "../../assets/pic/Habitat/1-1-prairie.jpg"
import gopher from "../../assets/pic/Animals/1-1-gopher.jpg"
import newborn_rattle from "../../assets/pic/Animals/1-1-rattlesnake_newborn.jpg"
import rattle_family from "../../assets/pic/Animals/rattle_family.jpg"
import construction1 from "../../assets/pic/Construction_Area/1-1-construction1.jpg"
import construction2 from "../../assets/pic/Construction_Area/1-1-construction2.jpg"
import background from "../../assets/pic/Habitat/4-1-prairie.jpg";

import { proposalPath } from "../../../../../paths/clientPaths";

export default function Details() {
    const nav = useNavigate();
    const [showProposal, setShowProposal] = useState(false);

    return <div>
    
    <Card style={{
        "border": "rgba(0,0,0,0)",
        position: 'relative', aspectRatio: '4/1'
    }}>
        <img className="backgroundImg" src={background} alt="A background image of wet prairie" />
        
        <p className="whiteBold frontTextWrapper" style={{fontSize: '4vw'}}>
            Learn More
        </p>
    </Card>

    <Card className="pad" style={{border: "rgba(0,0,0,0)"}}>
    <p className='pad center detailHeaders'>
        Okeeheelee Park South encompasses 960 acres of native south Florida ecological communities.
        However, current preparations envision its conversion into an RV park using ~$4.1 million from the park's budget. <br />
    </p>
            

    <Container style={{'width': "90%"}}>
    <Row style={{"marginTop": '3vw', 'marginBottom': '3vw'}}>
        <Col sm={12} md={6} className="d-flex justify-content-center">
        <Card>
            <Carousel>
                <Carousel.Item>
                    <img src={hardwood_hammock} alt="A picture of the hardwood hammock ecological community" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Hardwood Hammock
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={pine_flatwoods} alt="A picture of the pine flatwoods ecological community" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Pine Flatwoods
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
        <Col sm={12} md={6} className="d-flex justify-content-center">
            <p className='center detailParagraphs'>
                The area in question is the most biodiverse section of the park and provides an essential ecosystem for native species. 
            </p>
        </Col>
    </Row>

    <Row style={{"marginTop": '3vw', 'marginBottom': '3vw'}}>
        <Col sm={12} md={{span:6, order: 'last'}} className="d-flex justify-content-center">
            <Card>
                <Carousel>
                    <Carousel.Item>
                        <img src={gopher} alt="A picture of the gopher tortoise" style={{width:"100%", aspectRatio: "1/1"}}/>
                        <Carousel.Caption>
                            Gopher Tortoise
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={rattle_family} alt="A picture of a family of Eastern Diamondback Rattlesnake" style={{width:"100%", aspectRatio: "1/1"}}/>
                        <Carousel.Caption>
                            Family of Eastern Diamondback Rattlesnakes
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={newborn_rattle} alt="A picture of a newborn Eastern Diamondback Rattlesnake" style={{width:"100%", aspectRatio: "1/1"}}/>
                        <Carousel.Caption>
                            Newborn Rattlesnake
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Card>
        </Col>
        <Col sm={12} md={{span:6, order: 'first'}} className="d-flex justify-content-center">
            <p className='center detailParagraphs'>
                It is home to many critters, including endangered tortoises, rattlesnakes, owls, wading birds like wood storks, as well as a variety of small mammals and rare invertebrates.
            </p>
        </Col>
    </Row>

    <Row style={{"marginTop": '3vw', 'marginBottom': '3vw'}}>
        <Col sm={12} md={6} className="d-flex justify-content-center">
        <Card>
            <Carousel>
                <Carousel.Item>
                    <img src={construction1} alt="A picture of the construction area" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption>
                        Invasive Australian pine surrounding construction
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={construction2} alt="A picture of the construction area" style={{width:"100%", aspectRatio: "1/1"}}/>
                    <Carousel.Caption style={{color: "black"}}>
                        Area cleared for construction
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
        </Card>
        </Col>
        <Col sm={12} md={6} className="d-flex justify-content-center">
            <p className='center detailParagraphs'>
                Facing chronic neglect since its designation as a construction area in the early 2000s, it has been overrun with invasive species, which threaten to degrade the surrounding communities without intervension.
            </p>
        </Col>
    </Row>

    </Container>
    <p className='pad center detailHeaders'>
        We herein propose reallocating these funds toward the restoration of native communities.<br/>
    </p>
    
    <Button size='lg' onClick={()=>{nav('/contribute')}} className="primaryColor primaryHover">Contribute</Button>
    <p className='center notice' style={{'fontSize': '12px'}}>
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