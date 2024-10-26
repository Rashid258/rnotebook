import React, { useContext, useEffect } from 'react'
import noteContext from '../Context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const {notes, getNotes} = useContext(noteContext);
  const navigate = useNavigate();
  const {showAlert} = props;


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
    <Addnote showAlert={showAlert} />
    <div className='row my-3'>
      <h2 className="container">Your Notes</h2>
      {notes.length === 0 && <div className="container">No Notes to display</div>}
    {notes.map((note)=>{
      return <Noteitem showAlert={showAlert} key={note._id} note={note} />
        })}
    </div>
    </>
  )
}

export default Notes
