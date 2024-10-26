import noteContext from "./noteContext";
import React, { useState } from 'react'



const NoteState = ({ children }) => {

  const [notes, setNotes] = useState([]);

  const host = 'http://localhost:5000/api/notes';

  //Get All Notes from database
  const getNotes = async () => {
    const response = await fetch(`${host}/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })
    const json = await response.json();
    setNotes(json)
  }


  //Add Note
  const addNote = async(title, description, tag) => {
    //Add Note in database
    try{
    const response = await fetch(`${host}/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });
    if (!response.ok) {
      throw new Error("Failed to add note to database");
    }
    const savedNote = await response.json();

    // Update local notes with the newly added note from the server response
    setNotes(notes.concat(savedNote));

  } catch (error) {
    console.error("Error adding note:", error);
  }
};

  //Delete Note
  const deleteNote = (id) => {
    //Delete Note from database
    fetch(`${host}/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    });
    //Delete Note from local notes
    const newNotes = notes.filter((note) => { return note._id !== id; })
    setNotes(newNotes);
  }
  //Edit Note
  const editNote = (id, title, description, tag) => {
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }


  return (
    <div>
      <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
        {children}
      </noteContext.Provider>
    </div>
  )
}

export default NoteState
