package proyecto_f1.backend.service.Usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.ClasesValidacion.validacion.RespuestaAutenticacion;
import proyecto_f1.backend.model.Usuario.*;
import proyecto_f1.backend.model.UsuarioPregunta.UsuarioPregunta;
import proyecto_f1.backend.repository.EmpresaRepository.EmpresaRepository;
import proyecto_f1.backend.repository.RespuestaRepository.RespuestaRepository;
import proyecto_f1.backend.repository.Usuario.*;
import proyecto_f1.backend.repository.UsuarioRoleRepository.UsuarioRoleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RespuestaRepository respuestaUsuarioRepo;

    @Autowired
    private EmpresaRepository empresaRepo;

    @Autowired
    private UsuarioRoleRepository usuarioRoleRepository;  // Repositorio para acceder a la relación UsuarioRole

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
            Long intentosParametros =  empresaRepo.findPasswordIntentosByIdUsuario(usuario.getIdUsuario()) ;

            if (passwordValida &&  usuario.getIntentosDeAcceso() < intentosParametros ) {
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
    
                usuarioRepository.save(usuario);  // Guarda los cambios
                return respuesta;
            }
    
        } else {
            // Si el usuario no existe
            respuesta.setrespuesta(false);
            respuesta.setdescripcion("Usuario no encontrado");
            return respuesta;
        }
    }
    
        

    public long obtenerRolPorUsername(String username) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(username);
        
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            
            Optional<UsuarioRole> usuarioRoleOpt = usuarioRoleRepository.findByIdUsuario(usuario.getIdUsuario().longValue());
            
            if (usuarioRoleOpt.isPresent()) {
                
                return usuarioRoleOpt.get().getIdRole();
            }
        }
    
        return 0;
    }

    public RespuestaAutenticacion validaRespuesta(String username, String correo , String respuestaUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(username);
        Optional<Usuario> usuarioCorreoOpt = usuarioRepository.findByCorreoElectronico(correo);
        
        RespuestaAutenticacion respuesta = new RespuestaAutenticacion(false, "Ocurrió un error");
    
        // Si el usuario existe
        if (usuarioOpt.isPresent() || usuarioCorreoOpt.isPresent()) {
            Usuario usuario = usuarioOpt.isPresent() ? usuarioOpt.get() : null;
            Usuario usuarioCorreo = usuarioCorreoOpt.isPresent() ? usuarioCorreoOpt.get() : null;

            if(usuario == null && usuarioCorreo == null) {
            respuesta.setdescripcion("esto es un error contactar con sistemas");
            return respuesta;};

            Usuario idUsuario = usuario != null ? usuario : usuarioCorreo;
            int noPregunta = idUsuario.getIdUsuario() != null ? idUsuario.getIntentosDeAcceso() : idUsuario.getIntentosDeAcceso();

            if(noPregunta < 3) noPregunta += 1; 
            else {
                respuesta.setrespuesta(false);
                respuesta.setdescripcion("Limite de preguntas alcanzado, contacte con su administrador para desbloquear su cuenta");
                return respuesta;
            };

            Optional<UsuarioPregunta> respuestaUser = respuestaUsuarioRepo.findByUsuarioAndOrdenPregunta(idUsuario, noPregunta);
            UsuarioPregunta respuestaBase = respuestaUser.get();

            // Verifica si la contraseña es correcta
            if (respuestaBase.getRespuesta().equals(respuestaUsuario) &&  noPregunta <= 3) {
                respuesta.setrespuesta(true);
                respuesta.setdescripcion("Usuario logueado correctamente");
    
                // Reinicia los intentos de acceso al loguear correctamente
                idUsuario.setIntentosDeAcceso(0);
                usuarioRepository.save(idUsuario); 
                return respuesta;
            } else {
                // Contraseña incorrecta, incrementa intentos de acceso
                int intentos = idUsuario.getIntentosDeAcceso() + 1;
                idUsuario.setIntentosDeAcceso(intentos);
    
                // Bloquea al usuario si ha fallado más de 3 veces
                if (intentos > 3) {
                    respuesta.setrespuesta(false);
                    respuesta.setdescripcion("Usuario bloqueado después de 3 intentos fallidos");
                } else {
                    respuesta.setrespuesta(false);
                    respuesta.setdescripcion("Respuesta incorrecta, intente nuevamente. Intentos: " + intentos);
                }
    
                usuarioRepository.save(idUsuario);  // Guarda los cambios
                return respuesta;
            }
    
        } else {
            // Si el usuario no existe
            respuesta.setrespuesta(false);
            respuesta.setdescripcion("Usuario o Correo Electronico no encontrado");
            return respuesta;
        }
    }
}
