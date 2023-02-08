//APIs FOR THE SERVER

const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


// ROUTE1 Fetch all notes using get api/notes/fetchallnotes. Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Json error encountered in fetching notes", error.message)
    }
})

// ROUTE2 Add a new note using post api/notes/addnote. Login required

router.post('/addnote', fetchUser, [body('title', "Enter a title").isLength(),
body('description', "Enter a valid name (min 3 chars)").isLength({ min: 2 })], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if error found in data sent, return the error with bad status code 400
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };
        const newNote = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await newNote.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Json error encountered in adding new notes", error.message)
    }
});

// ROUTE3 Update a note using PUT api/notes/updatenote/:id. ("/:ID") means we are setting params to the link, this id will be fetched later. Login required
router.put('/updatenote/:id', fetchUser,async (req, res) =>{
    try{
    const {title, description,tag} = req.body;

    // create an update note obj
    const updatedNote = {};
    if(title)(updatedNote.title=title);
    if(description)(updatedNote.description=description);
    if(tag)(updatedNote.tag=tag);

    // find the old note to be updated (/:id fetched here)
    let oldNote = await Notes.findById(req.params.id);
    if(!oldNote){
        return res.status(404).send("Old not not found. Can't update")};
    if(oldNote.user.toString() !== req.user.id){
        return res.status(401).send("You can't update this note. You are not authorized")};
    oldNote = await Notes.findByIdAndUpdate(req.params.id,  {$set: updatedNote}, {new:true}) ;
    res.json(oldNote)
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal server error", error.message)
    };
    })

// ROUTE4 Delete a note using Delete api/notes/deletenote/:id. ("/:id") means we are setting params to the link, this id will be fetched later. Login required

router.delete('/deletenote/:id', fetchUser,async (req, res) =>{
    try{
    // find the old note to be deleted (/:id fetched here)
    let oldNote = await Notes.findById(req.params.id);
    if(!oldNote){
        return res.status(404).send("Old not not found. Can't Delete")};

        // check if user is the owner of the note or not and then delete
    if(oldNote.user.toString() !== req.user.id){
        return res.status(401).send("You can't delete this note. You are not authorized")};
    oldNote = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note deleted successfully"})
    } catch (error) {
        console.error(error.message);
        res.status(400).send("Internal server error", error.message)
    };
})
module.exports = router;
