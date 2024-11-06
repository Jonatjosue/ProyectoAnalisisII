import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./agregaragencia/Home";
import FormularioUsuario from "./FormularioUsuario/FormularioUsuario";
import FormularioEmpresa from "./EmpresaDetails/FormularioEmpresa";
import ListaEmpresas from "./ListaEmpresas/ListaEmpresas";
import Usuarios from "./Usuarios/Usuarios";
import { AuthProvider, AuthContext } from "./autenticacion/AuthContext";
import ProtectedRoute from "./rutaProtegida/ProtectedRoute";
import LoginAutenticacion from './LoginAuntenticacion/LoginAutenticacion';
import RestrablecerContrasenia from "./RestablecerContrasenia/RestablecerContrasenia";
import CuentaCorriente from "./Cuentacorriente/Cuentacorriente";
import Persona from "./Persona/Persona";
import CambiarContrasenia from "./CambiarContrasenia/CambiarContrasenia";
import RoleList from "./gestionRoles/RoleList";
import UserRoleSelect from "./UsuarioRole/UserRoleSelect";
import ModuloList from "./Navbar/ModuloList";
import MenuList from "./Navbar/MenuList";
import OpcionList from "./Navbar/OpcionList";
import TipoDocumentoPage from "./TipoDocumentoPage/TipoDocumentoPage";
import Genero from "./Genero/Genero";
import StatusUsuario from "./StatusUsuario/StatusUsuario"
import axiosInstance from "./axiosConfig";
import StatusCuentaComponent from "./StatusCuentaComponent/StatusCuentaComponent";
import EstadoCivil from "./EstadoCivil/EstadoCivil";
import TipoDocumento from "./TipoDocumento/TipoDocumento";
import SucursalList from "./SucursalList/SucursalList";
import SaldoCuentaPage from "./SaldoCuentaPage/SaldoCuentaPage";
import MovimientoCuentaPage from "./MovimientoCuentaPage/MovimientoCuentaPage";
import RoleOpcionList from "./RoleOpcion/RoleOpcionList";




function NavBar() {
  const { authToken, logout } = useContext(AuthContext);
  const [modules, setModules] = useState([]);
  const [menus, setMenus] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const usuario = localStorage.getItem('username');
    console.log('este es el rol: ' + role);
    if (!role || !usuario) {
      console.error("Role or username not found in localStorage.");
      return;
    }

    const fetchModules = async () => {
      try {
        const response = await axiosInstance.get(`/modulos?usuario=${usuario}&role=${role}`);
        if (response.status >= 200 && response.status < 300) {
          setModules(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch modules");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchMenus = async () => {
      try {
        const response = await axiosInstance.get(`/menu?usuario=${usuario}&role=${role}`);
        if (response.status >= 200 && response.status < 300) {
          setMenus(response.data);
        } else {
          console.error("Failed to fetch menus");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchOptions = async () => {
      try {
        const response = await axiosInstance.get(`/opciones?usuario=${usuario}&role=${role}`);
        if (response.status >= 200 && response.status < 300) {
          setOptions(response.data);
        } else {
          console.error("Failed to fetch options");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchModules();
    fetchMenus();
    fetchOptions();
  }, [authToken]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectedMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (menuId) => {
    setSelectedMenu(selectedMenu === menuId ? null : menuId);
  };

  const handleOptionClick = (page) => {
    navigate(page);
    setSelectedMenu(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">Cuenta corriente</span>
        <div className="collapse navbar-collapse" id="navbarNav">
          {authToken && (
            <ul className="navbar-nav" ref={menuRef}>
              {modules.map((module) => (
                <li key={module.idModulo} className="nav-item dropdown">
                  <button
                    className="nav-link btn btn-link dropdown-toggle"
                    onClick={() => handleMenuClick(module.idModulo)}
                  >
                    {module.nombre}
                  </button>
                  <ul
                    className={`dropdown-menu dropdown-grid ${selectedMenu === module.idModulo ? "show" : ""}`}
                  >
                    {menus
                      .filter((menu) => menu.idModulo === module.idModulo)
                      .map((filteredMenu) => (
                        <li className="dropdown-item" key={filteredMenu.idMenu}>
                          <button
                            className="dropdown-toggle btn"
                            onClick={() => handleMenuClick(filteredMenu.idMenu)}
                          >
                            {filteredMenu.nombre}
                          </button>
                          <ul
                            className={`dropdown-menu ${selectedMenu === filteredMenu.idMenu ? "show" : ""}`}
                          >
                            {options
                              .filter((option) => option.idMenu === filteredMenu.idMenu)
                              .map((option) => (
                                <li key={option.idOpcion}>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleOptionClick(option.pagina)}
                                  >
                                    {option.nombre}
                                  </button>
                                </li>
                              ))}
                          </ul>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={logout}>
                  Logout
                </button>
              </li>
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
          <Route path="/gestion-empresas" element={<ProtectedRoute><ListaEmpresas /></ProtectedRoute>} />
          <Route path="/gestion-generos" element={<ProtectedRoute><Genero /></ProtectedRoute>} />
          <Route path="/gestion-estatus" element={<ProtectedRoute><StatusUsuario /></ProtectedRoute>} />
          <Route path="/gestion-roles" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
          <Route path="/gestion-modulos" element={<ProtectedRoute><ModuloList /></ProtectedRoute>} />
          <Route path="/gestion-menus" element={<ProtectedRoute><MenuList /></ProtectedRoute>} />
          <Route path="/gestion-opciones" element={<ProtectedRoute><OpcionList /></ProtectedRoute>} />
          <Route path="/gestion-usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
          <Route path="/asignar-roles" element={<ProtectedRoute><UserRoleSelect /></ProtectedRoute>} />
          <Route path="/login" element={<LoginAutenticacion />} />
          <Route path='/RestrablecerContrasenia' element={<RestrablecerContrasenia />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/FormularioUsuario" element={<ProtectedRoute><FormularioUsuario /></ProtectedRoute>} />
          <Route path="/FormularioEmpresa" element={<ProtectedRoute><FormularioEmpresa /></ProtectedRoute>} />
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
          <Route path="/TipoDocumento" element={<ProtectedRoute><TipoDocumento /></ProtectedRoute>} />
          <Route path="/SucursalList" element={<ProtectedRoute><SucursalList /></ProtectedRoute>} />
          <Route path="/role" element={<ProtectedRoute><RoleList /></ProtectedRoute>} />
          <Route path="/SaldoCuentaPage" element={<ProtectedRoute> <SaldoCuentaPage /> </ProtectedRoute> } />
          <Route path="/MovimientoCuentaPage" element={<ProtectedRoute> <MovimientoCuentaPage /> </ProtectedRoute> } />
          <Route path="/CuentaCorriente" element={<ProtectedRoute><CuentaCorriente /></ProtectedRoute>} />
          <Route path="/gestion-documentos" element={<ProtectedRoute><TipoDocumentoPage /></ProtectedRoute>} />
          <Route path="/gestion-role-opcion" element={<ProtectedRoute><RoleOpcionList /></ProtectedRoute>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
