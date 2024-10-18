package proyecto_f1.backend.repository.RespuestaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

import proyecto_f1.backend.model.Usuario.Usuario;
import proyecto_f1.backend.model.UsuarioPregunta.UsuarioPregunta;
import java.util.List;

public interface RespuestaRepository extends JpaRepository<UsuarioPregunta, Long> { 
    
    
        @Query(value = "SELECT count(*) FROM USUARIO_PREGUNTA where Id_Usuario = :idUsuario " + 
                        "and Id_Pregunta = :idPregunta and Respuesta = :Respuesta ", nativeQuery = true)
        int findrepuestaPreguntaRecuperacion(@Param("idUsuario") int idUsuario, @Param("idPregunta") int idPregunta,  @Param("Respuesta") String Respuesta);

       }      
