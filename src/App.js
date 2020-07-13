import React from 'react';
import './App.css';
import Note from './components/Note';

function App() {
  return (
    <div className="App">
      <Note onAddNewNote={AddNoteToLocalStorage}></Note>
    </div>
  );
}

function AddNoteToLocalStorage(note) {
  const { id, input } = note;
  localStorage.setItem(id, input);
}

export default App;
