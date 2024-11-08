import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function GestionTipoMovimientoCXCPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [idMovimiento, setIdMovimiento] = useState('');
  const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null);
  const [nuevoMovimiento, setNuevoMovimiento] = useState({
    nombre: '',
    operacionCuentaCorriente: '',
    fechaCreacion: new Date().toISOString().slice(0, 10),
    usuarioCreacion: 'defaultUser',
    fechaModificacion: new Date().toISOString().slice(0, 10),
    usuarioModificacion: 'defaultUser'
  });
  const dialogRef = useRef(null);
  const createDialogRef = useRef(null);

  const fetchMovimientos = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/tipoMovimientoCXC/${idMovimiento}`);
      if (response.data) {
        setMovimientos([response.data]);
      } else {
        setMovimientos([]);
      }
    } catch (error) {
      console.error('Error al obtener el movimiento:', error);
      alert('Error al obtener el movimiento');
    }
  };

  useEffect(() => {
    if (idMovimiento) {
      fetchMovimientos();
    }
  }, [idMovimiento]);

  const handleIdMovimientoChange = (e) => {
    setIdMovimiento(e.target.value);
  };

  const openDialog = (movimiento) => {
    setMovimientoSeleccionado(movimiento);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setMovimientoSeleccionado(null);
  };

  const openCreateDialog = () => {
    setNuevoMovimiento({
      nombre: '',
      operacionCuentaCorriente: '',
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

  const actualizarMovimiento = async () => {
    try {
      await axios.put(`http://localhost:8081/api/tipoMovimientoCXC/${movimientoSeleccionado.idTipoMovimientoCXC}`, movimientoSeleccionado);
      alert('Movimiento actualizado exitosamente');
      closeDialog();
      fetchMovimientos();
    } catch (error) {
      console.error('Error al actualizar el movimiento:', error);
      alert('Error al actualizar el movimiento');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovimientoSeleccionado({ ...movimientoSeleccionado, [name]: value });
  };

  const handleNuevoMovimientoChange = (e) => {
    const { name, value } = e.target;
    setNuevoMovimiento({ ...nuevoMovimiento, [name]: value });
  };

  const crearMovimiento = async () => {
    try {
      await axios.post("http://localhost:8081/api/tipoMovimientoCXC", nuevoMovimiento);
      alert('Movimiento creado exitosamente');
      closeCreateDialog();
      fetchMovimientos();
    } catch (error) {
      console.error('Error al crear el movimiento:', error);
      alert('Error al crear el movimiento');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Movimientos CXC</h2>

      <div className="form-group">
        <label>Ingrese el ID de Movimiento:</label>
        <input
          type="number"
          className="form-control"
          value={idMovimiento}
          onChange={handleIdMovimientoChange}
          placeholder="ID de Movimiento"
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={fetchMovimientos}>
        Consultar Movimiento
      </button>
      <button className="btn btn-success mb-4" onClick={openCreateDialog}>
        Agregar Movimiento
      </button>

      {movimientos.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID Movimiento</th>
                <th>Nombre</th>
                <th>Operación en Cuenta Corriente</th>
                <th>Fecha Creación</th>
                <th>Usuario Creación</th>
                <th>Fecha Modificación</th>
                <th>Usuario Modificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((movimiento) => (
                <tr key={movimiento.idTipoMovimientoCXC}>
                  <td>{movimiento.idTipoMovimientoCXC}</td>
                  <td>{movimiento.nombre}</td>
                  <td>{movimiento.operacionCuentaCorriente}</td>
                  <td>{movimiento.fechaCreacion}</td>
                  <td>{movimiento.usuarioCreacion}</td>
                  <td>{movimiento.fechaModificacion}</td>
                  <td>{movimiento.usuarioModificacion}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => openDialog(movimiento)}>
                      Actualizar Movimiento
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No se encontró el movimiento para este ID.</p>
      )}

      {/* Diálogo para actualizar movimiento */}
      <dialog ref={dialogRef}>
        <h5>Actualizar Información del Movimiento</h5>
        {movimientoSeleccionado && (
          <form>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={movimientoSeleccionado.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Operación en Cuenta Corriente:</label>
              <input
                type="number"
                className="form-control"
                name="operacionCuentaCorriente"
                value={movimientoSeleccionado.operacionCuentaCorriente}
                onChange={handleInputChange}
              />
            </div>
            <div className="dialog-buttons">
              <button type="button" className="btn btn-success" onClick={actualizarMovimiento}>
                Confirmar
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeDialog}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </dialog>

      {/* Diálogo para crear nuevo movimiento */}
      <dialog ref={createDialogRef}>
        <h5>Agregar Nuevo Movimiento</h5>
        <form>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nuevoMovimiento.nombre}
              onChange={handleNuevoMovimientoChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Operación en Cuenta Corriente:</label>
            <input
              type="number"
              className="form-control"
              name="operacionCuentaCorriente"
              value={nuevoMovimiento.operacionCuentaCorriente}
              onChange={handleNuevoMovimientoChange}
              required
            />
          </div>
          <div className="dialog-buttons">
            <button type="button" className="btn btn-success" onClick={crearMovimiento}>
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

export default GestionTipoMovimientoCXCPage;
