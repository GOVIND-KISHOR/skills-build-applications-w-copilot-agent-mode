import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Modal, Form, Navbar, Nav } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', data);
        setActivities(data.results ? data.results : data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <Card className="mb-4">
        <Card.Header as="h2">Activities</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{activity.date}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>
                    <Button variant="link" href="#edit">Edit</Button>
                    <Button variant="danger" href="#delete">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary">Add Activity</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formActivityType">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" placeholder="Enter activity type" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formActivityDuration">
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

export default Activities;
