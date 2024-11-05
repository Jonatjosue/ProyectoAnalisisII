package proyecto_f1.backend.service.StatusCuentaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_f1.backend.model.StatusCuenta.StatusCuenta;
import proyecto_f1.backend.repository.StatusCuenta.StatusCuentaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class StatusCuentaService {

    @Autowired
    private StatusCuentaRepository statusCuentaRepository;

    public List<StatusCuenta> findAll() {
        return statusCuentaRepository.findAll();
    }

    public Optional<StatusCuenta> findById(Long id) {
        return statusCuentaRepository.findById(id);
    }

    public StatusCuenta save(StatusCuenta statusCuenta) {
        statusCuenta.setFechaCreacion(new Date()); // Asigna la fecha de creación
        return statusCuentaRepository.save(statusCuenta);
    }

    public StatusCuenta update(Long id, StatusCuenta statusCuentaDetails) {
        return statusCuentaRepository.findById(id).map(statusCuenta -> {
            statusCuenta.setNombre(statusCuentaDetails.getNombre());
            statusCuenta.setFechaModificacion(new Date()); // Asigna la fecha de modificación
            statusCuenta.setUsuarioModificacion(statusCuentaDetails.getUsuarioModificacion());
            return statusCuentaRepository.save(statusCuenta);
        }).orElseThrow(() -> new RuntimeException("StatusCuenta no encontrado"));
    }

    public void delete(Long id) {
        statusCuentaRepository.deleteById(id);
    }
}
