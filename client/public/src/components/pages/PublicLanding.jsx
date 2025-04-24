import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PublicLanding() {
    return <div>
        <p>
            You seem to have arrived at an uncharted territory!
        </p>
        <Button as={Link} to='/' >Back to Safety</Button>
    </div>
}