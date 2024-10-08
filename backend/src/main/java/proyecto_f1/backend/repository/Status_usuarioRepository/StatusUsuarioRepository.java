package proyecto_f1.backend.repository.Status_usuarioRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import proyecto_f1.backend.model.StatusUsuario.StatusUsuario;;

public interface StatusUsuarioRepository extends JpaRepository<StatusUsuario, Long> { 
    
}
