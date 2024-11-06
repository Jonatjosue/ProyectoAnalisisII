package proyecto_f1.backend.service.RoleOpcion;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.RoleOpcion.RoleOpcion;
import proyecto_f1.backend.model.RoleOpcion.RoleOpcionId;
import proyecto_f1.backend.repository.RoleOpcion.RoleOpcionRepository;

@Service
public class RoleOpcionService {

    @Autowired
    private RoleOpcionRepository repository;

    public List<RoleOpcion> getAllRoleOpciones() {
        return repository.findAll();
    }

    public Optional<RoleOpcion> getRoleOpcionById(Long idRole, int idOpcion) {
        return repository.findById(new RoleOpcionId(idRole, idOpcion));
    }

    public RoleOpcion saveRoleOpcion(RoleOpcion roleOpcion) {
        return repository.save(roleOpcion);
    }

    public RoleOpcion updateRoleOpcion(RoleOpcion roleOpcion) {
        return repository.save(roleOpcion);
    }

    public void deleteRoleOpcion(Long idRole, int idOpcion) {
        repository.deleteById(new RoleOpcionId(idRole, idOpcion));
    }
}
