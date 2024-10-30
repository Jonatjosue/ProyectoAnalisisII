package proyecto_f1.backend.controller.UsuarioRoleController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto_f1.backend.model.Usuario.UsuarioRole;
import proyecto_f1.backend.model.Usuario.UsuarioRoleId;
import proyecto_f1.backend.service.UsuarioRoleService.UsuarioRoleService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuario-role")
public class UsuarioRoleController {

    private final UsuarioRoleService usuarioRoleService;

    @Autowired
    public UsuarioRoleController(UsuarioRoleService usuarioRoleService) {
        this.usuarioRoleService = usuarioRoleService;
    }

    @PostMapping
    public ResponseEntity<UsuarioRole> createUsuarioRole(@RequestBody UsuarioRole usuarioRole) {
        UsuarioRole createdUsuarioRole = usuarioRoleService.createUsuarioRole(usuarioRole);
        return new ResponseEntity<>(createdUsuarioRole, HttpStatus.CREATED);
    }

    @PutMapping("/{idUsuario}/{idRole}")
    public ResponseEntity<UsuarioRole> updateUsuarioRole(
            @PathVariable Long idUsuario,
            @PathVariable Long idRole,
            @RequestBody UsuarioRole usuarioRole) {
        UsuarioRole updatedUsuarioRole = usuarioRoleService.updateUsuarioRole(idUsuario, idRole, usuarioRole);
        return new ResponseEntity<>(updatedUsuarioRole, HttpStatus.OK);
    }


    /*@Autowired
    private UsuarioRoleService usuarioRoleService;

    //Obtener todas las relaciones Usuario-Rol
    @GetMapping
    public List<UsuarioRole> getAllUsuarioRoles() {
        return usuarioRoleService.getAllUsuarioRoles();
    }

    // Obtener todas las relaciones Usuario-Rol para un usuario específico por
    // idUsuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<UsuarioRole>> getUsuarioRolesByUsuarioId(
            @PathVariable Long idUsuario) {
        List<UsuarioRole> usuarioRoles = usuarioRoleService.getUsuarioRolesByUsuarioId(idUsuario);
        if (usuarioRoles.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioRoles);
    }

    // Obtener una relación Usuario-Rol específica por ID compuesto
    @GetMapping("/{idUsuario}/{idRole}")
    public ResponseEntity<UsuarioRole> getUsuarioRoleById(
            @PathVariable Long idUsuario, @PathVariable Long idRole) {
        UsuarioRoleId id = new UsuarioRoleId(idUsuario, idRole);
        Optional<UsuarioRole> usuarioRole = usuarioRoleService.getUsuarioRoleById(id);
        return usuarioRole.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear una nueva relación Usuario-Rol
    @PostMapping
    public ResponseEntity<UsuarioRole> createUsuarioRole(@RequestBody UsuarioRole usuarioRole) {
        UsuarioRole newUsuarioRole = usuarioRoleService.createUsuarioRole(usuarioRole);
        return ResponseEntity.ok(newUsuarioRole);
    }

    // Actualizar una relación Usuario-Rol existente
    @PutMapping("/{idUsuario}/{idRole}")
    public ResponseEntity<UsuarioRole> updateUsuarioRole(
            @PathVariable Long idUsuario, @PathVariable Long idRole,
            @RequestBody UsuarioRole usuarioRoleDetails) {
        UsuarioRoleId id = new UsuarioRoleId(idUsuario, idRole);
        Optional<UsuarioRole> usuarioRole = usuarioRoleService.getUsuarioRoleById(id);

        if (usuarioRole.isPresent()) {
            UsuarioRole existingUsuarioRole = usuarioRole.get();
            existingUsuarioRole.setFechaModificacion(usuarioRoleDetails.getFechaModificacion());
            existingUsuarioRole.setUsuarioModificacion(usuarioRoleDetails.getUsuarioModificacion());
            UsuarioRole updatedUsuarioRole = usuarioRoleService.updateUsuarioRole(existingUsuarioRole);
            return ResponseEntity.ok(updatedUsuarioRole);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una relación Usuario-Rol
    @DeleteMapping("/{idUsuario}/{idRole}")
    public ResponseEntity<Void> deleteUsuarioRole(
            @PathVariable Long idUsuario, @PathVariable Long idRole) {
        UsuarioRoleId id = new UsuarioRoleId(idUsuario, idRole);
        usuarioRoleService.deleteUsuarioRole(id);
        return ResponseEntity.noContent().build();
    }
        */
}