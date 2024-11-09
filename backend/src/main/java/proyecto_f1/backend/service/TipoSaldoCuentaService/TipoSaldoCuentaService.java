package proyecto_f1.backend.service.TipoSaldoCuentaService;

import proyecto_f1.backend.model.TipoSaldoCuenta.TipoSaldoCuenta;
import proyecto_f1.backend.repository.TipoSaldoCuentaRepository.TipoSaldoCuentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoSaldoCuentaService {

    @Autowired
    private TipoSaldoCuentaRepository repository;

    // Obtener todos los registros
    public List<TipoSaldoCuenta> getAll() {
        return repository.findAll();
    }

    // Obtener por ID
    public Optional<TipoSaldoCuenta> getById(Long id) {
        return repository.findById(id);
    }

    // Guardar o actualizar un registro
    public TipoSaldoCuenta saveOrUpdate(TipoSaldoCuenta tipoSaldoCuenta) {
        return repository.save(tipoSaldoCuenta);
    }

    // Eliminar por ID
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    // Buscar por nombre
    public List<TipoSaldoCuenta> getByNombre(String nombre) {
        return repository.findByNombre(nombre);
    }

}
