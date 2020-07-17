import React, { useState, useEffect } from 'react';
import './App.css';
import Note from './components/Note';
import Postit from './components/Postit';
import { Button } from 'reactstrap';

function App() {

  const [currentStorage, SyncWithLocalStorage] = useState(localStorage || {});

  const listener = e => {
    SyncWithLocalStorage({ ...localStorage });
  };

  useEffect(() => {
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener)
  }, []);

  return (
    <div className="App">
      <Note onAddNewNote={addNoteToLocalStorage} />
      <div>
        {
          Object.keys(currentStorage).map(
            key => <Postit
              key={key}
              id={key}
              input={currentStorage[key]}
              onRemove={removeNote}
              markAsDone={markTaskDone}
            >
            </Postit>
          )
        }
      </div>
      <Button
        className="btn btn-danger"
        onClick={() => clearLocalStorage()}>
        Clean
        </Button>
    </div>
  );
}

function clearLocalStorage() {
  localStorage.clear();
  window.dispatchEvent(new Event('storage'));
}

function addNoteToLocalStorage(note) {
  const { id, input, state } = note;
  localStorage.setItem(id, JSON.stringify({ task: input, state }));
  window.dispatchEvent(new Event('storage'));
}

function removeNote(anId) {
  localStorage.removeItem(anId);
  window.dispatchEvent(new Event('storage'));
}

function markTaskDone(anId) {
  const { task } = JSON.parse(localStorage.getItem(anId));
  const state = "done";
  localStorage.setItem(anId, JSON.stringify({ task, state }));
  window.dispatchEvent(new Event('storage'));
}

export default App;
