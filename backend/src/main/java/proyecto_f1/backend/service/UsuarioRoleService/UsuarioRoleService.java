package proyecto_f1.backend.service.UsuarioRoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_f1.backend.model.Usuario.UsuarioRole;
import proyecto_f1.backend.model.Usuario.UsuarioRoleId;
import proyecto_f1.backend.repository.UsuarioRoleRepository.UsuarioRoleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioRoleService {

    @Autowired
    private UsuarioRoleRepository usuarioRoleRepository;

    // Método para obtener todas las relaciones Usuario-Rol
    public List<UsuarioRole> getAllUsuarioRoles() {
        return usuarioRoleRepository.findAll();
    }

    // Método para obtener todas las relaciones Usuario-Rol por idUsuario
    public List<UsuarioRole> getUsuarioRolesByUsuarioId(Long idUsuario) {
        return usuarioRoleRepository.findByIdUsuario(idUsuario);
    }

    // Método para obtener una relación Usuario-Rol específica por ID compuesto
    public Optional<UsuarioRole> getUsuarioRoleById(UsuarioRoleId id) {
        return usuarioRoleRepository.findById(id);
    }

    // Método para crear una nueva relación Usuario-Rol
    public UsuarioRole createUsuarioRole(UsuarioRole usuarioRole) {
        // Lógica adicional como validaciones podría ir aquí si es necesario
        return usuarioRoleRepository.save(usuarioRole);
    }

    // Método para actualizar una relación Usuario-Rol existente
    public UsuarioRole updateUsuarioRole(UsuarioRole usuarioRole) {
        // Asegúrate de que la relación existe antes de actualizar
        Optional<UsuarioRole> existingUsuarioRole = usuarioRoleRepository
                .findById(new UsuarioRoleId(usuarioRole.getIdUsuario(), usuarioRole.getIdRole()));
        if (existingUsuarioRole.isPresent()) {
            // Si existe, actualiza los campos necesarios
            UsuarioRole updatedUsuarioRole = existingUsuarioRole.get();
            updatedUsuarioRole.setFechaModificacion(usuarioRole.getFechaModificacion());
            updatedUsuarioRole.setUsuarioModificacion(usuarioRole.getUsuarioModificacion());
            return usuarioRoleRepository.save(updatedUsuarioRole);
        } else {
            // Manejar el caso en el que la relación no existe
            throw new RuntimeException("La relación Usuario-Rol no existe");
        }
    }

    // Método para eliminar una relación Usuario-Rol
    public void deleteUsuarioRole(UsuarioRoleId id) {
        // Verifica si existe antes de intentar eliminar
        Optional<UsuarioRole> usuarioRole = usuarioRoleRepository.findById(id);
        if (usuarioRole.isPresent()) {
            usuarioRoleRepository.deleteById(id);
        } else {
            throw new RuntimeException("La relación Usuario-Rol no existe y no puede ser eliminada");
        }
    }
}