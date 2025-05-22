import { useContext, useEffect, useRef, useState } from "react";
import SignatureForm from "./SignatureForm";
import ExpandContactContext from "../contexts/ExpandContactContext";
import { Button, Card } from "react-bootstrap";
import { Fireworks } from '@fireworks-js/react';
import background from "../../assets/tinified/4-1-gopher.webp";
import { Link } from "react-router-dom";
import Header from "./Header";
import { adminPublicEmail, countSignsPath } from "../../../../../paths/clientPaths";

export default function Signature(props) {
    const [showForm, setShowForm] = useState(true);
    const setExpandContact = useContext(ExpandContactContext);
    const [showFirework, setShowFirework] = useState(true);

    const fireworkRef = useRef();
    useEffect(()=>{
        const showTimeout = setTimeout(()=>{setShowFirework(false)}, 2000);
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

    const [signatureCount, setSignatureCount] = useState(0);
    useEffect(() => {
        if (!showForm) {
            fetch(countSignsPath)
            .then(res => res.json())
            .then(result => {
                if (result?.error === false) {
                    setSignatureCount(result.count);
                }
                else {
                    setSignatureCount(result.msg);
                }
            })
            .catch(()=>{
                setSignatureCount(`Your signature has been recorded, but we failed to connect to our database to retrieve further information at the moment. Please try again later or contact our admins at ${adminPublicEmail}.`);
            })
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
                        <h1 className="pad center" style={{"display": "flex"}}>
                            Thank You for Your Support!
                        </h1>
                        <p className="pad center" >
                            {(typeof signatureCount === 'number')? 
                                <>
                                    You are the &nbsp;
                                    <span className="notice" style={{'fontSize': '1.2em'}}> {signatureCount}
                                        <sup>{signatureCount===1?'st':(signatureCount===2?'nd':(signatureCount===3?'rd':'th'))}</sup> 
                                    </span>
                                    &nbsp; person who have joined our coalition. <br/>
                                    The planet gets better because of people like you!
                                </>
                                : signatureCount
                            }
                        </p>
                        <Button style={{width: '80%'}} className="secondaryColor secondaryColorHover hugeBtnEffect" onClick={()=>{setShowForm(true)}}>
                            Sign Another
                        </Button>
                        <Link className="selectablePrimary" to="/">Home</Link>
                        <span className="selectablePrimary" onClick={()=>{setExpandContact(true)}}>Contact Us</span>
                    </Card>
                    
                </Card>
            }
        </div>
    </>
}