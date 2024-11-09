package proyecto_f1.backend.repository.TipoSaldoCuentaRepository;

import proyecto_f1.backend.model.TipoSaldoCuenta.TipoSaldoCuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TipoSaldoCuentaRepository extends JpaRepository<TipoSaldoCuenta, Long> {

    List<TipoSaldoCuenta> findByNombre(String nombre);
}
