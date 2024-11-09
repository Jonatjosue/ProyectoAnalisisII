package proyecto_f1.backend.controller.TipoSaldoCuentaController;

import proyecto_f1.backend.model.TipoSaldoCuenta.TipoSaldoCuenta;
import proyecto_f1.backend.service.TipoSaldoCuentaService.TipoSaldoCuentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tiposaldo")
public class TipoSaldoCuentaController {

    @Autowired
    private TipoSaldoCuentaService service;

    // Obtener todos los registros
    @GetMapping("/all")
    public List<TipoSaldoCuenta> getAll() {
        return service.getAll();
    }

    // Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<TipoSaldoCuenta> getById(@PathVariable Long id) {
        Optional<TipoSaldoCuenta> tipoSaldoCuenta = service.getById(id);
        return tipoSaldoCuenta.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear o actualizar un registro
    @PostMapping("/save")
    public TipoSaldoCuenta saveOrUpdate(@RequestBody TipoSaldoCuenta tipoSaldoCuenta) {
        return service.saveOrUpdate(tipoSaldoCuenta);
    }

    // Eliminar por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar por nombre
    @GetMapping("/nombre/{nombre}")
    public List<TipoSaldoCuenta> getByNombre(@PathVariable String nombre) {
        return service.getByNombre(nombre);
    }

}
