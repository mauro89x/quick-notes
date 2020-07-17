import React from 'react';
import { Toast, ToastBody, ToastHeader, Button, Spinner } from 'reactstrap';

const Postit = ({ onRemove, input, id, markAsDone, state }) => (

    <Toast>
        <Button onClick={() => RemoveMe(onRemove, id)}>Dismiss</Button>
        <Button onClick={() => markAsComplete(markAsDone, id)}>Done</Button>

        <ToastHeader
            icon={<Spinner size="sm" />}
        >
            Reminder
        </ToastHeader>
        <ToastBody>{input}</ToastBody>
    </Toast >)

function RemoveMe(callback, aKey) {
    callback(aKey);
}

function markAsComplete(callback, id) {
    // TBD callback(id);
}

export default Postit;