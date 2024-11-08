package proyecto_f1.backend.controller.TipoMovimientoCXCController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import proyecto_f1.backend.model.TipoMovimientoCXC.TipoMovimientoCXC;
import proyecto_f1.backend.service.TipoMovimientoCXCService.TipoMovimientoCXCService;

import java.util.List;

@RestController
@RequestMapping("/api/tipoMovimientoCXC")
public class TipoMovimientoCXCController {

    @Autowired
    private TipoMovimientoCXCService service;

    // Endpoint para obtener un registro por ID
    @GetMapping("/{id}")
    public ResponseEntity<TipoMovimientoCXC> getTipoMovimiento(@PathVariable Long id) {
        TipoMovimientoCXC tipoMovimiento = service.getTipoMovimientoById(id);
        return tipoMovimiento != null ? ResponseEntity.ok(tipoMovimiento) : ResponseEntity.notFound().build();
    }

    // Endpoint para obtener todos los registros
    @GetMapping
    public ResponseEntity<List<TipoMovimientoCXC>> getAllTipoMovimientos() {
        List<TipoMovimientoCXC> tipoMovimientos = service.getAllTipoMovimientos();
        return new ResponseEntity<>(tipoMovimientos, HttpStatus.OK);
    }

    // Endpoint para crear un nuevo registro
    @PostMapping
    public ResponseEntity<String> createTipoMovimiento(@RequestBody TipoMovimientoCXC tipoMovimiento) {
        service.createTipoMovimiento(tipoMovimiento.getNombre(), tipoMovimiento.getOperacionCuentaCorriente(),
                tipoMovimiento.getUsuarioCreacion());
        return ResponseEntity.status(HttpStatus.CREATED).body("Movimiento creado exitosamente");
    }

    // Endpoint para actualizar un registro por ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateTipoMovimiento(
            @PathVariable Long id,
            @RequestBody TipoMovimientoCXC tipoMovimiento) {
        service.updateTipoMovimiento(id, tipoMovimiento.getNombre(), tipoMovimiento.getOperacionCuentaCorriente(),
                tipoMovimiento.getUsuarioModificacion());
        return ResponseEntity.ok("Movimiento actualizado exitosamente");
    }

    // Endpoint para eliminar un registro por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTipoMovimiento(@PathVariable Long id) {
        service.deleteTipoMovimiento(id);
        return ResponseEntity.ok("Movimiento eliminado exitosamente");
    }
}