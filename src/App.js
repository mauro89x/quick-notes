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
      <Note onAddNewNote={AddNoteToLocalStorage}></Note>
      <div>
        {
          Object.keys(currentStorage).map(
            key => <Postit key={key} input={currentStorage[key]}></Postit>
          )
        }
      </div>
      <Button onClick={() => ClearLocalStorage()}>Clean</Button>
    </div>
  );
}

function ClearLocalStorage() {
  localStorage.clear();
  window.dispatchEvent(new Event('storage'));
}

function AddNoteToLocalStorage(note) {
  const { id, input } = note;
  localStorage.setItem(id, input);
  window.dispatchEvent(new Event('storage'));
}

export default App;
