import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TipoDocumentoPage() {
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    fechaCreacion: '',
    usuarioCreacion: '',
    fechaModificacion: '',
    usuarioModificacion: ''
  });
  const [roleOpcion, setRoleOpcion] = useState(null);

  // Función para obtener los documentos tipo y mostrarlos en una tabla
  const fetchTipoDocumentos = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/tipo-documento');
      const data = await response.json();
      setTipoDocumentos(data);
    } catch (error) {
      console.error('Error fetching tipo documentos:', error);
    }
  };

  // Función para insertar un nuevo documento tipo
  const insertarTipoDocumento = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/tipo-documento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre: formData.nombre,
          Fecha_Creacion: formData.fechaCreacion,
          Usuario_Creacion: formData.usuarioCreacion,
          Fecha_Modificacion: formData.fechaModificacion,
          Usuario_Modificacion: formData.usuarioModificacion
        }),
      });
      const data = await response.json();
      alert('Registro insertado con éxito en TIPO_DOCUMENTO');
      setFormData({
        nombre: '',
        fechaCreacion: '',
        usuarioCreacion: '',
        fechaModificacion: '',
        usuarioModificacion: ''
      });
      fetchTipoDocumentos(); // Refrescamos la lista después de la inserción
    } catch (error) {
      console.error('Error inserting tipo documento:', error);
      alert('Error al guardar el tipo de documento');
    }
  };

  // Función para obtener los permisos del usuario basados en el role y la opción "Empresas"
  const fetchRoleOpcion = async (idRole, nombreOpcion) => {
    try {
      const response = await fetch(`http://localhost:8081/api/role-opcion-por-nombre/`+idRole+`/`+nombreOpcion+``);
      const data = await response.json();
      setRoleOpcion(data);
    } catch (error) {
      console.error('Error al obtener roleOpcion:', error);
    }
  };

  // useEffect para obtener los permisos al cargar la página
  useEffect(() => {
    fetchRoleOpcion(localStorage.getItem('userRole'), 'fetchTipoDocumentos');
    fetchTipoDocumentos(); // Llamar a la función para obtener los documentos tipo
  }, []);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestión de Tipos de Documentos</h1>

      {/* Comprobamos si el usuario tiene permisos para crear */}
      {roleOpcion && roleOpcion.Alta ? (
        <form onSubmit={insertarTipoDocumento}>
          <div className="form-group">
            <label>Nombre del Documento:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Creación:</label>
            <input
              type="datetime-local"
              className="form-control"
              name="fechaCreacion"
              value={formData.fechaCreacion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Usuario Creación:</label>
            <input
              type="text"
              className="form-control"
              name="usuarioCreacion"
              value={formData.usuarioCreacion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Modificación:</label>
            <input
              type="datetime-local"
              className="form-control"
              name="fechaModificacion"
              value={formData.fechaModificacion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Usuario Modificación:</label>
            <input
              type="text"
              className="form-control"
              name="usuarioModificacion"
              value={formData.usuarioModificacion}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Crear Tipo Documento
          </button>
        </form>
      ) : (
        <p>No tienes permisos para crear nuevos documentos.</p>
      )}

      {/* Tabla para mostrar los tipos de documentos */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha Creación</th>
              <th>Usuario Creación</th>
              <th>Fecha Modificación</th>
              <th>Usuario Modificación</th>
            </tr>
          </thead>
          <tbody>
            {tipoDocumentos.map((documento) => (
              <tr key={documento.Id_Tipo_Documento}>
                <td>{documento.Id_Tipo_Documento}</td>
                <td>{documento.Nombre}</td>
                <td>{new Date(documento.Fecha_Creacion).toLocaleString()}</td>
                <td>{documento.Usuario_Creacion}</td>
                <td>{new Date(documento.Fecha_Modificacion).toLocaleString()}</td>
                <td>{documento.Usuario_Modificacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TipoDocumentoPage;
