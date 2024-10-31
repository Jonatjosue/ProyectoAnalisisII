import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Spinner, Modal, Form, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const UserRoleSelect = () => {
  const [userRoles, setUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState({});

  useEffect(() => {
    fetchUserRoles();
    fetchRoles();
    fetchUsers();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/user-roles');
      setUserRoles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching User Roles:', error);
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/Role');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching Roles:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/Usuario/All');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching Users:', error);
    }
  };

  const handleShowAssign = () => setShowAssignModal(true);
  const handleCloseAssign = () => setShowAssignModal(false);
  const handleShowEdit = (userRole) => {
    setCurrentUserRole(userRole);
    setSelectedUser(userRole.userId); // Save the selected user ID
    setSelectedRole(userRole.idRole);
    setShowEditModal(true);
  };
  const handleCloseEdit = () => setShowEditModal(false);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleAssignFormSubmit = async (e) => {
    e.preventDefault();
    setAssigning(true);
    try {
      await axios.post('http://localhost:8081/api/usuario-role', {
        idUsuario: selectedUser,
        idRole: selectedRole,
        usuarioCreacion: localStorage.getItem('username'),
        fechaCreacion: new Date()
      });
      setMessage('Role asignado exitosamente');
      fetchUserRoles();
    } catch (error) {
      console.error('Error assigning role:', error);
      setMessage('Error assigning role.');
    }
    setAssigning(false);
    handleCloseAssign();
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    try {
      await axios.put(`http://localhost:8081/api/usuario-role/${currentUserRole.userId}/${currentUserRole.idRole}`, {
        // Update the necessary fields here; adjust based on your `UsuarioRole` model
        idRole: selectedRole,
        usuarioModificacion: localStorage.getItem('username'),  // or set this dynamically if required
        fechaModificacion: new Date()
      });
      setMessage('Role updated successfully');
      fetchUserRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      setMessage('Error updating role.');
    }
    setEditing(false);
    handleCloseEdit();
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : '';
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Usuarios y Roles</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShowAssign}>Asignar Rol</Button>
        </Col>
      </Row>

      {message && (
        <Alert variant="info" className="mt-3">
          {message}
        </Alert>
      )}

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">User ID</th>
              <th className="text-center">User Name</th>
              <th className="text-center">Role</th>
              <th className="text-center">Usuario Creación</th>
              <th className="text-center">Fecha Creación</th>
              <th className="text-center">Usuario Modificación</th>
              <th className="text-center">Fecha Modificación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userRoles.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No roles assigned to users</td>
              </tr>
            ) : (
              userRoles.map((userRole) => (
                <tr key={`${userRole.Id}`}>
                  <td className="text-center">{userRole.userId}</td>
                  <td>{userRole.userName}</td>
                  <td className="text-center">{userRole.roleName}</td>
                  <td className="text-center">{userRole.usuarioCreacion}</td>
                  <td className="text-center">{formatDate(userRole.fechaCreacion)}</td>
                  <td className="text-center">{userRole.usuarioModificacion}</td>
                  <td className="text-center">{formatDate(userRole.fechaModificacion)}</td>
                  <td className="text-center">
                    <Button variant="warning" onClick={() => handleShowEdit(userRole)}>Editar</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for assigning a role to a user */}
      <Modal show={showAssignModal} onHide={handleCloseAssign}>
        <Modal.Header closeButton>
          <Modal.Title>Asignar Rol a Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAssignFormSubmit}>
            <Form.Group controlId="userSelect">
              <Form.Label>Selecciona Usuario</Form.Label>
              <Form.Control as="select" value={selectedUser} onChange={handleUserChange} required>
                <option value="">Seleccionar Usuario</option>
                {users.map((user) => (
                  <option key={user.idUsuario} value={user.idUsuario}>
                    {user.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="roleSelect">
              <Form.Label>Selecciona Rol</Form.Label>
              <Form.Control as="select" value={selectedRole} onChange={handleRoleChange} required>
                <option value="">Seleccionar Rol</option>
                {roles.map((role) => (
                  <option key={role.idRole} value={role.idRole}>
                    {role.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" disabled={assigning}>
              {assigning ? <Spinner animation="border" size="sm" /> : 'Asignar Rol'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing a user role */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Rol de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditFormSubmit}>
            <Form.Group controlId="editUserSelect">
              <Form.Label>Usuario</Form.Label>
              <Form.Control as="select" value={currentUserRole.userId} disabled>
                <option value={currentUserRole.userId}>{currentUserRole.userName}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="editRoleSelect">
              <Form.Label>Selecciona Rol</Form.Label>
              <Form.Control as="select" value={selectedRole} onChange={handleRoleChange} required>
                <option value="">Seleccionar Rol</option>
                {roles.map((role) => (
                  <option key={role.idRole} value={role.idRole}>
                    {role.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="warning" type="submit" className="mt-3" disabled={editing}>
              {editing ? <Spinner animation="border" size="sm" /> : 'Actualizar Rol'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserRoleSelect;
