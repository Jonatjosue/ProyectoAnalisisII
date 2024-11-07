package proyecto_f1.backend.controller.Navbar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.Navbar.OpcionEntity;
import proyecto_f1.backend.service.Navbar.OpcionService;

@RestController
@RequestMapping("api/opciones")
public class OpcionController {
    
    @Autowired
    private OpcionService opcionService;

    @GetMapping
    public List<OpcionEntity> getAllOpciiones(String usuario, Long role) {
        return opcionService.findAll(usuario, role);
    }

    @GetMapping("/get")
    public List<OpcionEntity> getAllOpciiones() {
        return opcionService.buscaOpcion();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpcionEntity> getOpcionById(@PathVariable Long id) {
        return opcionService.findById(id)
                .map(opcion -> ResponseEntity.ok(opcion))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public OpcionEntity createOpcion(@RequestBody OpcionEntity opcion) {
        return opcionService.save(opcion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OpcionEntity> updateMenu(@PathVariable Long id, @RequestBody OpcionEntity opcionDetails) {
        return opcionService.findById(id)
                .map(opcion -> {
                    opcion.setIdMenu(opcionDetails.getIdMenu());
                    opcion.setNombre(opcionDetails.getNombre());
                    opcion.setOrdenMenu(opcionDetails.getOrdenMenu());
                    opcion.setFechaModificacion(opcionDetails.getFechaModificacion());
                    opcion.setUsuarioModificacion(opcionDetails.getUsuarioModificacion());
                    return ResponseEntity.ok(opcionService.save(opcion));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteOpcion(@PathVariable Long id) {
        opcionService.deleteOpcion(id);
    }
}
