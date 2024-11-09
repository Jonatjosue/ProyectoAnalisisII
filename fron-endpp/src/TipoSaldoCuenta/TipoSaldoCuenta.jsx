import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function GestionTipoSaldoCuentaPage() {
  const [tiposSaldoCuenta, setTiposSaldoCuenta] = useState([]);
  const [idTipoSaldoCuenta, setIdTipoSaldoCuenta] = useState('');
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const [tipoSaldoSeleccionado, setTipoSaldoSeleccionado] = useState(null);
  const [nuevoTipoSaldoCuenta, setNuevoTipoSaldoCuenta] = useState({
    nombre: '',
    fechaCreacion: new Date().toISOString().slice(0, 10),
    usuarioCreacion: 'defaultUser',
    fechaModificacion: new Date().toISOString().slice(0, 10),
    usuarioModificacion: 'defaultUser'
  });
  const dialogRef = useRef(null);
  const createDialogRef = useRef(null);

  // Obtener todos los registros
  const fetchAllTiposSaldoCuenta = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tiposaldo/all`);
      setTiposSaldoCuenta(response.data);
    } catch (error) {
      console.error('Error al obtener todos los tipos de saldo cuenta:', error);
      alert('Error al obtener todos los tipos de saldo cuenta');
    }
  };

  // Obtener un registro por ID
  const fetchTipoSaldoCuentaById = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tiposaldo/${idTipoSaldoCuenta}`);
      if (response.data) {
        setTiposSaldoCuenta([response.data]);
      } else {
        setTiposSaldoCuenta([]);
      }
    } catch (error) {
      console.error('Error al obtener el tipo de saldo cuenta por ID:', error);
      alert('Error al obtener el tipo de saldo cuenta por ID');
    }
  };

  // Buscar registros por nombre
  const fetchTiposSaldoCuentaByNombre = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tiposaldo/nombre/${nombreBusqueda}`);
      setTiposSaldoCuenta(response.data);
    } catch (error) {
      console.error('Error al buscar por nombre:', error);
      alert('Error al buscar por nombre');
    }
  };

  // Crear nuevo tipo de saldo
  const crearTipoSaldoCuenta = async () => {
    try {
      await axios.post("http://localhost:8081/api/tiposaldo/save", nuevoTipoSaldoCuenta);
      alert('TipoSaldoCuenta creado exitosamente');
      closeCreateDialog();
      fetchAllTiposSaldoCuenta();
    } catch (error) {
      console.error('Error al crear el tipo de saldo cuenta:', error);
      alert('Error al crear el tipo de saldo cuenta');
    }
  };

  // Actualizar tipo de saldo
  const actualizarTipoSaldoCuenta = async () => {
    try {
      await axios.put(`http://localhost:8081/api/tiposaldo/${tipoSaldoSeleccionado.idTipoSaldoCuenta}`, tipoSaldoSeleccionado);
      alert('TipoSaldoCuenta actualizado exitosamente');
      closeDialog();
      fetchAllTiposSaldoCuenta();
    } catch (error) {
      console.error('Error al actualizar el tipo de saldo cuenta:', error);
      alert('Error al actualizar el tipo de saldo cuenta');
    }
  };

  // Eliminar tipo de saldo por ID
  const eliminarTipoSaldoCuenta = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/tiposaldo/delete/${id}`);
      alert('TipoSaldoCuenta eliminado exitosamente');
      fetchAllTiposSaldoCuenta();
    } catch (error) {
      console.error('Error al eliminar el tipo de saldo cuenta:', error);
      alert('Error al eliminar el tipo de saldo cuenta');
    }
  };

  // Funciones para manejo de diálogos
  const openDialog = (tipoSaldoCuenta) => {
    setTipoSaldoSeleccionado(tipoSaldoCuenta);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setTipoSaldoSeleccionado(null);
  };

  const openCreateDialog = () => {
    setNuevoTipoSaldoCuenta({
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTipoSaldoSeleccionado({ ...tipoSaldoSeleccionado, [name]: value });
  };

  const handleNuevoTipoSaldoCuentaChange = (e) => {
    const { name, value } = e.target;
    setNuevoTipoSaldoCuenta({ ...nuevoTipoSaldoCuenta, [name]: value });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Tipos de Saldo de Cuenta</h2>

      {/* Botones para cada operación */}
      <button className="btn btn-primary mb-2" onClick={fetchAllTiposSaldoCuenta}>
        Consultar Todos los Tipos de Saldo Cuenta
      </button>
      <button className="btn btn-success mb-2" onClick={openCreateDialog}>
        Agregar Tipo Saldo Cuenta
      </button>

      {/* Campos de búsqueda por ID y nombre */}
      <div className="form-group">
        <label>Buscar por ID de Tipo Saldo Cuenta:</label>
        <input
          type="number"
          className="form-control"
          value={idTipoSaldoCuenta}
          onChange={(e) => setIdTipoSaldoCuenta(e.target.value)}
          placeholder="ID de Tipo Saldo Cuenta"
        />
        <button className="btn btn-info mt-2" onClick={fetchTipoSaldoCuentaById}>
          Consultar por ID
        </button>
      </div>

      <div className="form-group">
        <label>Buscar por Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={nombreBusqueda}
          onChange={(e) => setNombreBusqueda(e.target.value)}
          placeholder="Nombre de Tipo Saldo Cuenta"
        />
        <button className="btn btn-info mt-2" onClick={fetchTiposSaldoCuentaByNombre}>
          Consultar por Nombre
        </button>
      </div>

      {/* Tabla para mostrar resultados */}
      {tiposSaldoCuenta.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID Tipo Saldo Cuenta</th>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Usuario Creación</th>
                <th>Fecha Modificación</th>
                <th>Usuario Modificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tiposSaldoCuenta.map((tipoSaldoCuenta) => (
                <tr key={tipoSaldoCuenta.idTipoSaldoCuenta}>
                  <td>{tipoSaldoCuenta.idTipoSaldoCuenta}</td>
                  <td>{tipoSaldoCuenta.nombre}</td>
                  <td>{tipoSaldoCuenta.fechaCreacion}</td>
                  <td>{tipoSaldoCuenta.usuarioCreacion}</td>
                  <td>{tipoSaldoCuenta.fechaModificacion}</td>
                  <td>{tipoSaldoCuenta.usuarioModificacion}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => openDialog(tipoSaldoCuenta)}>
                      Actualizar
                    </button>
                    <button className="btn btn-danger ml-2" onClick={() => eliminarTipoSaldoCuenta(tipoSaldoCuenta.idTipoSaldoCuenta)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontraron tipos de saldo cuenta.</p>
      )}

      {/* Diálogo para actualizar tipo saldo cuenta */}
      <dialog ref={dialogRef}>
        <h5>Actualizar Información del Tipo Saldo Cuenta</h5>
        {tipoSaldoSeleccionado && (
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={tipoSaldoSeleccionado.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="dialog-buttons">
              <button type="button" className="btn btn-success" onClick={actualizarTipoSaldoCuenta}>
                Confirmar
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </dialog>

      {/* Diálogo para crear nuevo tipo saldo cuenta */}
      <dialog ref={createDialogRef}>
        <h5>Agregar Nuevo Tipo Saldo Cuenta</h5>
        <form>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nuevoTipoSaldoCuenta.nombre}
              onChange={handleNuevoTipoSaldoCuentaChange}
              required
            />
          </div>
          <div className="dialog-buttons">
            <button type="button" className="btn btn-success" onClick={crearTipoSaldoCuenta}>
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

export default GestionTipoSaldoCuentaPage;