package proyecto_f1.backend.controller.EstadoCivilController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto_f1.backend.model.EstadoCivil.EstadoCivil;
import proyecto_f1.backend.service.EstadoCivilService.EstadoCivilService;

import java.util.List;

@RestController
@RequestMapping("/api/estado-civil")
public class EstadoCivilController {

    @Autowired
    private EstadoCivilService estadoCivilService;

    @GetMapping
    public ResponseEntity<List<EstadoCivil>> getAll() {
        List<EstadoCivil> estadosCiviles = estadoCivilService.findAll();
        return ResponseEntity.ok(estadosCiviles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EstadoCivil> getById(@PathVariable Long id) {
        return estadoCivilService.findById(id)
                .map(estadosCiviles -> ResponseEntity.ok(estadosCiviles))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<EstadoCivil> create(@RequestBody EstadoCivil estadoCivil) {
        EstadoCivil savedEstadoCivil = estadoCivilService.save(estadoCivil);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEstadoCivil);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EstadoCivil> update(@PathVariable Long id, @RequestBody EstadoCivil estadoCivil) {
        EstadoCivil updatedEstadoCivil = estadoCivilService.update(id, estadoCivil);
        return ResponseEntity.ok(updatedEstadoCivil);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        estadoCivilService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
