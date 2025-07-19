import { lazy, Suspense } from "react";

const MotionDiv = lazy( () => import('motion/react').then(mod => ({
        default: mod.motion.div
    }))
)

const MotionBtn = lazy( () => import('motion/react').then(mod => ({
    default: mod.motion.button
})))

export function LazyMotionDiv(props) {
    return <Suspense fallback={ <div style={props.style} className={props.className}> {props.children} </div> }>
        <MotionDiv {...props}>
            {props.children}
        </MotionDiv>
    </Suspense>
}

export function LazyMotionBtn(props) {
    return <Suspense fallback={ <div style={props.style} className={props.className}> {props.children} </div> }>
        <MotionBtn {...props}>
            {props.children}
        </MotionBtn>
    </Suspense>
}