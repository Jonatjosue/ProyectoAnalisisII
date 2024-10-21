package proyecto_f1.backend.repository.UsuarioRoleRepository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import proyecto_f1.backend.model.Usuario.UsuarioRole;
import proyecto_f1.backend.model.Usuario.UsuarioRoleId;

import java.util.Optional;
import java.util.List;


public interface UsuarioRoleRepository extends JpaRepository<UsuarioRole, UsuarioRoleId> {
    Optional<UsuarioRole> findByIdUsuario(Long idUsuario);

    //SELECT rol.id_role FROM USUARIO us inner join USUARIO_ROLE ROL ON ROL.ID_USUARIO = US.ID_USUARIO WHERE Nombre  = 'Nologin'


       @Query( value = "SELECT [role].Nombre  FROM USUARIO us "+
                       "inner join USUARIO_ROLE ROL ON ROL.ID_USUARIO = US.ID_USUARIO "+ 
                       "inner join [ROLE] [role] on role.Id_Role = rol.Id_Role "+
                       "WHERE us.Nombre  = :usuario ", nativeQuery =true )
   List<String>  findRolesUsuario(@Param("usuario") String usuario);
}