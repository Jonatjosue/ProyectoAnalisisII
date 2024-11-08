package proyecto_f1.backend.controller.TipoSaldoCuentaController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.TipoSaldoCuenta.TipoSaldoCuenta;
import proyecto_f1.backend.service.TipoSaldoCuentaService.TipoSaldoCuentaService;

@RestController
@RequestMapping("/api/tipo-saldo-cuenta")
public class TipoSaldoCuentaController {
    
    @Autowired
    private TipoSaldoCuentaService tipoSaldoCuentaService;

    // Get all TipoSaldoCuentas
    @GetMapping
    public List<TipoSaldoCuenta> getAllTipoSaldoCuentas() {
        return tipoSaldoCuentaService.getAllTipoSaldoCuentas();
    }

    // Get TipoSaldoCuenta by ID
    @GetMapping("/{id}")
    public ResponseEntity<TipoSaldoCuenta> getTipoSaldoCuentaById(@PathVariable Long id) {
        Optional<TipoSaldoCuenta> tipoSaldoCuenta = tipoSaldoCuentaService.getTipoSaldoCuentaById(id);
        return tipoSaldoCuenta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new TipoSaldoCuenta
    @PostMapping
    public ResponseEntity<TipoSaldoCuenta> createTipoSaldoCuenta(@RequestBody TipoSaldoCuenta tipoSaldoCuenta) {
        TipoSaldoCuenta createdTipoSaldoCuenta = tipoSaldoCuentaService.createTipoSaldoCuenta(tipoSaldoCuenta);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTipoSaldoCuenta);
    }

    // Update an existing TipoSaldoCuenta
    @PutMapping("/{id}")
    public ResponseEntity<TipoSaldoCuenta> updateTipoSaldoCuenta(@PathVariable Long id, @RequestBody TipoSaldoCuenta tipoSaldoCuenta) {
        try {
            TipoSaldoCuenta updatedTipoSaldoCuenta = tipoSaldoCuentaService.updateTipoSaldoCuenta(id, tipoSaldoCuenta);
            return ResponseEntity.ok(updatedTipoSaldoCuenta);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a TipoSaldoCuenta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoSaldoCuenta(@PathVariable Long id) {
        tipoSaldoCuentaService.deleteTipoSaldoCuenta(id);
        return ResponseEntity.noContent().build();
    }
}
