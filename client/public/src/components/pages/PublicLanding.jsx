import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "../../assets/tinified/4-1-rattle.webp";
import Header from "./Header";

export default function PublicLanding() {
    return <>
    <Header text="Unknown Territory" background={background} alt="A background image of a rattlesnake"/>
    <div className="pad center" style={{'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center'}}>
        <p style={{"fontWeight": 'bold', 'fontSize': '20px'}}>
            You seem to have arrived at an uncharted territory!
        </p>
        <Button as={Link} to='/' className="primaryColor primaryHover">
            Back to Safety
        </Button>
    </div>
    </>
}