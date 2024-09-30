package proyecto_f1.backend.service.Empresa_servicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.empresa.Empresa;
import proyecto_f1.backend.repository.EmpresaRepository.EmpresaRepository;

import java.util.List;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }

    public Empresa getEmpresaById(Long id) {
        return empresaRepository.findById(id).orElse(null);
    }

    public Empresa createOrUpdateEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public void deleteEmpresa(Long id) {
        empresaRepository.deleteById(id);
    }





}
