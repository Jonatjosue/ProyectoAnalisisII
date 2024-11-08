package proyecto_f1.backend.service.TipoMovimientoCXCService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.TipoMovimientoCXC.TipoMovimientoCXC;
import proyecto_f1.backend.repository.TipoMovimientoCXCRepository.TipoMovimientoCXCRepository;

import java.util.Date;
import java.util.List;

@Service
public class TipoMovimientoCXCService {

    @Autowired
    private TipoMovimientoCXCRepository repository;

    public TipoMovimientoCXC getTipoMovimientoById(Long id) {
        // Utiliza orElse(null) para devolver el objeto o null si no está presente
        return repository.findById(id).orElse(null);
    }

    public void createTipoMovimiento(String nombre, int operacionCuentaCorriente, String usuarioCreacion) {
        repository.saveTipoMovimiento(nombre, operacionCuentaCorriente, new Date(), usuarioCreacion);
    }

    public void updateTipoMovimiento(Long id, String nombre, int operacionCuentaCorriente, String usuarioModificacion) {
        repository.updateTipoMovimiento(id, nombre, operacionCuentaCorriente, new Date(), usuarioModificacion);
    }

    public void deleteTipoMovimiento(Long id) {
        repository.deleteById(id);
    }

    public List<TipoMovimientoCXC> getAllTipoMovimientos() {
        return repository.findAll();
    }
}
