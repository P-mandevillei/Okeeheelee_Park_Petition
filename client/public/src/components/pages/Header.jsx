import { memo } from "react";
import { Card } from "react-bootstrap";

function DisplayHeader(props) {
    return <Card className='headerCard'>
        <img className="backgroundImg" src={props.background} alt={props.alt} />
        <p className="whiteBold frontTextWrapper" style={{fontSize: '4vw'}}>
            {props.text}
        </p>
    </Card>
}

const Header = memo(DisplayHeader);
export default Header;