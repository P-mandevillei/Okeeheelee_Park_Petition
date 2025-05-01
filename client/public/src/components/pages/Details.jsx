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
import australian_pine_1 from "../../assets/pic/Invasive_Plants/1-1-apine1.jpg";
import australian_pine_2 from "../../assets/pic/Invasive_Plants/1-1-apine2.jpg";

import { proposalPath } from "../../../../../paths/clientPaths";
import PicAndParagraph from "./PicAndParagraph";
import Header from "./Header";

export default function Details() {
    const nav = useNavigate();
    const [showProposal, setShowProposal] = useState(false);

    return <div>
        <Header text="Learn More" background={background} alt="A background image of wet prairie" />

        <Card className="pad" style={{border: "rgba(0,0,0,0)"}}>
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
            />
        
            <PicAndParagraph 
                paragraph = "It is home to many critters, including endangered tortoises, rattlesnakes, owls, wading birds like wood storks, as well as a variety of small mammals and rare invertebrates."
                img = {[
                    {src: gopher, alt: "A picture of the gopher tortoise", caption: "Gopher Tortoise"},
                    {src: rattle_family, alt: "A picture of a family of Eastern Diamondback Rattlesnake", caption: "Family of Eastern Diamondback Rattlesnakes"},
                    {src: newborn_rattle, alt: "A picture of a newborn Eastern Diamondback Rattlesnake", caption: "Newborn Rattlesnake"}
                ]}
                putImgLeft = {true}
            />

            <PicAndParagraph 
                paragraph = "However, facing chronic neglect since designated as a construction area in the early 2000s, it has been overrun with invasive species, which threaten to degrade the surrounding communities without intervention."
                img = {[
                    {src: construction2, alt: "A picture of the construction area", caption: "Area cleared for construction", style: {color: "#2E7D32"}},
                    {src: construction1, alt: "A picture of the construction area", caption: "Invasive Australian pines surrounding construction"}                
                ]}
                putImgLeft = {false}
            />

            <PicAndParagraph 
                paragraph = "Current funding for recreational projects could cover invasive species removal, native vegetation replanting and long-term management of the area, revigorizing the environment and its community."
                img = {[
                    {src: australian_pine_1, alt: "A picture of the invasive Australian pine", caption: "Invasive Australian Pines", style: {color: '#2E7D32'}},
                    {src: australian_pine_2, alt: "A picture of the invasive Australian pine", caption: "More Invasive Australian Pines"}                
                ]}
                putImgLeft = {true}
            />


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