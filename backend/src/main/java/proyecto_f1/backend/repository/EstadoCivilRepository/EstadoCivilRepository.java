package proyecto_f1.backend.repository.EstadoCivilRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import proyecto_f1.backend.model.EstadoCivil.EstadoCivil;

public interface EstadoCivilRepository extends JpaRepository<EstadoCivil, Long> {
    // Puedes agregar métodos de consulta personalizados aquí si es necesario
}
