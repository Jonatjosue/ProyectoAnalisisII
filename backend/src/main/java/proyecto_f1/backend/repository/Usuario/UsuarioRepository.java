package proyecto_f1.backend.repository.Usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.Usuario.*;
import java.util.Optional;
import java.util.List;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

   Optional<Usuario> findByNombre(String nombre);
   Optional<Usuario> findByCorreoElectronico(String correoElectronico);

}
