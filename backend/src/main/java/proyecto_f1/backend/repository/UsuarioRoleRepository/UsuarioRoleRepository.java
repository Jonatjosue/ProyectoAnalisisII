package proyecto_f1.backend.repository.UsuarioRoleRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.Usuario.UsuarioRole;
import proyecto_f1.backend.model.Usuario.UsuarioRoleId;

import java.util.List;

@Repository
public interface UsuarioRoleRepository extends JpaRepository<UsuarioRole, UsuarioRoleId> {

    // Obtener todas las relaciones Usuario-Rol por idUsuario
    List<UsuarioRole> findByIdUsuario(Long idUsuario);
}