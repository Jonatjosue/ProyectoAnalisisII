package proyecto_f1.backend.repository.RespuestaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import proyecto_f1.backend.model.Usuario.Usuario;
import proyecto_f1.backend.model.UsuarioPregunta.UsuarioPregunta;
import java.util.List;

public interface RespuestaRepository extends JpaRepository<UsuarioPregunta, Long> { 
    
       Optional<UsuarioPregunta> findByUsuarioAndOrdenPregunta(Usuario usuario, int ordenPregunta);  // camelCase 'ordenPregunta' a 'OrdenPregunta'

}
