import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function MessageBox(props) {

    return <ToastContainer className="p-3" position="middle-center">
    <Toast className="primaryColor" show={props.showMsg} onClose={()=>{props.setShowMsg(old=>!old)}}>
        <Toast.Header>
            <strong className="me-auto">{props.header}</strong>
        </Toast.Header>
        <Toast.Body>
            {props.body}
        </Toast.Body>
    </Toast>
    </ToastContainer>
}