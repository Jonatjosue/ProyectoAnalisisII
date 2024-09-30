package proyecto_f1.backend.controller.EmpresaController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import proyecto_f1.backend.model.empresa.Empresa;
import proyecto_f1.backend.service.Empresa_servicio.EmpresaService;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public List<Empresa> getAllEmpresas() {
        return empresaService.getAllEmpresas();
    }

    @GetMapping("/{id}")
    public Empresa getEmpresaById(@PathVariable Long id) {
        return empresaService.getEmpresaById(id);
    }

    @PostMapping
    public Empresa createEmpresa(@RequestBody Empresa empresa) {
        return empresaService.createOrUpdateEmpresa(empresa);
    }

    @PutMapping("/{id}")
    public Empresa updateEmpresa(@PathVariable Long id, @RequestBody Empresa empresa) {
        empresa.setIdEmpresa(id);
        return empresaService.createOrUpdateEmpresa(empresa);
    }

    @DeleteMapping("/{id}")
    public void deleteEmpresa(@PathVariable Long id) {
        empresaService.deleteEmpresa(id);
    }
}
