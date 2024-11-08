import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";

function GestionClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [idPersona, setIdPersona] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    idGenero: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
    idEstadoCivil: '',
    fechaCreacion: new Date().toISOString().slice(0, 10),
    usuarioCreacion: 'defaultUser',
    fechaModificacion: new Date().toISOString().slice(0, 10),
    usuarioModificacion: 'defaultUser'
  });
  const dialogRef = useRef(null);
  const createDialogRef = useRef(null);

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/personas/${idPersona}`);
      if (response.data !== "") {
        setClientes([response.data]);
      } else {
        setClientes([]);
      }
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
      alert('Error al obtener el cliente');
    }
  };

  useEffect(() => {
    if (idPersona) {
      fetchClientes();
    }
  }, [idPersona]);

  const handleIdPersonaChange = (e) => {
    setIdPersona(e.target.value);
  };

  const openDialog = (cliente) => {
    setClienteSeleccionado(cliente);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setClienteSeleccionado(null);
  };

  const openCreateDialog = () => {
    setNuevoCliente({
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      idGenero: '',
      direccion: '',
      telefono: '',
      correoElectronico: '',
      idEstadoCivil: '',
      fechaCreacion: new Date().toISOString().slice(0, 10),
      usuarioCreacion: 'defaultUser',
      fechaModificacion: new Date().toISOString().slice(0, 10),
      usuarioModificacion: 'defaultUser'
    });
    createDialogRef.current.showModal();
  };

  const closeCreateDialog = () => {
    createDialogRef.current.close();
  };

  const actualizarCliente = async () => {
    try {
      await axios.put(`http://localhost:8081/api/personas/${clienteSeleccionado.idPersona}`, clienteSeleccionado);
      alert('Cliente actualizado exitosamente');
      closeDialog();
      fetchClientes();
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      alert('Error al actualizar el cliente');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteSeleccionado({ ...clienteSeleccionado, [name]: value });
  };

  const handleNuevoClienteChange = (e) => {
    const { name, value } = e.target;
    setNuevoCliente({ ...nuevoCliente, [name]: value });
  };

  const crearCliente = async () => {
    try {
      await axios.post("http://localhost:8081/api/personas", nuevoCliente);
      alert('Cliente creado exitosamente');
      closeCreateDialog();
      fetchClientes();
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      alert('Error al crear el cliente');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Clientes</h2>

      <div className="form-group">
        <label>Ingrese el ID de Persona:</label>
        <input
          type="number"
          className="form-control"
          value={idPersona}
          onChange={handleIdPersonaChange}
          placeholder="ID de Persona"
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={fetchClientes}>
        Consultar Cliente
      </button>
      <button className="btn btn-success mb-4" onClick={openCreateDialog}>
        Agregar Cliente
      </button>

      {clientes.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID Persona</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Nacimiento</th>
                <th>ID Género</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo Electrónico</th>
                <th>ID Estado Civil</th>
                <th>Fecha Creación</th>
                <th>Usuario Creación</th>
                <th>Fecha Modificación</th>
                <th>Usuario Modificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.idPersona}>
                  <td>{cliente.idPersona}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.fechaNacimiento}</td>
                  <td>{cliente.idGenero}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.correoElectronico}</td>
                  <td>{cliente.idEstadoCivil}</td>
                  <td>{cliente.fechaCreacion}</td>
                  <td>{cliente.usuarioCreacion}</td>
                  <td>{cliente.fechaModificacion}</td>
                  <td>{cliente.usuarioModificacion}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => openDialog(cliente)}>
                      Actualizar Cliente
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontró el cliente para este ID de Persona.</p>
      )}

      {/* Diálogo para actualizar cliente */}
      <dialog ref={dialogRef}>
        <h5>Actualizar Información del Cliente</h5>
        {clienteSeleccionado && (
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={clienteSeleccionado.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Apellido:</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={clienteSeleccionado.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                className="form-control"
                name="fechaNacimiento"
                value={clienteSeleccionado.fechaNacimiento}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>ID Género:</label>
              <input
                type="number"
                className="form-control"
                name="idGenero"
                value={clienteSeleccionado.idGenero}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Dirección:</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={clienteSeleccionado.direccion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Teléfono:</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={clienteSeleccionado.telefono}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                name="correoElectronico"
                value={clienteSeleccionado.correoElectronico}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>ID Estado Civil:</label>
              <input
                type="number"
                className="form-control"
                name="idEstadoCivil"
                value={clienteSeleccionado.idEstadoCivil}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Fecha Creación:</label>
              <input
                type="date"
                className="form-control"
                name="fechaCreacion"
                value={clienteSeleccionado.fechaCreacion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Usuario Creación:</label>
              <input
                type="text"
                className="form-control"
                name="usuarioCreacion"
                value={clienteSeleccionado.usuarioCreacion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Fecha Modificación:</label>
              <input
                type="date"
                className="form-control"
                name="fechaModificacion"
                value={clienteSeleccionado.fechaModificacion}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Usuario Modificación:</label>
              <input
                type="text"
                className="form-control"
                name="usuarioModificacion"
                value={clienteSeleccionado.usuarioModificacion}
                onChange={handleInputChange}
              />
            </div>
            <div className="dialog-buttons">
              <button type="button" className="btn btn-success" onClick={actualizarCliente}>
                Confirmar
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </dialog>

      {/* Diálogo para crear nuevo cliente */}
      <dialog ref={createDialogRef}>
        <h5>Agregar Nuevo Cliente</h5>
        <form>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nuevoCliente.nombre}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              className="form-control"
              name="apellido"
              value={nuevoCliente.apellido}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              className="form-control"
              name="fechaNacimiento"
              value={nuevoCliente.fechaNacimiento}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>ID Género:</label>
            <input
              type="number"
              className="form-control"
              name="idGenero"
              value={nuevoCliente.idGenero}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={nuevoCliente.telefono}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              className="form-control"
              name="correoElectronico"
              value={nuevoCliente.correoElectronico}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>ID Estado Civil:</label>
            <input
              type="number"
              className="form-control"
              name="idEstadoCivil"
              value={nuevoCliente.idEstadoCivil}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha Creación:</label>
            <input
              type="date"
              className="form-control"
              name="fechaCreacion"
              value={nuevoCliente.fechaCreacion}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Usuario Creación:</label>
            <input
              type="text"
              className="form-control"
              name="usuarioCreacion"
              value={nuevoCliente.usuarioCreacion}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha Modificación:</label>
            <input
              type="date"
              className="form-control"
              name="fechaModificacion"
              value={nuevoCliente.fechaModificacion}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Usuario Modificación:</label>
            <input
              type="text"
              className="form-control"
              name="usuarioModificacion"
              value={nuevoCliente.usuarioModificacion}
              onChange={handleNuevoClienteChange}
              required
            />
          </div>
          
          <div className="dialog-buttons">
            <button type="button" className="btn btn-success" onClick={crearCliente}>
              Confirmar
            </button>
            <button type="button" className="btn btn-secondary" onClick={closeCreateDialog}>
              Cancelar
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default GestionClientesPage;