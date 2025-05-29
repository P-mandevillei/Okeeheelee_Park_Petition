import { useContext, useId, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

import hardwood_hammock from "../../assets/tinified/1-1-hardwood.webp";
import pine_flatwoods from "../../assets/tinified/1-1-pine.webp";
import prairie from "../../assets/tinified/1-1-prairie.webp"
import gopher from "../../assets/tinified/1-1-gopher.webp"
import newborn_rattle from "../../assets/tinified/1-1-rattlesnake_newborn.webp"
import rattle_family from "../../assets/tinified/rattle_family.webp"
import construction1 from "../../assets/tinified/1-1-construction1.webp"
import construction2 from "../../assets/tinified/1-1-construction2.webp"
import background from "../../assets/tinified/4-1-prairie.webp";
import australian_pine_1 from "../../assets/tinified/1-1-apine1.webp";
import australian_pine_2 from "../../assets/tinified/1-1-apine2.webp";

import { allFactsPath, proposalPath } from "../../../../../paths/clientPaths";
import PicAndParagraph from "./PicAndParagraph";
import Header from "./Header";

export default function Details() {
    const nav = useNavigate();
    const [showProposal, setShowProposal] = useState(false);
    const [isAutoplayOn, setIsAutoplayOn] = useState('1');
    const autoplayId = useId();

    return <div>
        <Header text="Learn More" background={background} alt="A background image of wet prairie" />

        <Card className="pad" style={{border: "rgba(0,0,0,0)"}}>
            <div className="center" style={{position: 'fixed', right: 0, top: 55, backgroundColor: 'white', fontSize: 13, borderRadius: 5, zIndex: 1}}>
                <Form.Label htmlFor={autoplayId} style={{margin: 0}}>Autoplay</Form.Label>
                <Form.Select
                    id={autoplayId}
                    className={isAutoplayOn==='1'? "secondaryText":"primaryText"} 
                    style={{fontSize: 13}} 
                    value={isAutoplayOn} 
                    onChange={(e)=>{setIsAutoplayOn(e.target.value)}}
                >
                    <option className="secondaryText" value={'1'}>On</option>
                    <option className="primaryText" value={'0'}>Off</option>
                </Form.Select>
            </div>
            <p className='pad center detailHeaders'>
                Okeeheelee Park South encompasses 960 acres of native south Florida ecological communities.
                However, current preparations envision its conversion into an RV park using ~$4.1 million from the park's budget. <br />
            </p>

            <Container style={{'width': "90%"}}>
                <PicAndParagraph 
                    paragraph = "The area in question is the most biodiverse section of the park and provides an essential ecosystem for native species."
                    img = {[
                        {src: hardwood_hammock, alt: "A picture of the hardwood hammock ecological community", caption: "Hardwood Hammock"},
                        {src: pine_flatwoods, alt: "A picture of the pine flatwoods ecological community", caption: "Pine Flatwoods"},
                        {src: prairie, alt: "A picture of the pine flatwoods ecological community", caption: "Wet Prairie"}
                    ]}
                    putImgLeft = {false}
                    autoplay = {isAutoplayOn}
                />
            
                <PicAndParagraph 
                    paragraph = "It is home to many critters, including endangered tortoises, rattlesnakes, owls, wading birds like wood storks, as well as a variety of small mammals and rare invertebrates."
                    img = {[
                        {src: gopher, alt: "A picture of the gopher tortoise", caption: "Gopher Tortoise"},
                        {src: rattle_family, alt: "A picture of a family of Eastern Diamondback Rattlesnake", caption: "Family of Eastern Diamondback Rattlesnakes"},
                        {src: newborn_rattle, alt: "A picture of a newborn Eastern Diamondback Rattlesnake", caption: "Newborn Rattlesnake"}
                    ]}
                    putImgLeft = {true}
                    autoplay = {isAutoplayOn}
                />

                <PicAndParagraph 
                    paragraph = "However, facing chronic neglect since designated as a construction area in the early 2000s, it has been overrun with invasive species, which threaten to degrade the surrounding communities without intervention."
                    img = {[
                        {src: construction2, alt: "A picture of the construction area", caption: "Area cleared for construction", style: {color: "#2E7D32"}},
                        {src: construction1, alt: "A picture of the construction area", caption: "Invasive Australian pines surrounding construction"}                
                    ]}
                    putImgLeft = {false}
                    autoplay = {isAutoplayOn}
                />

                <PicAndParagraph 
                    paragraph = "Current funding for recreational projects could cover invasive species removal, native vegetation replanting and long-term management of the area, revigorizing the environment and its community."
                    img = {[
                        {src: australian_pine_1, alt: "A picture of the invasive Australian pine", caption: "Invasive Australian Pines", style: {color: '#2E7D32'}},
                        {src: australian_pine_2, alt: "A picture of the invasive Australian pine", caption: "More Invasive Australian Pines"}                
                    ]}
                    putImgLeft = {true}
                    autoplay = {isAutoplayOn}
                />


            </Container>

            <p className='pad center detailHeaders'>
                We herein propose reallocating these funds toward the restoration of native communities.<br/>
            </p>
            
            <Button size='lg' onClick={()=>{nav('/contribute')}} className="primaryColor primaryHover hugeBtnEffect">Join Our Coalition</Button>
            <p className='center notice' style={{'fontSize': '12px'}}>
                We cannot do this alone. Your voice is greatly appreciated!
            </p>
            <br />

            <Container>
                <Row>
                    <Col xs={12} sm={6} className="d-flex justify-content-center">
                        <span className={showProposal? "selectableSecondary": "selectablePrimary"} onClick={()=>{setShowProposal(old=>!old)}}>
                            {showProposal? "Hide Proposal": "Read the Full Proposal"}
                        </span>
                    </Col>
                    <Col xs={12} sm={6} className="d-flex justify-content-center">
                        <a className="selectablePrimary" href={allFactsPath} target="_blank"> 
                            All the Facts 
                        </a>
                    </Col>
                </Row>
            </Container>
            <br/>
            {showProposal?
                <iframe 
                    height={550} 
                    src={proposalPath}
                    width="100%"
                    title="Full Proposal"
                >
                    <p>
                        Your browser does not support online pdf viewing. You can {' '}
                        <a className="selectablePrimary" href={proposalPath} download={proposalPath}>
                            download the full proposal
                        </a>.
                    </p>
                </iframe>
            : <></>}       

        </Card>

    </div>
}