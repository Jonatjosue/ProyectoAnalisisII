import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function MovimientoCuentaPage() {
  const [movimientos, setMovimientos] = useState([]);
  const [formData, setFormData] = useState({
    idSaldoCuenta: '',
    idTipoMovimientoCXC: '',
    fechaMovimiento: '',
    valorMovimiento: '',
    valorMovimientoPagado: '',
    generadoAutomaticamente: false,
    descripcion: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const dialogRef = useRef(null);

  // Función para obtener los movimientos de cuenta
  const fetchMovimientos = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/movimiento-cuenta');
      const data = await response.json();
      setMovimientos(data);
    } catch (error) {
      console.error('Error fetching movimientos:', error);
    }
  };

  // useEffect para obtener los movimientos al cargar la página
  useEffect(() => {
    fetchMovimientos();
  }, []);

  // Función para abrir el diálogo
  const openDialog = (movimiento = null) => {
    if (movimiento) {
      setFormData(movimiento);
      setIsEditing(true);
    } else {
      setFormData({
        idSaldoCuenta: '',
        idTipoMovimientoCXC: '',
        fechaMovimiento: '',
        valorMovimiento: '',
        valorMovimientoPagado: '',
        generadoAutomaticamente: false,
        descripcion: '',
      });
      setIsEditing(false);
    }
    dialogRef.current.showModal();
  };

  // Función para cerrar el diálogo
  const closeDialog = () => {
    dialogRef.current.close();
    setIsEditing(false);
  };

  // Función para manejar el cambio en los inputs del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Función para crear o actualizar un movimiento de cuenta
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const url = isEditing
      ? `http://localhost:8081/api/movimiento-cuenta/${formData.idSaldoCuenta}`
      : 'http://localhost:8081/api/movimiento-cuenta';

    try {
      await fetch(url, requestOptions);
      alert(`Movimiento de cuenta ${isEditing ? 'actualizado' : 'creado'} con éxito`);
      closeDialog();
      fetchMovimientos();
    } catch (error) {
      console.error('Error al guardar el movimiento:', error);
      alert('Error al guardar el movimiento');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestión de Movimientos de Cuenta</h2>

      <button className="btn btn-success mb-4" onClick={() => openDialog()}>
        Crear Nuevo Movimiento
      </button>

      {/* Tabla para mostrar los movimientos de cuenta */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID Saldo Cuenta</th>
              <th>Tipo Movimiento</th>
              <th>Fecha Movimiento</th>
              <th>Valor Movimiento</th>
              <th>Valor Movimiento Pagado</th>
              <th>Generado Automáticamente</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov) => (
              <tr key={mov.Id_Saldo_Cuenta}>
                <td>{mov.Id_Saldo_Cuenta}</td>
                <td>{mov.idTipoMovimientoCXC}</td>
                <td>{new Date(mov.Fecha_Movimiento).toLocaleString()}</td>
                <td>{mov.valorMovimiento}</td>
                <td>{mov.Valor_Movimiento}</td>
                <td>{mov.Generado_Automaticamente ? 'Sí' : 'No'}</td>
                <td>{mov.Descripcion}</td>
                <td>
                  <button className="btn btn-warning mr-2" onClick={() => openDialog(mov)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Diálogo para crear/editar movimiento */}
      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <h5>{isEditing ? 'Editar Movimiento de Cuenta' : 'Crear Nuevo Movimiento'}</h5>
          <div className="form-group">
            <label>ID Saldo Cuenta:</label>
            <input
              type="number"
              className="form-control"
              name="idSaldoCuenta"
              value={formData.idSaldoCuenta}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>ID Tipo Movimiento CXC:</label>
            <input
              type="number"
              className="form-control"
              name="idTipoMovimientoCXC"
              value={formData.idTipoMovimientoCXC}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha Movimiento:</label>
            <input
              type="datetime-local"
              className="form-control"
              name="fechaMovimiento"
              value={formData.fechaMovimiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Valor Movimiento:</label>
            <input
              type="number"
              className="form-control"
              name="valorMovimiento"
              value={formData.valorMovimiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Valor Movimiento Pagado:</label>
            <input
              type="number"
              className="form-control"
              name="valorMovimientoPagado"
              value={formData.valorMovimientoPagado}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Generado Automáticamente:</label>
            <input
              type="checkbox"
              name="generadoAutomaticamente"
              checked={formData.generadoAutomaticamente}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={closeDialog}>
            Cancelar
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default MovimientoCuentaPage;