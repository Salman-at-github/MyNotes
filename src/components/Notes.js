import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNotesForm from './AddNotesForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const NavigateTo = useNavigate();
    const NoteContext = useContext(noteContext);
    const { notes, fetchAllNotes, editNote } = NoteContext;
    useEffect(() => {
        if(localStorage.getItem('token')){
        fetchAllNotes()}
        else{
            NavigateTo('/signin')
        }
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        // props.showAlert("Note Updated Successfully","success")
    };
    const handleSaveEdit = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note Updated Successfully", "success")
    };
    const changeNote = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value }) //setNote({...whatever curr value is [whatever the name tag represents]: to its value })
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <AddNotesForm showAlert={props.showAlert} />
            {/* Modal BEGINNING */}
            <Button variant="primary" onClick={handleShow} className='d-none' ref={ref}>
                Launch button
            </Button>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='my-3'>

                        <Form.Group className="mb-3" >
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" onChange={changeNote} id='etitle' name='etitle' value={note.etitle} minLength={5} required />
                            {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" onChange={changeNote} id='edescription' name='edescription' value={note.edescription} minLength={5} required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tag</Form.Label>
                            <Form.Control type="text" placeholder="Any tag?" onChange={changeNote} id='etag' name='etag' value={note.etag} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} ref={refClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit} >
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* MODAL END */}
            <div className='row my-4'>
                <h3 className='mb-2'>Your Notes</h3>
                <h6>{notes.length === 0 && "(No notes available!)"}</h6>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </>)
}

export default Notes;
