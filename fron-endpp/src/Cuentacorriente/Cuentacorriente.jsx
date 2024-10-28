import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CuentasCorrientes() {
  const [cuentasCorrientes, setCuentasCorrientes] = useState([]);


  const [roleOpcion, setRoleOpcion] = useState(null); //agregar pagina
  
  
  const [formData, setFormData] = useState({
    idTipoDocumento: '',
    idPersona: '',
    noDocumento: '',
    idSaldoCuenta: '',
    saldoAnterior: 0.00,
    debitos: 0.00,
    creditos: 0.00,
    saldoFechaCreacion: '',
    saldoUsuarioCreacion: '',
    saldoFechaModificacion: '',
    saldoUsuarioModificacion: '',
    statusCuenta: '',
    tipoSaldoCuenta: '',
    fechaMovimiento: '',
    valorMovimiento: '',
    valorMovimientoPagado: '',
    generadoAutomaticamente: false,
    descripcion: '',
    tipoMovimientoCXC: '',
    operacionCuentaCorriente: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const dialogRef = useRef(null);

  
  
  
  useEffect(() => {
   
    fetchRoleOpcion(localStorage.getItem("userRole"), 'Empresas');
  }, []); // agregar pagina

  
  
  const fetchCuentaCorrienteByIds = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/cuentasCorrientes/${formData.idTipoDocumento}/${formData.idPersona}`);
      const data = await response.json();
      setCuentasCorrientes([data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const openDialog = (cuentaCorriente = null) => {
    if (cuentaCorriente) {
      setFormData(cuentaCorriente);
      setIsEditing(true);
    } else {
      setFormData({
        idTipoDocumento: '',
        idPersona: '',
        noDocumento: '',
        idSaldoCuenta: '',
        saldoAnterior: 0.00,
        debitos: 0.00,
        creditos: 0.00,
        saldoFechaCreacion: '',
        saldoUsuarioCreacion: '',
        saldoFechaModificacion: '',
        saldoUsuarioModificacion: '',
        statusCuenta: '',
        tipoSaldoCuenta: '',
        fechaMovimiento: '',
        valorMovimiento: '',
        valorMovimientoPagado: '',
        generadoAutomaticamente: false,
        descripcion: '',
        tipoMovimientoCXC: '',
        operacionCuentaCorriente: ''
      });
      setIsEditing(false);
    }
    dialogRef.current.showModal();
  };


  const closeDialog = () => {
    dialogRef.current.close();
    setFormData({
      idTipoDocumento: '',
      idPersona: '',
      noDocumento: '',
      idSaldoCuenta: '',
      saldoAnterior: 0.00,
      debitos: 0.00,
      creditos: 0.00,
      saldoFechaCreacion: '',
      saldoUsuarioCreacion: '',
      saldoFechaModificacion: '',
      saldoUsuarioModificacion: '',
      statusCuenta: '',
      tipoSaldoCuenta: '',
      fechaMovimiento: '',
      valorMovimiento: '',
      valorMovimientoPagado: '',
      generadoAutomaticamente: false,
      descripcion: '',
      tipoMovimientoCXC: '',
      operacionCuentaCorriente: ''
    });
    setIsEditing(false);
  };

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  
  const fetchRoleOpcion = async (idRole, nombreOpcion) => {
    try {
        const response = await fetch(`http://localhost:8081/api/role-opcion-por-nombre/`+idRole+`/`+nombreOpcion);
        const data = await response.json();
        setRoleOpcion(data);  // Actualizamos el estado con los datos recibidos
        console.log(data)
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('llegosi')
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      const url = isEditing
        ? `http://localhost:8081/api/cuentasCorrientes/${formData.idTipoDocumento}/${formData.idPersona}`
        : 'http://localhost:8081/api/cuentasCorrientes';
      await fetch(url, requestOptions);
      alert(`Cuenta corriente ${isEditing ? 'actualizada' : 'creada'} con éxito`);
      closeDialog();
      fetchCuentaCorrienteByIds();
    } catch (error) {
      console.error('Error al guardar la cuenta corriente:', error);
      alert('Error al guardar la cuenta corriente');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Crear Cuenta Corriente</h1>
  
    
      
      <div className="form-inline mb-3">
        <input
          type="number"
          className="form-control mr-2"
          placeholder="ID Tipo Documento"
          value={formData.idTipoDocumento}
          name="idTipoDocumento"
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mr-2"
          placeholder="ID Persona"
          value={formData.idPersona}
          name="idPersona"
          onChange={handleChange}
        />
        <button className="btn btn-primary" onClick={fetchCuentaCorrienteByIds}>Buscar</button>
      </div>

     { roleOpcion?.Alta===true&& (<button className="btn btn-success mb-3" onClick={() => openDialog()}>
        <i className="fas fa-plus"></i> Crear Nueva Cuenta
      </button>)}
      { roleOpcion?.Alta===false&& (<div><p>No tiene permisos de crear nuevas cuentas</p></div>)}

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID Tipo Documento</th>
              <th>ID Persona</th>
              <th>No Documento</th>
              <th>ID Saldo Cuenta</th>
              <th>Saldo Anterior</th>
              <th>Débitos</th>
              <th>Créditos</th>
              <th>Saldo Fecha Creación</th>
              <th>Saldo Usuario Creación</th>
              <th>Saldo Fecha Modificación</th>
              <th>Saldo Usuario Modificación</th>
              <th>Status Cuenta</th>
              <th>Tipo Saldo Cuenta</th>
              <th>Fecha Movimiento</th>
              <th>Valor Movimiento</th>
              <th>Valor Movimiento Pagado</th>
              <th>Generado Automáticamente</th>
              <th>Descripción</th>
              <th>Tipo Movimiento CXC</th>
              <th>Operación Cuenta Corriente</th>
            </tr>
          </thead>
          <tbody>
            {cuentasCorrientes.map(cuenta => (
              <tr key={cuenta.idTipoDocumento}>
                <td>{cuenta.idTipoDocumento}</td>
                <td>{cuenta.idPersona}</td>
                <td>{cuenta.noDocumento}</td>
                <td>{cuenta.idSaldoCuenta}</td>
                <td>{cuenta.saldoAnterior}</td>
                <td>{cuenta.debitos}</td>
                <td>{cuenta.creditos}</td>
                <td>{new Date(cuenta.saldoFechaCreacion).toLocaleString()}</td>
                <td>{cuenta.saldoUsuarioCreacion}</td>
                <td>{cuenta.saldoFechaModificacion ? new Date(cuenta.saldoFechaModificacion).toLocaleString() : 'N/A'}</td>
                <td>{cuenta.saldoUsuarioModificacion || 'N/A'}</td>
                <td>{cuenta.statusCuenta}</td>
                <td>{cuenta.tipoSaldoCuenta}</td>
                <td>{new Date(cuenta.fechaMovimiento).toLocaleString()}</td>
                <td>{cuenta.valorMovimiento}</td>
                <td>{cuenta.valorMovimientoPagado}</td>
                <td>{cuenta.generadoAutomaticamente ? 'Sí' : 'No'}</td>
                <td>{cuenta.descripcion}</td>
                <td>{cuenta.tipoMovimientoCXC}</td>
                <td>{cuenta.operacionCuentaCorriente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ID Tipo Documento:</label>
            <input type="number" className="form-control" name="idTipoDocumento" value={formData.idTipoDocumento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>ID Persona:</label>
            <input type="number" className="form-control" name="idPersona" value={formData.idPersona} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>No Documento:</label>
            <input type="text" className="form-control" name="noDocumento" value={formData.noDocumento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>id Saldo Cuenta:</label>
            <input type="text" className="form-control" name="idSaldoCuenta" value={formData.idSaldoCuenta} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>saldoAnterior:</label>
            <input type="text" className="form-control" name="saldoAnterior" value={formData.saldoAnterior} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>debitos:</label>
            <input type="text" className="form-control" name="debitos" value={formData.debitos} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>creditos:</label>
            <input type="text" className="form-control" name="creditos" value={formData.creditos} onChange={handleChange} required />
          </div>
          {/* Añadir el resto de campos, incluyendo los que faltaban */}
         
          <div className="form-group">
           <label>Saldo Fecha Creación:</label>
           <input type="datetime-local" className="form-control" name="saldoFechaCreacion" value={formData.saldoFechaCreacion} onChange={handleChange} required/>
          </div>
          
          <div className="form-group">
            <label>saldo Usuario Creacion:</label>
            <input type="text" className="form-control" name="saldoUsuarioCreacion" value={formData.saldoUsuarioCreacion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>saldoFechaModificacion:</label>
            <input type="datetime-local" className="form-control" name="saldoFechaModificacion" value={formData.saldoFechaModificacion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>saldoUsuarioModificacion:</label>
            <input type="text" className="form-control" name="saldoUsuarioModificacion" value={formData.saldoUsuarioModificacion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>statusCuenta:</label>
            <input type="number" className="form-control" name="statusCuenta" value={formData.statusCuenta} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>tipoSaldoCuenta:</label>
            <input type="number" className="form-control" name="tipoSaldoCuenta" value={formData.tipoSaldoCuenta} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>fechaMovimiento:</label>
            <input type="datetime-local" className="form-control" name="fechaMovimiento" value={formData.fechaMovimiento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>valorMovimiento:</label>
            <input type="number" className="form-control" name="valorMovimiento" value={formData.valorMovimiento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>valorMovimientoPagado:</label>
            <input type="number" className="form-control" name="valorMovimientoPagado" value={formData.valorMovimientoPagado} onChange={handleChange} required />
          </div>
  <div className="form-group">
  <label>Generado Automáticamente:</label>
  <select
    className="form-control"
    name="generadoAutomaticamente"
    value={formData.generadoAutomaticamente}
    onChange={handleChange}
    required
  >
    <option value={true}>Sí</option>
    <option value={false}>No</option>
  </select>
</div>
          <div className="form-group">
            <label>descripcion:</label>
            <input type="text" className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>tipoMovimientoCXC:</label>
            <input type="number" className="form-control" name="tipoMovimientoCXC" value={formData.tipoMovimientoCXC} onChange={handleChange} required />
          </div>
           <div className="form-group">
            <label>Operación Cuenta Corriente:</label>
            <input type="number" className="form-control" name="operacionCuentaCorriente" value={formData.operacionCuentaCorriente} onChange={handleChange} required />
          </div>
       <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">{isEditing ? 'Actualizar Cuenta' : 'Crear Cuenta'}</button>
            <button type="button" className="btn btn-secondary" onClick={closeDialog}>Cerrar</button>
          </div>
        </form>
      </dialog>
  
    </div>
  );//agregar tambien
}

export default CuentasCorrientes;