import React, {useContext, useState}from 'react'
import noteContext from '../Context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""});
    

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Note added successfully", "success");

    }

    const onChange = (e) => {
        e.preventDefault();
        setNote({...note, [e.target.name]: e.target.value});
    }

  return (
    <div className='container my-3'> 
      <h2 className='text-center'>rNotebook - Save Your Notes to Cloud</h2>
        <h3>Add a Note</h3>
        <form>
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="email" className="form-control" id="title" name='title'  value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
        </div>
        <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
        </div>
        <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        

      
    </div>
  )
}

export default Addnote
