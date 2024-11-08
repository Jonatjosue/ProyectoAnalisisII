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
