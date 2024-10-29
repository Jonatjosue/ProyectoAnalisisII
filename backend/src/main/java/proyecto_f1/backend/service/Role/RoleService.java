package proyecto_f1.backend.service.Role;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.Role.Role;
import proyecto_f1.backend.repository.Role.RoleRepository;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role crearRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> findAll(){
        return roleRepository.findAll();
    }

    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public Role obtenerRolePorId(Long idRole) {
        return roleRepository.findById(idRole)
                .orElseThrow(() -> new RuntimeException("Role no encontrado con id: " + idRole));
    }
}
