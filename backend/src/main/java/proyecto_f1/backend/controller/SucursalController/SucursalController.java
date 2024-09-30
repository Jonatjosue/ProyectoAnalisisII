package proyecto_f1.backend.controller.SucursalController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.Sucursal.Sucursal;
import proyecto_f1.backend.service.sucursal_servicio.SucursalService;

@RestController
@RequestMapping("/api/sucursales")
public class SucursalController {

    @Autowired
    private SucursalService sucursalService; // Inyecta el servicio, no la entidad

    @GetMapping
    public List<Sucursal> getAllSucursales() {
        return sucursalService.getAllSucursales(); // Llamada al servicio, no a la entidad
    }

    @GetMapping("/{id}")
    public Sucursal getSucursalById(@PathVariable Long id) {
        return sucursalService.getSucursalById(id); // Llamada al servicio, no a la entidad
    }

    @PostMapping
    public Sucursal createSucursal(@RequestBody Sucursal sucursal) {
        return sucursalService.createOrUpdateSucursal(sucursal); // Llamada al servicio, no a la entidad
    }

    @PutMapping("/{id}")
    public Sucursal updateSucursal(@PathVariable Long id, @RequestBody Sucursal sucursal) {
        sucursal.setIdSucursal(id);
        return sucursalService.createOrUpdateSucursal(sucursal); // Llamada al servicio, no a la entidad
    }

    @DeleteMapping("/{id}")
    public void deleteSucursal(@PathVariable Long id) {
        sucursalService.deleteSucursal(id); // Llamada al servicio, no a la entidad
    }
}
