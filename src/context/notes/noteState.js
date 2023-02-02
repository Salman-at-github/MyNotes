import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = 'http://127.0.0.1:5000';
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //FUNC TO FETCH ALL NOTES

  const fetchAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  //FUNC TO ADD A NOTE
//Add func from addnotesform into here and use it there

  const addNote = async (title, description, tag) => {
    // api call for backened add  note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    //client side add
    const newnote = json;
    setNotes(notes.concat(newnote))
  }


  //FUNC TO EDIT NOTES

  const editNote = async (id, title, description, tag) => {

    // api call for backened edit
    // back end edit
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);


    //edit in client end FRONT
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag
        break
      };
    };
    setNotes(newNotes)
  }

  //DELETE A NOTE
  
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':  localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json);
    
    //client side
    const notes_after_del = notes.filter((newnote) => { return newnote._id !== id });
    setNotes(notes_after_del);
  }
  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchAllNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;