import { useContext, useId, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

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

import { allFactsPath, proposalPath } from "../../clientPaths";
import PicAndParagraph from "./PicAndParagraph";
import Header from "./Header";
import { LazyMotionBtn, LazyMotionDiv } from "../../suspense/motion";
import ScreenWidthContext from "../contexts/ScreenWidthContext";

const container = {
    width: 50,
    height: 25,
    backgroundColor: "#A5D6A7",
    borderColor: 'rgba(0,0,0,0)',
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    padding: '5%',
    alignItems: 'center',
    position: 'relative'
}
const handle = {
    height: '95%',
    aspectRatio: '1/1',
    borderRadius: "50%"
}

export default function Details() {
    const nav = useNavigate();
    const [showProposal, setShowProposal] = useState(false);
    const [isAutoplayOn, setIsAutoplayOn] = useState(true);
    const autoplayId = useId();

    const [screenW, setScreenW] = useContext(ScreenWidthContext);

    return <div>
        <Helmet>
            <title>Read More - Protect Okeeheelee</title>
            <meta 
                name="description" 
                content="Read more about our petition on fund redirection to protect Okeeheelee Park."
            />
        </Helmet>

        <Header text="Learn More" background={background} alt="A background image of wet prairie" />

        <div className="center" style={{position: 'fixed', right: 0, top: 55, fontSize: 13, zIndex: 1}}>
            <Form.Label htmlFor={autoplayId} style={{margin: 0}} className="primaryText">
                Autoplay
            </Form.Label>
            <button
                id={autoplayId}
                style={{
                    ...container,
                    justifyContent: "flex-" + (isAutoplayOn? "end" : "start"),
                }}
                onClick={() => setIsAutoplayOn(old => !old)}
            >
                <p 
                    style={{
                        position: 'absolute',
                        left: isAutoplayOn? '5%': '100%',
                        top: '50%',
                        transform: isAutoplayOn? 'translate(0, -50%)': 'translate(-110%, -50%)'
                    }}

                >
                    {isAutoplayOn? 'on': 'off'}
                </p>
                <LazyMotionDiv
                    style={handle}
                    className={isAutoplayOn? 'secondaryColor': 'primaryColor'}
                    layout
                    transition={{
                        type: "spring",
                        visualDuration: 0.2,
                        bounce: 0.3,
                    }}
                />
            </button>
        </div>

        <Card className="pad" style={{border: "rgba(0,0,0,0)"}}>

            <h1 className='center detailHeaders'>
                Okeeheelee Park South encompasses 960 acres of native south Florida ecological communities.
                However, current preparations envision its conversion into an RV park using ~$4.1 million from the park's budget. <br />
            </h1>
            <br/>
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

            <p className='center detailHeaders'>
                We herein propose reallocating these funds toward the restoration of native communities.<br/>
            </p>
            
            <Link to="/contribute" className="center" style={{width: '70%'}}>
                <LazyMotionBtn
                    className="primaryColor primaryHover hugeBtnEffect" 
                    style={{width: '100%', padding: '0.5em'}}
                    initial={{scale: 1, opacity: 1}}
                    whileInView={{ scale: [1, 1.1, 1], opacity: [1, 0.6, 1] }}
                    transition={{
                        duration: 1
                    }}
                >
                    Join Our Coalition
                </LazyMotionBtn>
            </Link>
            
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