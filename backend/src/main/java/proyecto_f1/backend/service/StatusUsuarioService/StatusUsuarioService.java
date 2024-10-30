package proyecto_f1.backend.service.StatusUsuarioService;


import proyecto_f1.backend.model.StatusUsuario.StatusUsuario;
import proyecto_f1.backend.repository.StatusUsuarioRepository.StatusUsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusUsuarioService {

    @Autowired
    private StatusUsuarioRepository statusUsuarioRepository;

    public List<StatusUsuario> getAllStatusUsuarios() {
        return statusUsuarioRepository.findAll();
    }

    public Optional<StatusUsuario> getStatusUsuarioById(Long id) {
        return statusUsuarioRepository.findById(id);
    }

    public StatusUsuario createStatusUsuario(StatusUsuario statusUsuario) {
        return statusUsuarioRepository.save(statusUsuario);
    }

    public StatusUsuario updateStatusUsuario(Long id, StatusUsuario statusUsuarioDetails) {
        return statusUsuarioRepository.findById(id).map(statusUsuario -> {
            statusUsuario.setNombre(statusUsuarioDetails.getNombre());
            statusUsuario.setFechaModificacion(statusUsuarioDetails.getFechaModificacion());
            statusUsuario.setUsuarioModificacion(statusUsuarioDetails.getUsuarioModificacion());
            return statusUsuarioRepository.save(statusUsuario);
        }).orElseThrow(() -> new RuntimeException("StatusUsuario not found with id " + id));
    }

    public void deleteStatusUsuario(Long id) {
        statusUsuarioRepository.deleteById(id);
    }
}
