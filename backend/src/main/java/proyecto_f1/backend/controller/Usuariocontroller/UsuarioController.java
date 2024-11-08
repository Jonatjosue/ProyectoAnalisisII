package proyecto_f1.backend.controller.Usuariocontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto_f1.backend.service.Usuario.*;
import proyecto_f1.backend.model.Usuario.*;
import proyecto_f1.backend.ClasesValidacion.validacion;
import proyecto_f1.backend.ClasesValidacion.validacion.OpcionesMenuUsuario;
import proyecto_f1.backend.ClasesValidacion.validacion.PreguntasUsuarioRecuperacion;
import proyecto_f1.backend.ClasesValidacion.validacion.RespuestaAutenticacion;
import proyecto_f1.backend.ClasesValidacion.validacion.RespuestaAutenticacionPregunta;
import proyecto_f1.backend.ClasesValidacion.jwtValida;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/Usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.crearUsuario(usuario);
    }

    @GetMapping("/All")
    public List<Usuario> obtenerUsuarios() {
        System.out.println("Llego");
        return usuarioService.obtenerUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        return usuarioService.obtenerUsuarioPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getRole/{username}")
    public List<UsuarioRole> getRole(@PathVariable String username) {
        return usuarioService.obtenerRolPorUsername(username);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetalles) {
        return ResponseEntity.ok(usuarioService.actualizarUsuario(id, usuarioDetalles));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }
    

    @PostMapping("/login")
    public ResponseEntity<validacion.AuthResponse> login(@RequestBody validacion.LoginRequest loginRequest) {

        RespuestaAutenticacion respuesta = usuarioService.validaCredenciales(loginRequest.getUsername(), loginRequest.getPassword());

        if (respuesta.getrespuesta()) {
            // Genera un token JWT
            String token =  respuesta.getdescripcion().equals("REQUIERE_CAMBIO") ? "REQUIERE_CAMBIO" 
                            : jwtValida.generateToken(loginRequest.getUsername());

            ArrayList<UsuarioRole> roldeFault = new ArrayList<>();
            UsuarioRole usuarioRole = new UsuarioRole();
            usuarioRole.setIdRole(0L);
            roldeFault.add(usuarioRole);
            // Obtener el rol del usuario
            List <UsuarioRole> roles =  respuesta.getdescripcion().equals("REQUIERE_CAMBIO")  ?   roldeFault
             :usuarioService.obtenerRolPorUsername(loginRequest.getUsername());


            // Devuelve el token y el rol en la respuesta
            return ResponseEntity.ok(new validacion.AuthResponse(token, roles, respuesta));
        } else {
            return ResponseEntity.ok(new validacion.AuthResponse("invalido", null, respuesta));
        }
    }

    @PostMapping("/recuperarCuenta")
    public ResponseEntity<validacion.PreguntaResponse> recuperarCuenta(
            @RequestBody validacion.recuperar recuperarCuenta) {
        RespuestaAutenticacionPregunta respuesta = new RespuestaAutenticacionPregunta(false, null, null);
        respuesta = usuarioService.validaRespuesta(recuperarCuenta.getUsername(), recuperarCuenta.getcorreo(),
                recuperarCuenta.getrespuestas());
        // System.out.println(respuesta.getClass().);
        if (respuesta.getrespuesta()) {
            // Genera un token JWT
            String token = jwtValida.generateToken(recuperarCuenta.getUsername());

            // Obtener el rol del usuario
            // long role =
            // usuarioService.obtenerRolPorUsername(recuperarCuenta.getUsername());

            // Devuelve el token y el rol en la respuesta
            return ResponseEntity.ok(new validacion.PreguntaResponse(token, -1, respuesta)); // Asegúrate de pasar ambos
            // argumentos
            // TO DO : revisar el role
        } else {
            return ResponseEntity.ok(new validacion.PreguntaResponse("invalido", 0, respuesta));
        }
    }

    @PostMapping("/obtienePreguntas")
    public ResponseEntity<List<PreguntasUsuarioRecuperacion>> obtienePreguntas(@RequestBody validacion.recuperar id) {
        return ResponseEntity.ok(usuarioService.metodoPreguntas(id));
    }

@PostMapping("/setNewPassword")
public ResponseEntity<String> postMethodName(@RequestBody PasswordRequest nesPassword) throws Exception {
    
    usuarioService.setNewPassword(nesPassword.getNesPassword());

    return ResponseEntity.ok( "nueva contraseña establecida");
}


    @GetMapping("/opcionesUsuario")
    public ResponseEntity<List<OpcionesMenuUsuario>>obtenerOpciones(@RequestParam Long idUsuario, Long idRole) {
        List<OpcionesMenuUsuario> permisos =  usuarioService.obtenerPermisosOpciones(idUsuario, idRole);
        return ResponseEntity.ok(permisos);
    }

    public static class PasswordRequest {
        private String nesPassword;
    
        // Getter y setter
        public String getNesPassword() {
            return nesPassword;
        }
    
        public void setNesPassword(String nesPassword) {
            this.nesPassword = nesPassword;
        }
    }
    
    

}
