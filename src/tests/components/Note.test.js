import React from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import Note from '../../components/Note';

let elements = [];

function AddNewNoteToLocalStorageMockup() {
  elements.push({ task: "Do something", state: "Pending" });
  return elements;
}

const setupWithNoStringsInTextarea = () => {
  const utils = render(<Note onAddNewNote={() => null} />);
  const buttonAdd = utils.getByLabelText('Add Note');
  const label = utils.getByTitle('message');

  return {
    buttonAdd,
    label
  }
}

const setupWithOneTask = () => {
  const utils = render(<Note onAddNewNote={AddNewNoteToLocalStorageMockup} />);
  const textarea = utils.getByLabelText('textarea');
  const label = utils.getByTitle('message');
  const buttonAdd = utils.getByLabelText('Add Note');
  return {
    textarea,
    label,
    buttonAdd,
    ...utils
  }
}


test('Changes the textarea value to string `Lorem ipsum ...` and updates remaining chars in textarea',
  () => {
    const { textarea, label, buttonAdd } = setupWithOneTask();
    fireEvent.input(textarea, { target: { value: 'Lorem ipsum ...' } });
    expect(textarea.value).toBe('Lorem ipsum ...');
    expect(buttonAdd.disabled).toBe(false);
    expect(label.innerHTML).toBe('Remaining letters: 85 / 100 ');
  });

test('When textarea is empty, button `Add` remains in disabled state', () => {
  const { buttonAdd, label } = setupWithNoStringsInTextarea();
  expect(buttonAdd.disabled).toBe(true);
  expect(label.innerHTML).toBe('Remaining letters: 100 / 100 ');
});