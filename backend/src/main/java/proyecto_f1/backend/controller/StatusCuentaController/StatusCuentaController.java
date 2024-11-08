package proyecto_f1.backend.controller.StatusCuentaController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto_f1.backend.model.StatusCuenta.StatusCuenta;
import proyecto_f1.backend.service.StatusCuentaService.StatusCuentaService;

import java.util.List;

@RestController
@RequestMapping("/api/status-cuenta")
public class StatusCuentaController {

    @Autowired
    private StatusCuentaService statusCuentaService;

    @GetMapping
    public List<StatusCuenta> getAllStatusCuenta() {
        return statusCuentaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusCuenta> getStatusCuentaById(@PathVariable Long id) {
        return statusCuentaService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StatusCuenta> createStatusCuenta(@RequestBody StatusCuenta statusCuenta) {
        return new ResponseEntity<>(statusCuentaService.save(statusCuenta), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StatusCuenta> updateStatusCuenta(
            @PathVariable Long id, @RequestBody StatusCuenta statusCuentaDetails) {
        return ResponseEntity.ok(statusCuentaService.update(id, statusCuentaDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStatusCuenta(@PathVariable Long id) {
        statusCuentaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
package proyecto_f1.backend.controller.StatusCuentaController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import proyecto_f1.backend.model.StatusCuenta.StatusCuenta;
import proyecto_f1.backend.service.StatusCuentaService.StatusCuentaService;
import java.util.List;

@RestController
@RequestMapping("/api/status-cuenta")
public class StatusCuentaController {

    @Autowired
    private StatusCuentaService service;

    @GetMapping
    public List<StatusCuenta> obtenerTodos() {
        return service.obtenerTodos();
    }

    @GetMapping("/{id}")
    public StatusCuenta obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public StatusCuenta crearOActualizar(@RequestBody StatusCuenta statusCuenta) {
        return service.crearOActualizar(statusCuenta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

}
