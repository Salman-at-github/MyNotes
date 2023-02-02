import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import noteContext from '../context/notes/noteContext';
import noteicon from './noteicon.png';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (<>
        <div className='col-md-3'>
            <Card className='my-3'>
                <Card.Img variant="top" src={noteicon} id='noteicon' />
                <Card.Body className='pb-2'>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                        {note.description}
                    </Card.Text>
                    <Card.Subtitle className='my-3'>({note.tag})</Card.Subtitle>
                    <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => {
                        deleteNote(note._id);
                        props.showAlert("Note Deleted Successfully", "success")
                    }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => {
                        updateNote(note);
                    }}></i>
                </Card.Body>
            </Card>
        </div>
    </>)
}

export default NoteItem
