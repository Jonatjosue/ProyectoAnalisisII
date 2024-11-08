import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/statusUsuarios';

const StatusUsuarioService = {
  obtenerTodos: () => axios.get(BASE_URL),
  obtenerPorId: (id) => axios.get(`${BASE_URL}/${id}`),
  crearStatusUsuario: (statusUsuario) => axios.post(BASE_URL, statusUsuario),
  actualizarStatusUsuario: (id, statusUsuario) => axios.put(`${BASE_URL}/${id}`, statusUsuario),
  eliminarStatusUsuario: (id) => axios.delete(`${BASE_URL}/${id}`)
};

const StatusUsuarioComponent = () => {
  const [statusUsuarios, setStatusUsuarios] = useState([]);
  const [nuevoStatusUsuario, setNuevoStatusUsuario] = useState({ nombre: '' });
  const [statusUsuarioEditando, setStatusUsuarioEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    StatusUsuarioService.obtenerTodos()
      .then(response => {
        setStatusUsuarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Error al obtener los status de usuario");
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (statusUsuario) => {
    setStatusUsuarioEditando(statusUsuario);
    setNuevoStatusUsuario({ nombre: statusUsuario.nombre });
    setShowEditModal(true);
  };
  const handleCloseEdit = () => {
    setStatusUsuarioEditando(null);
    setShowEditModal(false);
  };

  const handleCrearStatusUsuario = (event) => {
    event.preventDefault();
    const usuarioCreacion = localStorage.getItem('username');
    const statusUsuario = {
      ...nuevoStatusUsuario,
      fechaCreacion: new Date().toISOString(),
      usuarioCreacion
    };

    StatusUsuarioService.crearStatusUsuario(statusUsuario)
      .then(response => {
        setStatusUsuarios([...statusUsuarios, response.data]);
        setNuevoStatusUsuario({ nombre: '' });
        setShowAddModal(false);
      })
      .catch(error => {
        setError("Error al crear el status de usuario");
        console.error(error);
      });
  };

  const handleActualizarStatusUsuario = (event) => {
    event.preventDefault();
    const usuarioModificacion = localStorage.getItem('username');
    const statusUsuarioActualizado = {
      ...nuevoStatusUsuario,
      fechaModificacion: new Date().toISOString(),
      usuarioModificacion
    };

    StatusUsuarioService.actualizarStatusUsuario(statusUsuarioEditando.idStatusUsuario, statusUsuarioActualizado)
      .then(response => {
        setStatusUsuarios(statusUsuarios.map(su => 
          su.idStatusUsuario === response.data.idStatusUsuario ? response.data : su
        ));
        setShowEditModal(false);
        setStatusUsuarioEditando(null);
        setNuevoStatusUsuario({ nombre: '' });
      })
      .catch(error => {
        setError("Error al actualizar el status de usuario");
        console.error(error);
      });
  };

  const handleEliminarStatusUsuario = (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este status de usuario?")) return;

    StatusUsuarioService.eliminarStatusUsuario(id)
      .then(() => {
        setStatusUsuarios(statusUsuarios.filter(su => su.idStatusUsuario !== id));
      })
      .catch(error => {
        setError("Error al eliminar el status de usuario");
        console.error(error);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Status de Usuario</h1>
        </Col>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShowAdd}>Nuevo Status</Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Id</th>
              <th className="text-center">Nombre</th>
              <th className="text-center">Fecha Creación</th>
              <th className="text-center">Usuario Creación</th>
              <th className="text-center">Fecha Modificación</th>
              <th className="text-center">Usuario Modificación</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {statusUsuarios.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron status de usuario</td>
              </tr>
            ) : (
              statusUsuarios.map((statusUsuario) => (
                <tr key={statusUsuario.idStatusUsuario}>
                  <td className="text-center">{statusUsuario.idStatusUsuario}</td>
                  <td>{statusUsuario.nombre}</td>
                  <td className="text-center">{new Date(statusUsuario.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{statusUsuario.usuarioCreacion}</td>
                  <td className="text-center">{statusUsuario.fechaModificacion ? new Date(statusUsuario.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{statusUsuario.usuarioModificacion || ''}</td>
                  <td className="text-center">
                    <Button variant="warning" size="sm" onClick={() => handleShowEdit(statusUsuario)}>Editar</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleEliminarStatusUsuario(statusUsuario.idStatusUsuario)}>Eliminar</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new status usuario */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Status de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCrearStatusUsuario}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoStatusUsuario.nombre}
                onChange={(e) => setNuevoStatusUsuario({ ...nuevoStatusUsuario, nombre: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Status</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing status usuario */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Status de Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusUsuarioEditando && (
            <Form onSubmit={handleActualizarStatusUsuario}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nuevoStatusUsuario.nombre}
                  onChange={(e) => setNuevoStatusUsuario({ ...nuevoStatusUsuario, nombre: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Status</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default StatusUsuarioComponent;
