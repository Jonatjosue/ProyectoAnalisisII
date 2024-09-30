package proyecto_f1.backend.repository.UsuarioRoleRepository;


import org.springframework.data.jpa.repository.JpaRepository;
import proyecto_f1.backend.model.Usuario.UsuarioRole;
import proyecto_f1.backend.model.Usuario.UsuarioRoleId;
import proyecto_f1.backend.model.Usuario.Usuario;

import java.util.Optional;
import java.util.List;


public interface UsuarioRoleRepository extends JpaRepository<UsuarioRole, UsuarioRoleId> {
    Optional<UsuarioRole> findByIdUsuario(Long idUsuario);
}