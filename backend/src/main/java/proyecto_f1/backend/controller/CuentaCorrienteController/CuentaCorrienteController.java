package proyecto_f1.backend.controller.CuentaCorrienteController;

import java.util.List;

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

import proyecto_f1.backend.model.CuentaCorriente.CuentaCorriente;
import proyecto_f1.backend.service.CuentaCorrienteService.CuentaCorrienteService;

@RestController
@RequestMapping("/api/cuentasCorrientes")
public class CuentaCorrienteController {

    @Autowired
    private CuentaCorrienteService cuentaCorrienteService;

    // Obtener todas las cuentas corrientes
    @GetMapping
    public List<CuentaCorriente> getAllCuentasCorrientes() {
        return cuentaCorrienteService.findAll();
    }

    // Obtener una cuenta corriente por ID
    @GetMapping("/{id}")
    public ResponseEntity<CuentaCorriente> getCuentaCorrienteById(@PathVariable(value = "id") Integer id) {
        CuentaCorriente cuentaCorriente = cuentaCorrienteService.findById(id);
        if (cuentaCorriente != null) {
            return ResponseEntity.ok().body(cuentaCorriente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Obtener una cuenta corriente por idTipoDocumento e idPersona
    @GetMapping("/{idTipoDocumento}/{idPersona}")
    public ResponseEntity<CuentaCorriente> getCuentaCorrienteByIdTipoDocumentoAndIdPersona(
            @PathVariable(value = "idTipoDocumento") Integer idTipoDocumento,
            @PathVariable(value = "idPersona") Integer idPersona) {
        CuentaCorriente cuentaCorriente = cuentaCorrienteService.findByIdTipoDocumentoAndIdPersona(idTipoDocumento,
                idPersona);
        if (cuentaCorriente != null) {
            return ResponseEntity.ok().body(cuentaCorriente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Crear una nueva cuenta corriente llamando al procedimiento almacenado
    @PostMapping
    public ResponseEntity<Void> createCuentaCorriente(@RequestBody CuentaCorriente cuentaCorriente) {
        // Llamada al método que usa el procedimiento almacenado
        cuentaCorrienteService.insertarCuentaCorriente(cuentaCorriente);

        // Devuelve una respuesta sin contenido (solo código 201)
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Actualizar una cuenta corriente
    @PutMapping("/{id}")
    public ResponseEntity<CuentaCorriente> updateCuentaCorriente(@PathVariable(value = "id") Integer id,
            @RequestBody CuentaCorriente detallesCuentaCorriente) {
        CuentaCorriente actualizadaCuenta = cuentaCorrienteService.update(id, detallesCuentaCorriente);
        if (actualizadaCuenta != null) {
            return ResponseEntity.ok(actualizadaCuenta);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar una cuenta corriente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCuentaCorriente(@PathVariable(value = "id") Integer id) {
        CuentaCorriente cuentaCorriente = cuentaCorrienteService.findById(id);
        if (cuentaCorriente != null) {
            cuentaCorrienteService.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}