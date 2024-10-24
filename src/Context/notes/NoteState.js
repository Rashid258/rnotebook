import noteContext from "./noteContext";
import React, { useState } from 'react'



const NoteState = ({ children }) => {

  const [notes, setNotes] = useState([]);


  //Add Note
  const addNote = (title, description, tag) => {
    console.log("adding a new note.")
    const note = {
      title: title,
      description: description,
      tag: tag
    }
    setNotes(notes.concat(note));
  }

  //Delete Note
  const deleteNote = (id) => {
    console.log("deleting a note.")
    const newNotes = notes.filter((note)=>{return note._id !== id;})
    setNotes(newNotes);
  }
  //Edit Note
  const editNote = (note) => {
    console.log("editing a note.")
    setNotes(notes.map((e) => {
      return e !== note;
    }));
  }


  return (
    <div>
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
        {children}
      </noteContext.Provider>
    </div>
  )
}

export default NoteState
