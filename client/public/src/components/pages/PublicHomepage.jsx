import { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PadBottomContext from "../contexts/PadBottomContext";

export default function PublicHomepage() {
    const nav = useNavigate();
    const updatePadBottom = useContext(PadBottomContext);
    useEffect(()=> {
        const timeout = setTimeout(()=> {
            updatePadBottom();
        }, 0);
        return clearTimeout(timeout);
    }, []);

    return <div className="pad padBottom">
        <h1 className="center">Protect Okeeheelee Park!</h1>
        <br />
        <Card className="pad">
        This proposal advocates for the natural restoration of an approximately 100-acre area within Okeeheelee Park South. There are currently preparations underway to convert the area into an RV park using ~$4.1 million from the park's budget. The proposal herein suggests reallocating these funds toward the restoration of native pine flatwoods community, which will in turna) mitigate the spread of invasive species, b) support native biodiversity, c) provide an enhanced experience for visitors, and d) serve as habitat for listed and declining wildlife species. This initiative is aligned with Palm Beach County Parks and Recreation Department's ecological vision and enhances the long-term environmental and recreational value of the park.
        </Card>
        <br />
        <Container className="center">
            <Row>
                <Col xs={12} sm={6}>
                    <span className="selectablePrimary" onClick={()=>nav("/details")}>More info</span>
                </Col>
                <Col xs={12} sm={6}>
                    <Button onClick={()=>{nav('/contribute')}} className="primaryColor primaryHover">Contribute</Button>
                </Col>
                
            </Row>
        </Container>
    </div>
}