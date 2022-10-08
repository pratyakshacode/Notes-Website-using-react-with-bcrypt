import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState =(props)=>{
    const host = 'http://localhost:5000'
    const initialNotes = []

   const [notes, setNotes] = useState(initialNotes);
    //getting the notes from API

    const getNotes = async ()=>{

      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers: {
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNzUwODMxMzJjMjE1N2U5ODFmZTU2In0sImlhdCI6MTY2MjU1NjQzOH0.9_PVvX9XrCGf7YZlmOfN_w9bR4SpT4X8jFZr8duu48E'
          
        }
        
      });

      const json = await response.json();
      setNotes(json)
    }
   //adding the notes
   const addNotes = async (title, description, tag)=>{

    const response = await fetch(`${host}/api/notes/addnotes`,{
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNzUwODMxMzJjMjE1N2U5ODFmZTU2In0sImlhdCI6MTY2MjU1NjQzOH0.9_PVvX9XrCGf7YZlmOfN_w9bR4SpT4X8jFZr8duu48E'
        
      },
      body:JSON.stringify({title:title, description:description, tag:tag})
      
    });
    
    const json = await response.json();
    console.log(json);

    setNotes(notes.concat(json));
    
   }

   //updating the notes
   const updateNotes = async (id,title,description, tag)=>{

      //adding the fetch api to get the notes 

      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method:'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNzUwODMxMzJjMjE1N2U5ODFmZTU2In0sImlhdCI6MTY2MjU1NjQzOH0.9_PVvX9XrCGf7YZlmOfN_w9bR4SpT4X8jFZr8duu48E'
          
        },
        body: JSON.stringify({title, description, tag})
        
      });

      const json = response.json();
      console.log(json)

        for(let index = 0; index < notes.length; index ++){
           let element = notes[index];
          
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }

    

   }
    
   //deleting the notes
   const deleteNotes =async  (id)=>{

    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers: {
        'Content-Type' : 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxNzUwODMxMzJjMjE1N2U5ODFmZTU2In0sImlhdCI6MTY2MjU1NjQzOH0.9_PVvX9XrCGf7YZlmOfN_w9bR4SpT4X8jFZr8duu48E'
        
      },
    });

    const json = response.json();
    console.log(json)
    
      const newNotes = notes.filter((note)=>{return note._id!== id});
      setNotes(newNotes);
   }
    return(
        <NoteContext.Provider value={{notes,addNotes,updateNotes,deleteNotes,getNotes}}>
            {props.children}

        </NoteContext.Provider>
    );
}


export default NoteState;