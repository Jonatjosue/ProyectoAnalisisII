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
import RoleList from "./gestionRoles/RoleList";
import TipoDocumentoPage from "./TipoDocumentoPage/TipoDocumentoPage";

// Simulando los permisos para cada ruta
const permisos = {
  FormularioUsuario: 1, 
  FormularioEmpresa: 1,
  ListaEmpresas: 1,
  Usuarios: 1,
  Persona: 1,
  CuentaCorriente: 1,
  CambiarContrasenia: 1,
  TipoDocumentoPage: 1
};

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
          {authToken && (
            <ul className="navbar-nav">
              {showLinks ? (
                <>
                 { permisos.FormularioEmpresa === 1 &&(
                   <li className="nav-link active" aria-current="page"><Link to="/" onClick={handleClick}>Home</Link></li>)}
                 { permisos.FormularioEmpresa === 1 &&(

                  <li className="nav-link active" aria-current="page" ><Link to="/modulos" onClick={handleClick}>Gestión de Modulos</Link></li>
                 )}
                {permisos.FormularioEmpresa === 1 &&(
                  <li className="nav-link active" aria-current="page" ><Link to="/menu" onClick={handleClick}>Gestión de Menus</Link></li>
                )}
               {permisos.FormularioEmpresa === 1 &&(
                 <li className="nav-link active" aria-current="page" ><Link to="/opcion" onClick={handleClick}>Gestión de Opciones</Link></li>
               )}
               {permisos.FormularioEmpresa === 1 &&(
               <li className="nav-link active" aria-current="page" ><Link to="/role" onClick={handleClick}>Gestión de Role</Link></li>
                )}
               {( permisos.FormularioEmpresa === 1 && 
                   <li className="nav-link active" aria-current="page"><Link to="/about" onClick={handleClick}>About</Link></li>
                )}
                  {/* Condicionales para mostrar/enlazar las rutas según permisos */}
                  {permisos.FormularioEmpresa === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/FormularioEmpresa" onClick={handleClick}>FormularioEmpresa</Link></li>
                  )}
                  {permisos.ListaEmpresas === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/ListaEmpresas" onClick={handleClick}>ListaEmpresas</Link></li>
                  )}
                  {permisos.Usuarios === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/Usuarios" onClick={handleClick}>Usuarios</Link></li>
                  )}
                  {permisos.Persona === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/Persona" onClick={handleClick}>Persona</Link></li>
                  )}
                  {permisos.CambiarContrasenia === 1 && (
                    <li className="nav-link active" aria-current="page" ><Link to="/Genero" onClick={handleClick}>Genero</Link></li>
                 )}
                  {permisos.CuentaCorriente === 1 && (
                     <li className="nav-link active" aria-current="page" ><Link to="/StatusUsuario" onClick={handleClick}>StatusUsuario</Link></li>
                    )}
                  {permisos.CuentaCorriente === 1 && (
                     <li className="nav-link active" aria-current="page"><Link to="/CambiarContrasenia">Cambiar Contraseña</Link></li>
                    )}
                  {permisos.CuentaCorriente === 1 && (
                    <li className="nav-link active" aria-current="page"><Link to="/CuentaCorriente" onClick={handleClick}>Cuenta corriente</Link></li>
                  )}
                  {permisos.TipoDocumentoPage &&(
                    <li class="nav-link active" aria-current="page" ><Link to="/TipoDocumentoPage">TipoDocumentoPage</Link></li>
                  )}
                </>
              ) : (
                <li className="nav-link active" aria-current="page"><Link to="/" onClick={() => setShowLinks(true)}>Home</Link></li>
              )}
              <li className="nav-link active" aria-current="page"><Link to="/login" onClick={logoutClick}>Logout</Link></li>
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
          
          {/* Condicionales para las rutas basadas en permisos */}
          {permisos.FormularioUsuario === 1 && (
            <Route path="/FormularioUsuario" element={<ProtectedRoute><FormularioUsuario /></ProtectedRoute>} />
          )}
          {permisos.FormularioEmpresa === 1 && (
            <Route path="/FormularioEmpresa" element={<ProtectedRoute><FormularioEmpresa /></ProtectedRoute>} />
          )}
          {permisos.ListaEmpresas === 1 && (
            <Route path="/ListaEmpresas" element={<ProtectedRoute><ListaEmpresas /></ProtectedRoute>} />
          )}
          {permisos.Usuarios === 1 && (
            <Route path="/Usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
          )}
          {permisos.Persona === 1 && (
            <Route path="/Persona" element={<ProtectedRoute><Persona /></ProtectedRoute>} />
          )}
          {permisos.CambiarContrasenia === 1 && (
            <Route path="/CambiarContrasenia" element={<ProtectedRoute><CambiarContrasenia /></ProtectedRoute>} />
          )}
          {permisos.CuentaCorriente === 1 && (
            <Route path="/CuentaCorriente" element={<ProtectedRoute><CuentaCorriente /> </ProtectedRoute>} />
          )}

          {permisos.CuentaCorriente === 1 && (
            <Route path="/TipoDocumentoPage" element={<ProtectedRoute> <TipoDocumentoPage /> </ProtectedRoute> } />
          )}
          {permisos.CuentaCorriente === 1 && (
            <Route path="/modulos" element={<ProtectedRoute><ModuloList /></ProtectedRoute>} />
          )}
           {permisos.CuentaCorriente === 1 && (
             <Route path="/menu" element={<ProtectedRoute><MenuList /></ProtectedRoute>} />
          )}
           {permisos.CuentaCorriente === 1 && (
              <Route path="/opcion" element={<ProtectedRoute><OpcionList /></ProtectedRoute>} />
          )}
         
         {permisos.CuentaCorriente === 1 && (
              <Route path="/role" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
          )}
           {permisos.CuentaCorriente === 1 && (
              <Route path="/Genero" element={<ProtectedRoute><Genero /></ProtectedRoute>} />
          )}
            {permisos.CuentaCorriente === 1 && (
              <Route path="/StatusUsuario" element={<ProtectedRoute><StatusUsuario /></ProtectedRoute>} />
          )}
            {permisos.CuentaCorriente === 1 && (
             <Route path="/role" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
          )}
          
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
