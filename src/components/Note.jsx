import React from 'react';
import { v4 as uuid } from "uuid";

const MAX = 100;

class Note extends React.Component {

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
            } else {
                alert("Dude it's full!")
            }
        }
    }

    addNewNote(callback) {
        const note = {
            input: this.state.noteInput,
            id: uuid()
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
                    <label>Caracteres restantes: {this.state.totalChars} / {MAX} </label>
                </div>
                <input type="button"
                    value="Agregar"
                    onClick={() => this.addNewNote(onAddNewNote)}></input>
            </div>
        );
    }
}
export default Note;
