package proyecto_f1.backend.repository.StatusCuenta;

import org.springframework.data.jpa.repository.JpaRepository;
import proyecto_f1.backend.model.StatusCuenta.StatusCuenta;

public interface StatusCuentaRepository extends JpaRepository<StatusCuenta, Long> {
    // Aquí puedes agregar consultas personalizadas si las necesitas
}
