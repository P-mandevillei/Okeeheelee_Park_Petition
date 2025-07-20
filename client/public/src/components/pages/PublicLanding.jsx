import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "../../assets/tinified/4-1-rattle.webp";
import Header from "./Header";
import { Helmet } from "react-helmet";

export default function PublicLanding() {
    return <>
    <Helmet>
        <title>Protect Okeeheelee</title>
        <meta
            name="description" 
            content="Protect Okeeheelee Park! Call for the reallocation of ~$4.1M funds toward the natural restoration of Okeeheelee Park South instead of turning it into yet another RV park."
        />
    </Helmet>
    <Header text="Unknown Territory" background={background} alt="A background image of a rattlesnake"/>
    <div className="pad center" style={{'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center'}}>
        <p style={{"fontWeight": 'bold', 'fontSize': '20px'}}>
            You seem to have arrived at an uncharted territory!
        </p>
        <Button as={Link} to='/' className="primaryColor primaryHover hugeBtnEffect">
            Back to Safety
        </Button>
    </div>
    </>
}