package proyecto_f1.backend.repository.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.ClasesValidacion.validacion.PreguntasUsuarioRecuperacion;
import proyecto_f1.backend.model.Usuario.*;
import java.util.Optional;
import java.util.List;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

   Optional<Usuario> findByNombre(String nombre);
   Optional<Usuario> findByCorreoElectronico(String correoElectronico);
   
   @Query( value = "SELECT USPE.Id_Pregunta , USPE.Pregunta FROM USUARIO US "+
           "INNER JOIN USUARIO_PREGUNTA USPE "+
           "ON US.Id_Usuario = USPE.Id_Usuario " +
           "WHERE US.Id_Usuario = :idUsuario order by uspe.Orden_Pregunta asc" , nativeQuery =true )
   List<PreguntasUsuarioRecuperacion> findPreguntasRecuperacion(@Param("idUsuario") Long idUsuario);

}
