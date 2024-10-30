package proyecto_f1.backend.controller.VistaSucursalEmpresa;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.VistaSucursalEmpresa.VistaSucursalEmpresa;
import proyecto_f1.backend.service.VistaSucursalEmpresa.ServicioSucursalEmpresa;

@RestController
@RequestMapping("/api/Requisitos")
public class CtrlSucursalEmpresa {
    @Autowired
    private ServicioSucursalEmpresa sucursalService;

    @GetMapping("/{id}")
    public ResponseEntity<VistaSucursalEmpresa> getById(@PathVariable Long id) {
        Optional<VistaSucursalEmpresa> sucursalEmpresa = sucursalService.getById(id);
        System.out.println(sucursalEmpresa.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build()));
        return sucursalEmpresa.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
}
