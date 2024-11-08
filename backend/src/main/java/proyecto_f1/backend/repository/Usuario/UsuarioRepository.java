package proyecto_f1.backend.repository.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proyecto_f1.backend.ClasesValidacion.validacion.OpcionesMenuUsuario;
import proyecto_f1.backend.ClasesValidacion.validacion.PreguntasUsuarioRecuperacion;
import proyecto_f1.backend.model.Usuario.*;
import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

   Optional<Usuario> findByNombre(String nombre);

   @Query( value = "SELECT * FROM USUARIO WHERE Nombre  = :Usuario" , nativeQuery =true )
   Usuario findUsuario(@Param("Usuario") String Usuario);

   Optional<Usuario> findByCorreoElectronico(String correoElectronico);
   
   @Query( value = "SELECT USPE.Id_Pregunta , USPE.Pregunta FROM USUARIO US "+
           "INNER JOIN USUARIO_PREGUNTA USPE "+
           "ON US.Id_Usuario = USPE.Id_Usuario " +
           "WHERE US.Id_Usuario = :idUsuario order by uspe.Orden_Pregunta asc" , nativeQuery =true )
   List<PreguntasUsuarioRecuperacion> findPreguntasRecuperacion(@Param("idUsuario") Long idUsuario);




    @Query(value = "EXEC sp_ObtenerPermisosOpciones :idUsuario , :idRole", nativeQuery = true)
    List<OpcionesMenuUsuario> obtenerPermisosOpciones(@Param("idUsuario") Long idUsuario, @Param ("idRole") Long idRole);

    @Query(value = "EXEC sp_obtenerPermisosMenus :idUsuario , :idRole", nativeQuery = true)
    List<OpcionesMenuUsuario> obtenerPermisosMenus(@Param("idUsuario") Long idUsuario, @Param ("idRole") Long idRole);
    
    @Query(value = "EXEC sp_ObtenerPermisosModulos :idUsuario , :idRole", nativeQuery = true)
    List<OpcionesMenuUsuario> obtenerPermisosModulos(@Param("idUsuario") Long idUsuario, @Param ("idRole") Long idRole);
    

}
