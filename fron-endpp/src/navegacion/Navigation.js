// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Blogs from './Blogs';
import FormularioUsuario from './FormularioUsuario';
import FormularioEmpresa from './FormularioEmpresa';
import ListaEmpresas from './ListaEmpresas';
import Usuarios from './Usuarios/Usuarios';
import Navigation from './Navigation';
import LoginAutenticacion from './LoginAutenticacion/LoginAutenticacion';
import ProtectedRoute from '../rutaProtegida/ProtectedRoute';
import RestrablecerContrasenia from '../RestablecerContrasenia/RestablecerContrasenia';
import CuentasCorrientes from '../Cuentacorriente/Cuentacorriente';
import CambiarContrasenia from '../CambiarContrasenia/CambiarContrasenia';
import Persona from '../Persona/Persona'
import ModuloList from '../Navbar/ModuloList';
import MenuList from '../Navbar/ModuloList';
import RoleList from '../gestionRoles/RoleList';
import UserRoleSelect from '../UsuarioRole/UserRoleSelect';

// <Route path='/RestrablecerContrasenia' element={<RestrablecerContrasenia/>} />
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginAutenticacion />} />
      <Route path='/RestrablecerContrasenia' element={<RestrablecerContrasenia/>} />
      <Route path="/" element={<ProtectedRoute><Navigation /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="about" element={<Blogs />} />
        <Route path="FormularioUsuario" element={<FormularioUsuario />} />
        <Route path="FormularioEmpresa" element={<FormularioEmpresa />} />
        <Route path="ListaEmpresas" element={<ListaEmpresas />} />
        <Route path="Usuarios" element={<Usuarios />} />
        <Route path="Persona" element={< Persona/>} />
        <Route path="CuentasCorrientes" element={<CuentasCorrientes />} />
        <Route path='/CambiarContrasenia' element={<CambiarContrasenia/>}/>
        <Route path="/modulos" element={<ModuloList />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/role" element={<RoleList />} />
        <Route path="/asignar-role" element={<UserRoleSelect />} />
      </Route>
    </Routes>
  );
}

export default App;
