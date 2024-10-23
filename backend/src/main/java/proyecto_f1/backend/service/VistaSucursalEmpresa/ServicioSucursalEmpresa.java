package proyecto_f1.backend.service.VistaSucursalEmpresa;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.VistaSucursalEmpresa.VistaSucursalEmpresa;
import proyecto_f1.backend.repository.VistaSucursalEmpresa.RepoSucursalEmpresa;

@Service
public class ServicioSucursalEmpresa {
    @Autowired
    private RepoSucursalEmpresa sucursalRepository;

    // Method to get Sucursal by ID
    public Optional<VistaSucursalEmpresa> getById(Long id) {
        return sucursalRepository.findById(id);
    }
}
