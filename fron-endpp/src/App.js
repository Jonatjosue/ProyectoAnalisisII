// App.js
import React, { useState, useContext } from "react";
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './agregaragencia/Home';
import About from './agregarprivlegios/privilegios';
import FormularioUsuario from './FormularioUsuario/FormularioUsuario';
import FormularioEmpresa from './EmpresaDetails/FormularioEmpresa';
import ListaEmpresas from './ListaEmpresas/ListaEmpresas';
import Usuarios from './Usuarios/Usuarios';
import { AuthProvider , AuthContext } from './autenticacion/AuthContext';
import ProtectedRoute from './rutaProtegida/ProtectedRoute';
import { LoginAutenticacion } from './LoginAuntenticacion/LoginAutenticacion';
import RestrablecerContrasenia from "./RestablecerContrasenia/RestablecerContrasenia";
import CuentaCorriente from './Cuentacorriente/Cuentacorriente'
import Persona from './Persona/Persona';
import CambiarContrasenia from "./CambiarContrasenia/CambiarContrasenia";
import ModuloList from "./Navbar/ModuloList";
import MenuList from "./Navbar/MenuList";
import OpcionList from "./Navbar/OpcionList";
import Genero from "./Genero/Genero";
import StatusUsuario from "./StatusUsuario/StatusUsuario";
import StatusCuentaComponent from "./StatusCuentaComponent/StatusCuentaComponent";
import EstadoCivil from "./EstadoCivil/EstadoCivil";

import RoleList from "./gestionRoles/RoleList";




function NavBar() {
  const {  authToken , logout } = useContext(AuthContext);
  const [showLinks, setShowLinks] = useState(true);

  const handleClick = () => {
    setShowLinks(false);
  };

  const logoutClick = () => {
    logout();
  };


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand">Cuenta corriente</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
    { authToken && (
            <ul className="navbar-nav">
            {showLinks ? (
             <>
               <li className="nav-link active" aria-current="page" ><Link to="/" onClick={handleClick}>Home</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/modulos" onClick={handleClick}>Gestión de Modulos</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/menu" onClick={handleClick}>Gestión de Menus</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/opcion" onClick={handleClick}>Gestión de Opciones</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/role" onClick={handleClick}>Gestión de Role</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/about" onClick={handleClick}>About</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/FormularioEmpresa" onClick={handleClick}>FormularioEmpresa</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/ListaEmpresas" onClick={handleClick}>ListaEmpresas</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/Usuarios" onClick={handleClick}>Usuarios</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/Persona" onClick={handleClick}>Persona</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/Genero" onClick={handleClick}>Genero</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/StatusUsuario" onClick={handleClick}>StatusUsuario</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/StatusCuentaComponent" onClick={handleClick}>StatusCuentaComponent</Link></li>
               <li className="nav-link active" aria-current="page" ><Link to="/EstadoCivil" onClick={handleClick}>EstadoCivil</Link></li>
               <li class="nav-link active" aria-current="page" ><Link to="/CambiarContrasenia">Cambiar Contraseña</Link></li>
             </>
           ) : (
             <li className="nav-link active" aria-current="page" ><Link to="/" onClick={() => setShowLinks(true)}>Home</Link></li>
           )}
           <li className="nav-link active" aria-current="page" ><Link to="/login" onClick={logoutClick}>Logout</Link></li>
           <li class="nav-link active" aria-current="page" ><Link to="/CuentaCorriente" onClick={handleClick}>Cuenta corriente</Link></li>
         </ul>
      )}
    </div>
  </div>
</nav>
  );
}


function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div>
        <Routes>
          <Route path="/login" element={<LoginAutenticacion />} />
          <Route path='/RestrablecerContrasenia' element={<RestrablecerContrasenia/>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/FormularioUsuario" element={<ProtectedRoute><FormularioUsuario /></ProtectedRoute>} />
          <Route path="/FormularioEmpresa" element={<ProtectedRoute><FormularioEmpresa /></ProtectedRoute>} />
          <Route path="/ListaEmpresas" element={<ProtectedRoute><ListaEmpresas /></ProtectedRoute>} />
          <Route path="/Usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
          <Route path="/Persona" element={<ProtectedRoute><Persona /></ProtectedRoute>} />
          <Route path="/CambiarContrasenia" element={<ProtectedRoute><CambiarContrasenia /></ProtectedRoute>} />
          <Route path="/CuentaCorriente" element={<ProtectedRoute> <CuentaCorriente /> </ProtectedRoute> } />
          <Route path="/modulos" element={<ProtectedRoute><ModuloList /></ProtectedRoute>} />
          <Route path="/menu" element={<ProtectedRoute><MenuList /></ProtectedRoute>} />
          <Route path="/opcion" element={<ProtectedRoute><OpcionList /></ProtectedRoute>} />
          <Route path="/Genero" element={<ProtectedRoute><Genero /></ProtectedRoute>} />
          <Route path="/StatusUsuario" element={<ProtectedRoute><StatusUsuario /></ProtectedRoute>} />
          <Route path="/StatusCuentaComponent" element={<ProtectedRoute><StatusCuentaComponent /></ProtectedRoute>} />
          <Route path="/EstadoCivil" element={<ProtectedRoute><EstadoCivil /></ProtectedRoute>} />
          <Route path="/role" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
