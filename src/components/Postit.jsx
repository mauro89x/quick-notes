import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const Postit = props => (
    <Toast>
        <ToastHeader>Recordatorio</ToastHeader>
        <ToastBody>{props.input}</ToastBody>
    </Toast>)

export default Postit;