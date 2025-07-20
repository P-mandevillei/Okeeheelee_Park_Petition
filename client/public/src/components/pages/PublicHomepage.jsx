import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import palm from "../../assets/tinified/DSC04274.webp"
import { useContext, useEffect } from "react";
import ScreenWidthContext from "../contexts/ScreenWidthContext";
import { LazyMotionBtn, LazyMotionDiv } from "../../suspense/motion";
import { scale } from "motion/react";
import { Helmet } from "react-helmet";

export default function PublicHomepage() {

    useEffect(() => {
        const palmSrc = new Image();
        palmSrc.src = palm;
    }, []);
    
    const [screenW, setScreenW] = useContext(ScreenWidthContext);
    let h1Size;
    if (screenW<350) {
        h1Size = '14vw';
    } else if (screenW<500) {
        h1Size = '10vw';
    } else if (screenW<700) {
        h1Size = '8vw';
    } else {
        h1Size = '6vw';
    }
    
    const btnSize = (screenW>600? (screenW<680? '3.4vw': '2.5vw'): '20px');
    const h2Size = (screenW>600? (screenW<680? '3vw':'2.2vw'): '15px');

    return <div>

        <Helmet>
            <title>Protect Okeeheelee</title>
            <meta 
                name="description" 
                content="Protect Okeeheelee Park! Call for the reallocation of ~$4.1M funds toward the natural restoration of Okeeheelee Park South instead of turning it into yet another RV park."
            />
        </Helmet>

        <Card style={{
            border: 'rgba(0,0,0,0)',
            position: 'relative', height: '90vh',
        }}>    
            <img className='backgroundImgFlex' src={palm} alt="A background image of palm habitats" style={{opacity: 1}} />
            <Container fluid className="frontTextWrapper" >
                <div className="pad"
                style={{
                    position: 'absolute', 
                    top: 0, 
                    left: 0,
                    height: '100%',
                    width: '100%',
                    alignSelf: 'flex-start', 
                    display: 'flex', 
                    flexDirection: 'column',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    zIndex: 999,
                    borderBottomRightRadius: '100%'
                }}>
                    <h1 className="whiteBold primaryText" 
                        style={{ fontSize: h1Size }}
                    >
                        Protect{screenW>800?<></>:<br/>} Okeeheelee{screenW>800?<></>:<br/>} Park!
                    </h1>
                    <br />
                        <Link to="/contribute" style={{marginTop: 20, marginBottom: 20}}>
                            
                            <LazyMotionBtn 
                                className="secondaryColor secondaryColorHover hugeBtnEffect" 
                                style={{fontSize: btnSize, 'fontWeight': 'bold', paddingLeft: '1em', paddingRight: '1em'}}
                                animate={{
                                    boxShadow: ['0 0 0 rgb(140, 252, 2)', '0 0 1em rgb(140, 252, 2)', '0 0 0 rgb(140, 252, 2)'],
                                }}
                                transition={{
                                    times: [0, 1, 2],
                                    repeat: Infinity,
                                    repeatDelay: 10
                                }}
                            >
                                Join Our Coalition!
                            </LazyMotionBtn>
                        </Link>
                    
                    <br/>
                    <h2 style={{
                        fontSize: h2Size,
                        width: screenW<350?'78%': '100%',
                    }}>
                        Call for reallocation of <b>~$4.1M</b> funds {screenW<350? <></>:<br/> }
                        toward <b>natural restoration</b> {screenW<350? <></>:<br/> }
                        instead of turning it into an RV park 
                    </h2>
                    <br/>
                    <Link className="selectablePrimary" to='/details' style={{fontSize: h2Size}}>
                        Read More
                    </Link>
                            
                </div>
            </Container>
            
        </Card>
    </div>
}