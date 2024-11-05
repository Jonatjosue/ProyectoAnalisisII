package proyecto_f1.backend.repository.UsuarioRoleRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.Usuario.UsuarioRole;
import proyecto_f1.backend.model.Usuario.UsuarioRoleId;

import java.util.List;

@Repository
public interface UsuarioRoleRepository extends JpaRepository<UsuarioRole, UsuarioRoleId> {

    // Obtener todas las relaciones Usuario-Rol por idUsuario
    List<UsuarioRole> findByIdUsuario(Long idUsuario);

    //SELECT rol.id_role FROM USUARIO us inner join USUARIO_ROLE ROL ON ROL.ID_USUARIO = US.ID_USUARIO WHERE Nombre  = 'Nologin'


       @Query( value = "SELECT [role].Nombre  FROM USUARIO us "+
                       "inner join USUARIO_ROLE ROL ON ROL.ID_USUARIO = US.ID_USUARIO "+ 
                       "inner join [ROLE] [role] on role.Id_Role = rol.Id_Role "+
                       "WHERE us.Nombre  = :usuario ", nativeQuery =true )
   List<String>  findRolesUsuario(@Param("usuario") String usuario);
}