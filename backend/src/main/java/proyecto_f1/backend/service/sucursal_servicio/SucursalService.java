package proyecto_f1.backend.service.sucursal_servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.Sucursal.Sucursal;
import proyecto_f1.backend.repository.SucursalRepository.SucursalRepository;

import java.util.List;

@Service
public class SucursalService {

    @Autowired
    private SucursalRepository sucursalRepository;

    public List<Sucursal> getAllSucursales() {
        return sucursalRepository.findAll();
    }

    public Sucursal getSucursalById(Long id) {
        return sucursalRepository.findById(id).orElse(null);
    }

    public Sucursal createOrUpdateSucursal(Sucursal sucursal) {
        return sucursalRepository.save(sucursal);
    }

    public void deleteSucursal(Long id) {
        sucursalRepository.deleteById(id);
    }
}
