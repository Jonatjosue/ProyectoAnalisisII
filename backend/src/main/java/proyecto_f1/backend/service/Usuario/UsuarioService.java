package proyecto_f1.backend.service.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.ClasesValidacion.validacion;
import proyecto_f1.backend.ClasesValidacion.validacion.OpcionesMenuUsuario;
import proyecto_f1.backend.ClasesValidacion.validacion.PreguntasUsuarioRecuperacion;
import proyecto_f1.backend.ClasesValidacion.validacion.RespuestaAutenticacion;
import proyecto_f1.backend.ClasesValidacion.validacion.RespuestaAutenticacionPregunta;
import proyecto_f1.backend.ClasesValidacion.validacion.preguntasUsuarioRecuperaciones;
import proyecto_f1.backend.ClasesValidacion.validacion.recuperar;
import proyecto_f1.backend.ClasesValidacion.validacion.repuestasInvalidas;
import proyecto_f1.backend.ClasesValidacion.validacion.respuesta;
import proyecto_f1.backend.model.Usuario.*;
import proyecto_f1.backend.repository.EmpresaRepository.EmpresaRepository;
import proyecto_f1.backend.repository.RespuestaRepository.RespuestaRepository;
import proyecto_f1.backend.repository.Usuario.*;
import proyecto_f1.backend.repository.UsuarioRoleRepository.UsuarioRoleRepository;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class UsuarioService {

    private static final List<PreguntasUsuarioRecuperacion> noUsuario = new ArrayList<>();

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RespuestaRepository respuestaUsuarioRepo;

    @Autowired
    private EmpresaRepository empresaRepo;

    @Autowired
    private UsuarioRoleRepository usuarioRoleRepository; // Repositorio para acceder a la relación UsuarioRole

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> obtenerUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerUsuarioPorId(Long idUsuario) {
        return usuarioRepository.findById(idUsuario);
    }

    public Usuario actualizarUsuario(Long idUsuario, Usuario usuarioDetalles) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElseThrow();
        usuario.setNombre(usuarioDetalles.getNombre());
        usuario.setApellido(usuarioDetalles.getApellido());
        usuario.setCorreoElectronico(usuarioDetalles.getCorreoElectronico());
        usuario.setTelefonoMovil(usuarioDetalles.getTelefonoMovil());
        // Actualiza el resto de los campos según sea necesario
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    public RespuestaAutenticacion validaCredenciales(String username, String password) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(username);

        RespuestaAutenticacion respuesta = new RespuestaAutenticacion(false, "Ocurrió un error");

        // Si el usuario existe
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            boolean passwordValida = usuario.getPassword().equals(password);

            // Verifica si la contraseña es correcta
            Long intentosParametros = empresaRepo.findPasswordIntentosByIdUsuario(usuario.getIdUsuario());

            if (passwordValida && usuario.getIntentosDeAcceso() < intentosParametros) {
                respuesta.setrespuesta(true);
                respuesta.setdescripcion("Usuario logueado correctamente");

                // Reinicia los intentos de acceso al loguear correctamente
                usuario.setIntentosDeAcceso(0);
                usuarioRepository.save(usuario);
                return respuesta;
            } else {
                // Contraseña incorrecta, incrementa intentos de acceso
                int intentos = usuario.getIntentosDeAcceso() + 1;
                usuario.setIntentosDeAcceso(intentos);

                // Bloquea al usuario si ha fallado más de 3 veces
                if (intentos >= 3) {
                    respuesta.setrespuesta(false);
                    respuesta.setdescripcion("Usuario bloqueado después de 3 intentos fallidos");
                } else {
                    respuesta.setrespuesta(false);
                    respuesta.setdescripcion("Contraseña incorrecta, intente nuevamente. Intentos: " + intentos);
                }

                usuarioRepository.save(usuario); // Guarda los cambios
                return respuesta;
            }

        } else {
            // Si el usuario no existe
            respuesta.setrespuesta(false);
            respuesta.setdescripcion("Usuario no encontrado");
            return respuesta;
        }
    }

    // Corrección del método para obtener el rol por username
    /*
    public long obtenerRolPorUsername(String username) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(username);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            // Cambiamos Optional por List
            List<UsuarioRole> usuarioRoles = usuarioRoleRepository.findByIdUsuario(usuario.getIdUsuario());

            // Si la lista no está vacía, devolvemos el primer rol (o aplicamos la lógica
            // que necesites)
            if (!usuarioRoles.isEmpty()) {
                return usuarioRoles.get(0).getIdRole(); // Asume que el usuario tiene al menos un rol
            }
        }

        return 0; // Devuelve 0 si no hay roles
    }
        */

    public List<UsuarioRole> obtenerRolPorUsername(String username) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(username);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            List<UsuarioRole> usuarioRoles = usuarioRoleRepository.findByIdUsuario(usuario.getIdUsuario());

            if (!usuarioRoles.isEmpty()) {
                return usuarioRoles;
            }
            System.out.println("El usuario con id "+usuario.getIdUsuario()+" no cuenta con ningún role asignado.");

        }

        return null;
    }

    public RespuestaAutenticacionPregunta validaRespuesta(String username, String correo,
            List<respuesta> respuestaUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(username);
        Optional<Usuario> usuarioCorreoOpt = usuarioRepository.findByCorreoElectronico(correo);
        int cuentaCantidadRespuestasValidas = 0;
        RespuestaAutenticacionPregunta respuesta = new RespuestaAutenticacionPregunta(false, "Ocurrió un error", null);
        List<repuestasInvalidas> invalidas = new ArrayList<>();

        // Si el usuario existe
        if (usuarioOpt.isPresent() || usuarioCorreoOpt.isPresent()) {
            Usuario usuario = usuarioOpt.orElse(null);
            Usuario usuarioCorreo = usuarioCorreoOpt.orElse(null);

            if (usuario == null && usuarioCorreo == null) {
                respuesta.setdescripcion("Esto es un error, contactar con sistemas");
                respuesta.setrespuesta(false);
                respuesta.setListrespuestas(invalidas);
                return respuesta;
            }

            Usuario idUsuario = (usuario != null) ? usuario : usuarioCorreo;
            int noPregunta = idUsuario.getSiguientePreguntaAcceso();
            Long intentosParametros = empresaRepo.findPasswordIntentosByIdUsuario(usuario.getIdUsuario());
            int cantidadPreguntasSerValidas = empresaRepo
                    .findCantidadPreguntasValidarByIdUsuario(usuario.getIdUsuario());

            if (noPregunta > intentosParametros) {
                respuesta.setrespuesta(false);
                respuesta.setdescripcion(
                        "Límite de intentos de preguntas alcanzado. Contacte con su administrador para desbloquear su cuenta.");
                respuesta.setListrespuestas(invalidas);
                return respuesta;
            }

            // Verifica si la contraseña es correcta
            if (noPregunta <= intentosParametros) {
                for (int i = 0; i < respuestaUsuario.size(); i++) {
                    repuestasInvalidas respuestasInvalidasInstancia = new repuestasInvalidas();

                    int value = respuestaUsuarioRepo.findrepuestaPreguntaRecuperacion(
                            idUsuario.getIdUsuario().intValue(),
                            respuestaUsuario.get(i).getIdrespuesta(), respuestaUsuario.get(i).getrespuesta());

                    cuentaCantidadRespuestasValidas += value;
                    boolean aux = (value != 0);

                    respuestasInvalidasInstancia.setvalida(aux);
                    respuestasInvalidasInstancia.setidRespuesta(respuestaUsuario.get(i).getIdrespuesta());
                    respuestasInvalidasInstancia.setrespuesta(respuestaUsuario.get(i).getrespuesta());
                    invalidas.add(respuestasInvalidasInstancia);
                }

                if (cuentaCantidadRespuestasValidas >= cantidadPreguntasSerValidas) {
                    respuesta.setrespuesta(true);
                    respuesta.setdescripcion("Usuario logueado correctamente");
                    respuesta.setListrespuestas(invalidas);

                    // Reinicia los intentos de acceso al loguear correctamente
                    idUsuario.setSiguientePreguntaAcceso(1);
                    usuarioRepository.save(idUsuario);
                    return respuesta;
                } else {
                    return returnValorRespuesta(idUsuario, respuesta, invalidas);
                }
            } else {
                return returnValorRespuesta(idUsuario, respuesta, invalidas);
            }
        } else {
            respuesta.setrespuesta(false);
            respuesta.setdescripcion("Usuario o correo electrónico no encontrado");
            return respuesta;
        }
    }

    public RespuestaAutenticacionPregunta returnValorRespuesta(Usuario idUsuario,
            RespuestaAutenticacionPregunta respuesta, List<repuestasInvalidas> returnInvalidas) {
        int intentos = idUsuario.getSiguientePreguntaAcceso() + 1;
        idUsuario.setSiguientePreguntaAcceso(intentos);

        // Bloquea al usuario si ha fallado más de 3 veces
        respuesta.setrespuesta(false);
        respuesta.setdescripcion("Respuesta incorrecta, intente nuevamente. Intentos: " + (intentos - 1));
        respuesta.setListrespuestas(returnInvalidas);

        usuarioRepository.save(idUsuario); // Guarda los cambios
        return respuesta;
    }

    public List<PreguntasUsuarioRecuperacion> metodoPreguntas(recuperar idUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(idUsuario.getUsername());
        Optional<Usuario> usuarioCorreoOpt = usuarioRepository.findByCorreoElectronico(idUsuario.getcorreo());
        Usuario usuario = usuarioOpt.orElse(null);
        Usuario usuarioCorreo = usuarioCorreoOpt.orElse(null);

        if (usuario == null && usuarioCorreo == null) {
            return noUsuario;
        }
        Usuario usuarioPresent = (usuario != null) ? usuario : usuarioCorreo;

        return usuarioRepository.findPreguntasRecuperacion(usuarioPresent.getIdUsuario());
    }
    public List<OpcionesMenuUsuario> obtenerPermisosOpciones(Long idUsuario) {
        return usuarioRepository.obtenerPermisosOpciones(idUsuario);
    }


   
    public void setNewPassword(String newPassword) throws Exception {
        // Obtener el contexto de seguridad
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication != null ) {
            Usuario userDetails = (Usuario)authentication.getPrincipal();
            String nombreUsuario = userDetails.getNombre(); // Obtener el nombre del usuario
            
            // Busca al usuario por nombre
            Optional<Usuario> usuarioOptional = usuarioRepository.findByNombre(nombreUsuario);
            
            // Verifica si el usuario existe
            if (usuarioOptional.isPresent()) {
                Usuario usuario = usuarioOptional.get();

                // Aquí puedes establecer la nueva contraseña
                usuario.setPassword(newPassword);
                
                // Guarda los cambios en el repositorio
                usuarioRepository.save(usuario);
            } else {
                // Manejo del caso en que el usuario no se encuentra
                throw new UsernameNotFoundException("Usuario no encontrado");
            }
        } else {
            // Manejo de caso en que no hay autenticación
            throw new Exception("No autenticado");
        }
    }

}