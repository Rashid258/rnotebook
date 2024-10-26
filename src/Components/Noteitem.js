import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note} = props;


  return (
    <div className='col-md-3'>
      <div className="card my-3" >
  <div className="card-body">
    <div className="d-flex justify-content-between align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);
      props.showAlert('Note Deleted Successfully', 'success')
    }}></i>
    {/* <i className="far fa-edit mx-2"></i> */}
    </div>
    <p className="card-text">{note.description}</p>
    <p className="card-text">{note.tag}</p>
  </div>
</div>
    </div>
  )
}

export default Noteitem
