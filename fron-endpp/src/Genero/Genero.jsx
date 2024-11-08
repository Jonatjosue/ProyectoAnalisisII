import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/generos';

const GeneroService = {
  obtenerTodos: () => axios.get(BASE_URL),
  obtenerPorId: (id) => axios.get(`${BASE_URL}/${id}`),
  crearGenero: (genero) => axios.post(BASE_URL, genero),
  actualizarGenero: (id, genero) => axios.put(`${BASE_URL}/${id}`, genero),
};

const GeneroComponent = () => {
  const [generos, setGeneros] = useState([]);
  const [error, setError] = useState(null);
  const [nuevoGenero, setNuevoGenero] = useState({ nombre: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [generoEditando, setGeneroEditando] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [permissions, setPermissions] = useState({ alta: false, baja: false, cambio: false, imprimir: false, exportar: false });

  // Obten idRole y idOpcion para determinar permisos
  const userRole = localStorage.getItem('userRole');
  const idOpcion = localStorage.getItem('idOpcion');

  useEffect(() => {

    // Fetch permissions for the selected role and option
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/role-opcion/${userRole}/${idOpcion}`);
        const { alta, baja, cambio, imprimir, exportar } = response.data;
        setPermissions({ alta, baja, cambio, imprimir, exportar });
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, [userRole, idOpcion]);

  useEffect(() => {
    // Obtener todos los géneros al montar el componente
    GeneroService.obtenerTodos()
      .then(response => {
        setGeneros(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Error al obtener los géneros");
        console.error(error);
        setLoading(false);
      });
    }, []);

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (genero) => {
    setGeneroEditando(genero);
    setNuevoGenero({ nombre: genero.nombre });
    setShowEditModal(true);
  };
  const handleCloseEdit = () => {
    setGeneroEditando(null);
    setShowEditModal(false);
  };

  const handleCrearGenero = (event) => {
    event.preventDefault(); // Prevenir la recarga de la página
    const usuarioCreacion = localStorage.getItem('username');
    const genero = {
      nombre: nuevoGenero.nombre,
      fechaCreacion: new Date().toISOString(),
      usuarioCreacion,
    };

    GeneroService.crearGenero(genero)
      .then(response => {
        // Actualizamos la lista de géneros sin recargar la página
        setGeneros(prevGeneros => [...prevGeneros, response.data]);
        setNuevoGenero({ nombre: '' });
        setShowAddModal(false);
      })
      .catch(error => {
        setError("Error al crear el género");
        console.error(error);
      });
  };

  const handleActualizarGenero = (event) => {
    event.preventDefault(); // Prevenir la recarga de la página
    const usuarioModificacion = localStorage.getItem('username');
    const generoActualizado = {
      nombre: nuevoGenero.nombre,
      fechaModificacion: new Date().toISOString(),
      usuarioModificacion,
    };

    GeneroService.actualizarGenero(generoEditando.idGenero, generoActualizado)
      .then(response => {
        // Actualizamos el género editado en la lista sin recargar la página
        setGeneros(prevGeneros => 
          prevGeneros.map(g => g.idGenero === response.data.idGenero ? response.data : g)
        );
        setModoEdicion(false);
        setGeneroEditando(null);
        setNuevoGenero({ nombre: '' });
        setShowEditModal(false);
      })
      .catch(error => {
        setError("Error al actualizar el género");
        console.error(error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/generos/${id}`);
      alert('Género eliminado con éxito');
      setGeneros(generos.filter((genero) => genero.idGenero !== id));
    } catch (error) {
      console.error('Error al eliminar el Género:', error);
      alert('Error al eliminar el Género');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Géneros</h1>
        </Col>
        <Col className="text-right">
          {permissions.alta && (
            <Button variant="primary" onClick={handleShowAdd}>Nuevo Género</Button>
          )}
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
            {generos.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron géneros</td>
              </tr>
            ) : (
              generos.map((genero) => (
                <tr key={genero.idGenero}>
                  <td className="text-center">{genero.idGenero}</td>
                  <td>{genero.nombre}</td>
                  <td className="text-center">{new Date(genero.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{genero.usuarioCreacion}</td>
                  <td className="text-center">{genero.fechaModificacion ? new Date(genero.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{genero.usuarioModificacion}</td>
                  <td className="text-center">
                    {permissions.cambio && (
                      <Button variant="warning" size="sm" onClick={() => handleShowEdit(genero)}>Editar</Button>
                    )}
                    {permissions.baja && (
                      <Button variant="danger" size="sm" onClick={() => handleDelete(genero.idGenero)}>Eliminar</Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new genero */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Género</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCrearGenero}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoGenero.nombre}
                onChange={(e) => setNuevoGenero({ ...nuevoGenero, nombre: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Género</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing genero */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Género</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {generoEditando && (
            <Form onSubmit={handleActualizarGenero}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nuevoGenero.nombre}
                  onChange={(e) => setNuevoGenero({ ...nuevoGenero, nombre: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Género</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default GeneroComponent;
