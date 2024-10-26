import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Note = () => {
  const {notes, getNotes} = useContext(noteContext);

  useEffect(()=>{
    getNotes()
  },[])


  return (
    <>
    <Addnote/>
    <div className='row my-3'>
      <h2 className="container">Your Notes</h2>
      {notes.length === 0 && <div className="container">No Notes to display</div>}
    {notes.map((note)=>{
      return <Noteitem key={note._id} note={note}/>
        })}
    </div>
    </>
  )
}

export default Note
