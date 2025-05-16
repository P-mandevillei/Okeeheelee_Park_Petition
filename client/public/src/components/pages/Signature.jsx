import { useContext, useEffect, useRef, useState } from "react";
import SignatureForm from "./SignatureForm";
import ExpandContactContext from "../contexts/ExpandContactContext";
import { Button, Card } from "react-bootstrap";
import { Fireworks } from '@fireworks-js/react';
import background from "../../assets/tinified/4-1-gopher.webp";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Signature(props) {
    const [showForm, setShowForm] = useState(true);
    const setExpandContact = useContext(ExpandContactContext);
    const [showFirework, setShowFirework] = useState(true);

    const fireworkRef = useRef();
    useEffect(()=>{
        const showTimeout = setTimeout(()=>{setShowFirework(false)}, 5000);
        const timeout = setTimeout(()=>{
            fireworkRef.current?.updateOptions({
                opacity: 0.5,
                rocketsPoint: {
                    min: 0,
                    max: 100,
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

    return <>
        <Header text="Join Our Coalition!" background={background} alt="A background image of gopher turtle" />
        
        <div className="pad">
            {showForm? 
                <SignatureForm setShowForm={setShowForm} {...props}/>
            :
                <Card className="frontTextWrapper" style={{'border': 'rgba(0,0,0,0)'}}>
                    <Card style={{
                        'border': "rgba(0,0,0,0)", 'position':'absolute', 
                        "zIndex":1, 'width': '100%', height: '100%', overflow: 'hidden'
                    }}>
                        {showFirework? <Fireworks ref={fireworkRef} style={{
                            width: '100%',
                            height: '100%',
                            background: "rgba(0,0,0,0)"
                        }}/> : <></>}
                    </Card>
                    
                    <Card className="frontTextWrapper" style={{border: 'rgba(0,0,0,0)', backgroundColor: 'rgba(0,0,0,0)'}}>
                        <h1 className="pad center" style={{"display": "flex"}}>Thank You for Your Support!</h1>
                        <p className="pad center notice" style={{"display": "flex", 'fontSize': '1em'}}>Your support is crucial to our cause</p>
                        <Button style={{width: '80%'}} className="secondaryColor secondaryColorHover" onClick={()=>{setShowForm(true)}}>Sign Another</Button>
                        <Link className="selectablePrimary" to="/">Home</Link>
                        <span className="selectablePrimary" onClick={()=>{setExpandContact(true)}}>Contact Us</span>
                    </Card>
                    
                </Card>
            }
        </div>
    </>
}