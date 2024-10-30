package proyecto_f1.backend.repository.StatusUsuarioRepository;


import proyecto_f1.backend.model.StatusUsuario.StatusUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusUsuarioRepository extends JpaRepository<StatusUsuario, Long> {
}
