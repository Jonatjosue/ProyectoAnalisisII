package proyecto_f1.backend.service.StatusCuentaService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.StatusCuenta.StatusCuenta;
import proyecto_f1.backend.repository.StatusCuentaRepository.StatusCuentaRepository;

@Service
public class StatusCuentaService {

    @Autowired
    private StatusCuentaRepository repository;

    public List<StatusCuenta> obtenerTodos() {
        return repository.findAll();
    }

    public StatusCuenta obtenerPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public StatusCuenta crearOActualizar(StatusCuenta statusCuenta) {
        return repository.save(statusCuenta);
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
