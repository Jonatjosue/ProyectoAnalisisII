package proyecto_f1.backend.repository.RoleOpcion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.RoleOpcion.RoleOpcion;
import proyecto_f1.backend.model.RoleOpcion.RoleOpcionId;

@Repository
public interface RoleOpcionRepository extends JpaRepository<RoleOpcion, RoleOpcionId> {

}
