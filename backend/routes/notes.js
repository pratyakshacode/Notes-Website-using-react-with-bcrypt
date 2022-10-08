const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body, validationResult} = require('express-validator');
const { findByIdAndDelete } = require('../models/Note');

//Route 1: for fetching the notes
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    //finding the notees
    const note = await Note.find({user:req.user.id});
    res.json(note);
})


//Route 2: for adding the notes to app

router.post('/addnotes',fetchuser,[
    body('title','Enter the valid title').isLength({min:3}),
    body('description','Enter a valid description').isLength({min:5}),
], async (req,res)=>{
    try{

    const{title,description,tag} = req.body;
    const errors = validationResult(req);   //error validation
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()});
    }

    

    //now preparing the note
    const note = new Note({
        title, description, tag, user: req.user.id
    });

    //SAVING THE NOTE INTO THE DATABASE 
    const saveNotes = await note.save();

    res.json(saveNotes);
} catch(error){
    console.error(error.message);
    res.status(404).send('some internal error has been occured');
}
    
})

//Route 3: to update the notes

router.put('/updatenote/:id',fetchuser,async (req,res)=>{

    const newNote = {};
    const {title, description, tag} = req.body;

    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    let note = await Note.findById(req.params.id);

    if(!note) {
        res.status(400).send('cannot found the note');
    }

    if(note.user.toString() != req.user.id){
        res.status(401).send("Can't Update");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.send(note);
})
 

// Route:4 Delete the notes 

router.delete('/deletenote/:id',fetchuser,async(req, res)=>{

    try{
    let note = await Note.findById(req.params.id);
    if(!note){
       return res.status(404).send('note not found');
    }

    if(note.user.toString() != req.user.id){
        return res.status(401).send('Not Allowed');
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success" : "Note has been Successfully deleted","Note": note});
}
catch(err){
    console.error(err);
    res.status(404).send('some internal error occured');
}
})
module.exports = router;