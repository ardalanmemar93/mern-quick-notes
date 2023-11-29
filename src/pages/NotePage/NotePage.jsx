import { useEffect, useState } from 'react';
import * as notesAPI from '../../utilities/notes-api';

export default function NotesPage({ user }) {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState({ text: '' });

  useEffect(() => {
    async function getNotes() {
      const fetchedNotes = await notesAPI.getAll();
      setNotes(fetchedNotes);
    }
    getNotes();
  }, []);

  const createNote = async (noteData) => {
    try {
      const note = await notesAPI.createNote(noteData);
      return note;
    } catch (error) {
      console.error('Error in createNote:', error.message);
      // Handle the error, e.g., display an error message to the user
      throw error; 
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const newNote = {
        text: newNoteText.text,
        user: user._id,
      };

      // Connect React to the server using the createNote function
      const note = await createNote(newNote);

      // Update the state with the new note
      setNotes((prevNotes) => [...prevNotes, note]);

      // Clear the input field
      setNewNoteText({ text: '' });
    } catch (error) {
      console.error('Error in handleSubmit:', error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleChange = (event) => {
    setNewNoteText({
      ...newNoteText,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="text"
          value={newNoteText.text}
          onChange={handleChange}
        />
        <button type="submit">Add Note</button>
      </form>

      {notes.length === 0 ? (
        <p>No notes yet!</p>
      ) : (
        <div>
          {notes.map((note, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{note.text}</p>
              <p>{note.createdAt.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
