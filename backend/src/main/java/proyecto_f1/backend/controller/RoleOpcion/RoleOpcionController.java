package proyecto_f1.backend.controller.RoleOpcion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto_f1.backend.model.RoleOpcion.RoleOpcion;
import proyecto_f1.backend.service.RoleOpcion.RoleOpcionService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/role-opcion")
public class RoleOpcionController {

    @Autowired
    private RoleOpcionService service;

    @GetMapping
    public List<RoleOpcion> getAllRoleOpciones() {
        return service.getAllRoleOpciones();
    }

    @GetMapping("/{idRole}/{idOpcion}")
    public ResponseEntity<RoleOpcion> getRoleOpcionById(@PathVariable Long idRole, @PathVariable int idOpcion) {
        Optional<RoleOpcion> roleOpcion = service.getRoleOpcionById(idRole, idOpcion);
        return roleOpcion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public RoleOpcion createRoleOpcion(@RequestBody RoleOpcion roleOpcion) {
        return service.saveRoleOpcion(roleOpcion);
    }

    @PutMapping("/{idRole}/{idOpcion}")
    public ResponseEntity<RoleOpcion> updateRoleOpcion(
            @PathVariable Long idRole,
            @PathVariable int idOpcion,
            @RequestBody RoleOpcion roleOpcionDetails) {

        Optional<RoleOpcion> existingRoleOpcion = service.getRoleOpcionById(idRole, idOpcion);

        if (existingRoleOpcion.isPresent()) {
            RoleOpcion updatedRoleOpcion = existingRoleOpcion.get();

            System.out.println(idRole+"/"+updatedRoleOpcion.getIdOpcion());

            // Apply updates from roleOpcionDetails to the found RoleOpcion
            updatedRoleOpcion.setAlta(roleOpcionDetails.isAlta());
            updatedRoleOpcion.setBaja(roleOpcionDetails.isBaja());
            updatedRoleOpcion.setCambio(roleOpcionDetails.isCambio());
            updatedRoleOpcion.setImprimir(roleOpcionDetails.isImprimir());
            updatedRoleOpcion.setExportar(roleOpcionDetails.isExportar());
            updatedRoleOpcion.setFechaModificacion(roleOpcionDetails.getFechaModificacion());
            updatedRoleOpcion.setUsuarioModificacion(roleOpcionDetails.getUsuarioModificacion());

            // Save the updated object
            RoleOpcion savedRoleOpcion = service.saveRoleOpcion(updatedRoleOpcion);
            return ResponseEntity.ok(savedRoleOpcion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{idRole}/{idOpcion}")
    public ResponseEntity<Void> deleteRoleOpcion(@PathVariable Long idRole, @PathVariable int idOpcion) {
        service.deleteRoleOpcion(idRole, idOpcion);
        return ResponseEntity.noContent().build();
    }
}
