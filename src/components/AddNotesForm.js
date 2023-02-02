import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const AddNotesForm = (props) => {
  const NavigateTo = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    NavigateTo('/signin')
  }
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleAddNote = (e) => {
    props.showAlert("Note added successfully", "success")
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ id: "", title: "", description: "", tag: "" });
  }
  const changeNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }) //setNote({...whatever curr value is [whatever the name tag represents]: to its value })
  }

  return (<>
    <div className='container my-3'>
      <h3>Add a Note</h3>
      <Form className='my-3'>
        <Form.Group className="mb-3" >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" onChange={changeNote} id='title' name='title' minLength={5} value={note.title} required />
          {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter description" onChange={changeNote} id='description' name='description' minLength={5} value={note.description} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tag</Form.Label>
          <Form.Control type="text" placeholder="Any tag?" onChange={changeNote} id='tag' name='tag' value={note.tag} />
        </Form.Group>

        <Button variant="primary" type="submit" className='mb-3' onClick={handleAddNote} disabled={note.title.length < 5 || note.description.length < 5}>
          Add Note
        </Button>
        <Button variant="primary" type="submit" className='mb-3 mx-2' onClick={handleLogout}>
          Logout
        </Button>
      </Form>
    </div>
  </>);
}

export default AddNotesForm;