import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const TipoDocumentoPage = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDocumento, setNewDocumento] = useState({
    nombre: '',
    usuarioCreacion: localStorage.getItem('username'),
    fechaCreacion: '',
  });

  const [editDocumento, setEditDocumento] = useState(null);
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
    fetchDocumentos();
  }, []);

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/tipodocumento');
      setDocumentos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al traer los tipos de documentos:', error);
      setLoading(false);
    }
  };

  const handleShowAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleShowEdit = (role) => {
    setEditDocumento(role);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditDocumento(null);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocumento({ ...newDocumento, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditDocumento({ ...editDocumento, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDateTime = new Date().toISOString();
      const documentoToSubmit = {
        ...newDocumento,
        fechaCreacion: currentDateTime,
      };
      await axios.post('http://localhost:8081/api/tipodocumento', documentoToSubmit);
      setShowAddModal(false);
      fetchDocumentos();
    } catch (error) {
      console.error('Error creando tipo de documento:', error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDocumento = {
        ...editDocumento,
        usuarioModificacion: localStorage.getItem('username'), // Set usuarioModificacion
        fechaModificacion: new Date().toISOString(),
      };

      await axios.put(`http://localhost:8081/api/tipodocumento/${updatedDocumento.idTipoDocumento}`, updatedDocumento);
      handleCloseEdit();
      fetchDocumentos();
    } catch (error) {
      console.error('Error actualizando Tipo de documento:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/tipodocumento/${id}`);
      alert('Tipo de documento eliminado con éxito');
      setDocumentos(documentos.filter((documento) => documento.idTipoDocumento !== id));
    } catch (error) {
      console.error('Error al eliminar el Tipo de documento:', error);
      alert('Error al eliminar el Tipo de documento');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-between align-items-center">
        <Col>
          <h1 className="text-center">Gestión de Tipos de documento</h1>
        </Col>
        <Col className="text-right">
          {permissions.alta && (<Button variant="primary" onClick={handleShowAdd}>Nuevo Tipo de documento</Button>)}
        </Col>
      </Row>
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
            {documentos.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No se encontraron Tipos de documento</td>
              </tr>
            ) : (
              documentos.map((documento) => (
                <tr key={documento.idTipoDocumento}>
                  <td className="text-center">{documento.idTipoDocumento}</td>
                  <td>{documento.nombre}</td>
                  <td className="text-center">{new Date(documento.fechaCreacion).toLocaleDateString()}</td>
                  <td className="text-center">{documento.usuarioCreacion}</td>
                  <td className="text-center">{documento.fechaModificacion ? new Date(documento.fechaModificacion).toLocaleDateString() : ''}</td>
                  <td className="text-center">{documento.usuarioModificacion}</td>
                  <td className="text-center">
                    {permissions.cambio && (<Button variant="warning" size="md" className="mr-2" onClick={() => handleShowEdit(documento)}>Editar</Button>)}
                    {permissions.baja && (<Button variant="danger" size="md" className="ms-2" onClick={() => handleDelete(documento.idTipoDocumento)}>Eliminar</Button>)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for adding new role */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Tipo de documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newDocumento.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Crear Tipo de documento</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing existing role */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tipo de documento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editDocumento && (
            <Form onSubmit={handleEditFormSubmit}>
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={editDocumento.nombre}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">Actualizar Tipo de documento</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TipoDocumentoPage;
