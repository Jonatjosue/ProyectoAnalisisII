package proyecto_f1.backend.service.Role;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

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

    public List<Role> obtenerRoles() {
        return roleRepository.findAll();
    }

    public Role actualizarRole(Long idRole, Role roleDetalles) {
        Role role = roleRepository.findById(idRole).orElseThrow();
        role.setNombre(roleDetalles.getNombre());
        role.setFechaModificacion(obtenerFecha());
        return roleRepository.save(role);
    }

    public Date obtenerFecha() {
        LocalDate dateObj = LocalDate.now();
        Date date = Date.from(dateObj.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return date;
    }

    public Role obtenerRolePorId(Long idRole) {
        return roleRepository.findById(idRole)
                .orElseThrow(() -> new RuntimeException("Role no encontrado con id: " + idRole));
    }
}
