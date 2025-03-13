import React, { useState } from 'react';

function Note({ note, onDelete, onEdit }) {
  return (
    <div className="note">
      <p>{note.text}</p>
      <div>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note.id)}>Delete</button>
      </div>
    </div>
  );
}

function NoteForm({ addNote, editNote, currentNote, clearEditing }) {
  const [text, setText] = useState(currentNote ? currentNote.text : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    currentNote ? editNote({ ...currentNote, text }) : addNote({ id: Date.now(), text });
    
    setText('');
    clearEditing && clearEditing();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note here..."
      />
      <button type="submit">{currentNote ? 'Update Note' : 'Add Note'}</button>
      {currentNote && (
        <button type="button" onClick={clearEditing}>Cancel Edit</button>
      )}
    </form>
  );
}

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const addNote = (note) => setNotes((prevNotes) => [...prevNotes, note]);

  const deleteNote = (id) => setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));

  const startEditNote = (note) => setCurrentNote(note);

  const editNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => note.id === updatedNote.id ? updatedNote : note)
    );
    setCurrentNote(null);
  };

  const clearEditing = () => setCurrentNote(null);

  return (
    <div className="notesApp">
      <NoteForm
        addNote={addNote}
        editNote={editNote}
        currentNote={currentNote}
        clearEditing={clearEditing}
      />
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={deleteNote}
          onEdit={startEditNote}
        />
      ))}
    </div>
  );
}

export default NotesApp;