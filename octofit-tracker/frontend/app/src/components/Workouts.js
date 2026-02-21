import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Modal, Form, Navbar, Nav } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', data);
        setWorkouts(data.results ? data.results : data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, [endpoint]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <Card className="mb-4">
        <Card.Header as="h2">Workouts</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={idx}>
                  <td>{workout.name || JSON.stringify(workout)}</td>
                  <td>{workout.type || 'Unknown'}</td>
                  <td>{workout.duration || 'Unknown'}</td>
                  <td>
                    <Button variant="link" href="#edit">Edit</Button>
                    <Button variant="danger" href="#delete">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary">Add Workout</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formWorkoutName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter workout name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWorkoutType">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" placeholder="Enter workout type" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formWorkoutDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control type="number" placeholder="Enter duration (min)" />
            </Form.Group>
            <Button variant="primary" type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Workouts;
