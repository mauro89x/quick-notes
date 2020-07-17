import React from 'react';
import { Toast, ToastBody, ToastHeader, Spinner } from 'reactstrap';

const Postit = ({ onRemove, input, id, markAsDone }) => {
    const { task, state } = JSON.parse(input);
    return (

        <Toast>
            <input
                type="button"
                value="Dismiss"
                className="btn btn-danger"
                onClick={() => RemoveMe(onRemove, id)} />

            <input
                type="button"
                value="Done"
                className="btn btn-secondary"
                onClick={() => markAsComplete(markAsDone, id)} />

            <ToastHeader
                icon={state !== "done" ?
                    <Spinner size="sm" /> :
                    "success"}
            >
                Reminder
        </ToastHeader>
            <ToastBody>{task}</ToastBody>
        </Toast >)
}

function RemoveMe(callback, aKey) {
    callback(aKey);
}

function markAsComplete(callback, id) {
    callback(id);
}

export default Postit;
