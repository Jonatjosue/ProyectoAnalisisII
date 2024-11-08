import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function GestionStatusCuentaPage() {
  const [statusCuentas, setStatusCuentas] = useState([]);
  const [idStatusCuenta, setIdStatusCuenta] = useState('');
  const [statusCuentaSeleccionado, setStatusCuentaSeleccionado] = useState(null);
  const [nuevoStatusCuenta, setNuevoStatusCuenta] = useState({
    nombre: '',
    fechaCreacion: new Date().toISOString().slice(0, 10),
    usuarioCreacion: 'defaultUser',
    fechaModificacion: new Date().toISOString().slice(0, 10),
    usuarioModificacion: 'defaultUser'
  });
  const dialogRef = useRef(null);
  const createDialogRef = useRef(null);

  const fetchStatusCuentas = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/status-cuenta/${idStatusCuenta}`);
      if (response.data) {
        setStatusCuentas([response.data]);
      } else {
        setStatusCuentas([]);
      }
    } catch (error) {
      console.error('Error al obtener el status cuenta:', error);
      alert('Error al obtener el status cuenta');
    }
  };

  useEffect(() => {
    if (idStatusCuenta) {
      fetchStatusCuentas();
    }
  }, [idStatusCuenta]);

  const handleIdStatusCuentaChange = (e) => {
    setIdStatusCuenta(e.target.value);
  };

  const openDialog = (statusCuenta) => {
    setStatusCuentaSeleccionado(statusCuenta);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setStatusCuentaSeleccionado(null);
  };

  const openCreateDialog = () => {
    setNuevoStatusCuenta({
      nombre: '',
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

  const actualizarStatusCuenta = async () => {
    try {
      await axios.put(`http://localhost:8081/api/status-cuenta/${statusCuentaSeleccionado.idStatusCuenta}`, statusCuentaSeleccionado);
      alert('StatusCuenta actualizado exitosamente');
      closeDialog();
      fetchStatusCuentas();
    } catch (error) {
      console.error('Error al actualizar el status cuenta:', error);
      alert('Error al actualizar el status cuenta');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStatusCuentaSeleccionado({ ...statusCuentaSeleccionado, [name]: value });
  };

  const handleNuevoStatusCuentaChange = (e) => {
    const { name, value } = e.target;
    setNuevoStatusCuenta({ ...nuevoStatusCuenta, [name]: value });
  };

  const crearStatusCuenta = async () => {
    try {
      await axios.post("http://localhost:8081/api/status-cuenta", nuevoStatusCuenta);
      alert('StatusCuenta creado exitosamente');
      closeCreateDialog();
      fetchStatusCuentas();
    } catch (error) {
      console.error('Error al crear el status cuenta:', error);
      alert('Error al crear el status cuenta');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Status de Cuenta</h2>

      <div className="form-group">
        <label>Ingrese el ID de Status Cuenta:</label>
        <input
          type="number"
          className="form-control"
          value={idStatusCuenta}
          onChange={handleIdStatusCuentaChange}
          placeholder="ID de Status Cuenta"
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={fetchStatusCuentas}>
        Consultar Status Cuenta
      </button>
      <button className="btn btn-success mb-4" onClick={openCreateDialog}>
        Agregar Status Cuenta
      </button>

      {statusCuentas.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID Status Cuenta</th>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Usuario Creación</th>
                <th>Fecha Modificación</th>
                <th>Usuario Modificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {statusCuentas.map((statusCuenta) => (
                <tr key={statusCuenta.idStatusCuenta}>
                  <td>{statusCuenta.idStatusCuenta}</td>
                  <td>{statusCuenta.nombre}</td>
                  <td>{statusCuenta.fechaCreacion}</td>
                  <td>{statusCuenta.usuarioCreacion}</td>
                  <td>{statusCuenta.fechaModificacion}</td>
                  <td>{statusCuenta.usuarioModificacion}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => openDialog(statusCuenta)}>
                      Actualizar Status Cuenta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontró el status cuenta para este ID.</p>
      )}

      {/* Diálogo para actualizar status cuenta */}
      <dialog ref={dialogRef}>
        <h5>Actualizar Información del Status Cuenta</h5>
        {statusCuentaSeleccionado && (
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={statusCuentaSeleccionado.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="dialog-buttons">
              <button type="button" className="btn btn-success" onClick={actualizarStatusCuenta}>
                Confirmar
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </dialog>

      {/* Diálogo para crear nuevo status cuenta */}
      <dialog ref={createDialogRef}>
        <h5>Agregar Nuevo Status Cuenta</h5>
        <form>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nuevoStatusCuenta.nombre}
              onChange={handleNuevoStatusCuentaChange}
              required
            />
          </div>
          <div className="dialog-buttons">
            <button type="button" className="btn btn-success" onClick={crearStatusCuenta}>
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

export default GestionStatusCuentaPage;