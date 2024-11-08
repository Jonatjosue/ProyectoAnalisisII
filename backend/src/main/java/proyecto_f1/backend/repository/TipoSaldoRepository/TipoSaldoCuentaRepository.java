package proyecto_f1.backend.repository.TipoSaldoRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.TipoSaldoCuenta.TipoSaldoCuenta;

@Repository
public interface TipoSaldoCuentaRepository extends JpaRepository<TipoSaldoCuenta, Long> {
    // You can add custom query methods here if needed
}
