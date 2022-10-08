import React from 'react';
import noteContext from '../context/notes/NoteContext';
import { useContext } from 'react';




function NoteItem(props) {
    const {note} = props;
    const context = useContext(noteContext);
    const {deleteNotes} = context;
  return (


    <div className='col-md-3 mx-1 my-2'>
    <div className="card" >
 
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNotes(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" ></i>
   
  </div>
</div>
    </div>

  )
}

export default NoteItem
