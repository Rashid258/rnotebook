import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Note = () => {
  const {notes} = useContext(noteContext);

  return (
    <>
    <Addnote/>
    <div className='row my-3'>
      <h2 className="container">Your Notes</h2>
    {notes.map((note)=>{
      return <Noteitem key={note._id} note={note}/>
        })}
    </div>
    </>
  )
}

export default Note
