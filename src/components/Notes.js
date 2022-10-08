
import { useEffect } from 'react';
import {React ,useContext}from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';


function Notes() {
    
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const{notes, getNotes} = context;  //use the setNotes here
  useEffect(()=>{

    if(localStorage.getItem('token') != null)
    getNotes();
    else navigate('/login')
    // navigate("/login")
    // eslint-disable-next-line
  },[])


  
  return (
<>
  <div className='container'>
      <AddNotes/>
    <div className='container my-3' key={notes._id}>
        <h1>Your Notes</h1> 
        <div className="container d-flex flex-wrap">
    {notes.map((note)=>{
      return <NoteItem note={note} key={note._id}/>
      
    })}
    </div>
      
    </div>
    </div>

    </>
  )
}

export default Notes
