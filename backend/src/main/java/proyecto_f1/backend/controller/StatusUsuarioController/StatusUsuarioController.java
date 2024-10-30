package proyecto_f1.backend.controller.StatusUsuarioController;


import proyecto_f1.backend.model.StatusUsuario.StatusUsuario;
import proyecto_f1.backend.service.StatusUsuarioService.StatusUsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statusUsuarios")
public class StatusUsuarioController {

    @Autowired
    private StatusUsuarioService statusUsuarioService;

    @GetMapping
    public List<StatusUsuario> getAllStatusUsuarios() {
        return statusUsuarioService.getAllStatusUsuarios();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusUsuario> getStatusUsuarioById(@PathVariable Long id) {
        return statusUsuarioService.getStatusUsuarioById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public StatusUsuario createStatusUsuario(@RequestBody StatusUsuario statusUsuario) {
        return statusUsuarioService.createStatusUsuario(statusUsuario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusUsuario> updateStatusUsuario(@PathVariable Long id, @RequestBody StatusUsuario statusUsuarioDetails) {
        return statusUsuarioService.getStatusUsuarioById(id)
            .map(existingStatusUsuario -> {
                StatusUsuario updatedStatusUsuario = statusUsuarioService.updateStatusUsuario(id, statusUsuarioDetails);
                return ResponseEntity.ok(updatedStatusUsuario);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatusUsuario(@PathVariable Long id) {
        if (statusUsuarioService.getStatusUsuarioById(id).isPresent()) {
            statusUsuarioService.deleteStatusUsuario(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
