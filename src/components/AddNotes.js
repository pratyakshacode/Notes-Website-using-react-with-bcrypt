import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';


function AddNotes() {

    const [note, setNotes] = useState({title:"",description:"",tag:""})
    const context = useContext(noteContext);
    const {addNotes} = context;

    const onChange = (e)=>{
        setNotes({...note,[e.target.name]:e.target.value})
    }
    const handleClick = (e)=>{
        e.preventDefault();
        addNotes(note.title,note.description, note.tag);
    }
  return (

    <div className='container my-3'>
      <h2>Add a Note</h2>
      <form action=''>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your Notes with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name="description" id="description" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" name="tag" id="tag" onChange={onChange}/>
  </div>
  <button className="btn btn-primary" onClick={handleClick}>Add Note</button>

</form>
    </div>

  )
}

export default AddNotes
