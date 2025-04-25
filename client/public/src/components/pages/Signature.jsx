import { useContext, useEffect, useRef, useState } from "react";
import SignatureForm from "./SignatureForm";
import ExpandContactContext from "../contexts/ExpandContactContext";
import { Button, Card } from "react-bootstrap";
import PadBottomContext from "../contexts/PadBottomContext";
import { Fireworks } from '@fireworks-js/react';

export default function Signature(props) {
    const [showForm, setShowForm] = useState(true);
    const setExpandContact = useContext(ExpandContactContext);
    const padBottomPx = useContext(PadBottomContext);
    const [showFirework, setShowFirework] = useState(true);

    const fireworkRef = useRef();
    useEffect(()=>{
        const showTimeout = setTimeout(()=>{setShowFirework(false)}, 2000);
        const timeout = setTimeout(()=>{
            fireworkRef.current?.updateOptions({
                opacity: 0.5,
                rocketsPoint: {
                    min: 0,
                    max: 50,
                },
                hue: {
                    min: 0,
                    max: 0,
                },
            });
        }, 0)
        return ()=>{
            clearTimeout(timeout); 
            clearTimeout(showTimeout); 
            setShowFirework(true);
        }
    }, [showForm])

    return <div className="pad" style={{'paddingBottom': `${padBottomPx}px`}}>
        {showForm? <SignatureForm setShowForm={setShowForm} {...props}/>
        :<>
            <Card style={{'border': "rgba(0,0,0,0)"}}>
            <h1 className="pad center" style={{"display": "flex"}}>Thank You for Your Support!</h1>
                <Button className="secondaryColor secondaryColorHover" onClick={()=>{setShowForm(true)}}>Submit Another</Button>
                <Button className="primaryColor primaryHover" onClick={()=>{setExpandContact(true)}}>Contact Us</Button>
            </Card>
            <Card style={{'border': "rgba(0,0,0,0)", "height": "300px", "overflow": "hidden"}}>
                {showFirework? <Fireworks ref={fireworkRef} /> : <></>}
            </Card>
        </>
        }
        
    </div>
}