import React, { Component } from 'react';
import { v4 as uuid } from "uuid";

const MAX = 100;

class Note extends Component {

    constructor(props) {
        super(props);

        this.state = {
            noteInput: '',
            totalChars: MAX
        }
    }

    resetTextArea() {
        this.setState({
            noteInput: '',
            totalChars: MAX
        });
    }

    updateChars(evt) {
        const value = evt.target.value;

        if (evt.target.value.length === 0) {
            this.resetTextArea();

        } else {

            if (value.length <= MAX) {
                this.setState({
                    noteInput: value,
                    totalChars: (MAX - value.length)
                });
            }
        }
    }

    addNewNote(callback) {
        const note = {
            input: this.state.noteInput,
            id: uuid(),
            state: "Pending"
        }

        if (note) {
            callback(note);
            this.resetTextArea();
        }
    }

    render() {
        const { onAddNewNote } = this.props;
        return (
            <div>
                <textarea
                    className="document_view"
                    onChange={evt => this.updateChars(evt)}
                    value={this.state.noteInput}
                >
                </textarea>
                <div>
                    <label>Remaining letters: {this.state.totalChars} / {MAX} </label>
                </div>
                <input 
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.addNewNote(onAddNewNote)}
                    disabled={this.state.noteInput.length === 0 ? "disabled" : ""}
                    value="Add"
                />
            </div>
        );
    }
}
export default Note;
