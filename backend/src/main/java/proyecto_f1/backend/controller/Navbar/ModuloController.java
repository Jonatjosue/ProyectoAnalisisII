package proyecto_f1.backend.controller.Navbar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.Navbar.ModuloEntity;
import proyecto_f1.backend.service.Navbar.ModuloService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/modulos")
public class ModuloController {
    
    @Autowired
    private ModuloService moduloService;

    @GetMapping
    public List<ModuloEntity> getAllModulos(String usuario, Long role) {
        return moduloService.findAll(usuario, role);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuloEntity> getModuloById(@PathVariable Long id) {
        return moduloService.findById(id)
                .map(modulo -> ResponseEntity.ok(modulo))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ModuloEntity createModulo(@RequestBody ModuloEntity modulo) {
        return moduloService.save(modulo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModuloEntity> updateModulo(@PathVariable Long id, @RequestBody ModuloEntity moduloDetails) {
        return moduloService.findById(id)
                .map(modulo -> {
                    modulo.setNombre(moduloDetails.getNombre());
                    modulo.setOrdenMenu(moduloDetails.getOrdenMenu());
                    modulo.setFechaModificacion(moduloDetails.getFechaModificacion());
                    modulo.setUsuarioModificacion(moduloDetails.getUsuarioModificacion());
                    return ResponseEntity.ok(moduloService.save(modulo));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    
}
