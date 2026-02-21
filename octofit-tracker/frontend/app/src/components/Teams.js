import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Modal, Form, Navbar, Nav } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(data.results ? data.results : data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <Card className="mb-4">
        <Card.Header as="h2">Teams</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx}>
                  <td>{team.name || JSON.stringify(team)}</td>
                  <td>{team.members?.length || 0}</td>
                  <td>
                    <Button variant="link" href="#edit">Edit</Button>
                    <Button variant="danger" href="#delete">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary">Create Team</Button>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTeamName">
              <Form.Label>Team Name</Form.Label>
              <Form.Control type="text" placeholder="Enter team name" />
            </Form.Group>
            <Button variant="primary" type="submit">Create</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Teams;
