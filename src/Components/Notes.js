import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Note = () => {
  const {notes, getNotes} = useContext(noteContext);
  const navigate = useNavigate();


  useEffect(()=>{
    // eslint-disable-next-line
    if(localStorage.getItem('token')){
      getNotes()
    } else{
      navigate('/login')
    }
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
