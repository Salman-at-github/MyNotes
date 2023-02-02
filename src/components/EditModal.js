import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EditModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { reference, handleSubmit } = props;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }
  const changeNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }) //setNote({...whatever curr value is [whatever the name tag represents]: to its value })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} ref={reference} className='d-none '>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='my-3'>

            <Form.Group className="mb-3" >
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" onChange={changeNote} id='etitle' name='etitle' />
              {/* <Form.Text className="text-muted">
  We'll never share your email with anyone else.
</Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" onChange={changeNote} id='edescription' name='edescription' />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tag</Form.Label>
              <Form.Control type="text" placeholder="Any tag?" onChange={changeNote} id='etag' name='etag' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;