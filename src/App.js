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
      <Note onAddNewNote={addNoteToLocalStorage}>
      </Note>
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
      <Button onClick={() => clearLocalStorage()}>Clean</Button>
    </div>
  );
}

function clearLocalStorage() {
  localStorage.clear();
  window.dispatchEvent(new Event('storage'));
}

function addNoteToLocalStorage(note) {
  const { id, input } = note;
  localStorage.setItem(id, input);
  window.dispatchEvent(new Event('storage'));
}

function removeNote(anId) {
  localStorage.removeItem(anId);
  window.dispatchEvent(new Event('storage'));
}

function markTaskDone(anId) {
  const item = localStorage.getItem(anId);
  
  item.done = true;
  localStorage.setItem(anId, item);
  window.dispatchEvent(new Event('storage'));
}

export default App;
