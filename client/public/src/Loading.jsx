import { useEffect, useState } from "react";
import { LazyMotionDiv } from "./suspense/motion";

export default function Loading() {

    const [showMsg, setShowMsg] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowMsg(true)
        }, 10000);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return <div style={{
        display: 'flex', 
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center'
    }}>
        <LazyMotionDiv
            initial={{opacity: 1, fontSize: '1.2em'}}
            animate={{opacity: [1, 0.4, 1], fontSize: ['1.2em', '1.3em', '1.2em']}}
            transition={{
                duration: 1.4,
                times: [0, 0.7, 1.4],
                repeat: Infinity,
                repeatDelay: 2
            }}
            className="primaryText bold"
        >
            <p style={{position: 'relative'}}>
                Protect Okeeheelee
            </p>
        </LazyMotionDiv>
        {
            showMsg? <p style={{fontSize: '0.7em'}}>
                Cannot connect? Check your internet connectivity or <a href="mailto:tasman@wustl.edu" className="selectablePrimary">contact us</a>
            </p>: <></>
        }
    </div>
}