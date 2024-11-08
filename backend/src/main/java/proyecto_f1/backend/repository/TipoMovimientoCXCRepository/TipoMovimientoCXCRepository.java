package proyecto_f1.backend.repository.TipoMovimientoCXCRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import proyecto_f1.backend.model.TipoMovimientoCXC.TipoMovimientoCXC;

import java.util.Date;
import java.util.Optional;

@Repository
public interface TipoMovimientoCXCRepository extends JpaRepository<TipoMovimientoCXC, Long> {

    @SuppressWarnings("null")
    @Query(value = "SELECT * FROM TIPO_MOVIMIENTO_CXC WHERE Id_Tipo_Movimiento_CXC = ?1", nativeQuery = true)
    Optional<TipoMovimientoCXC> findById(Long id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO TIPO_MOVIMIENTO_CXC (Nombre, Operacion_Cuenta_Corriente, Fecha_Creacion, Usuario_Creacion) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void saveTipoMovimiento(String nombre, int operacionCuentaCorriente, Date fechaCreacion, String usuarioCreacion);

    @Transactional
    @Modifying
    @Query(value = "UPDATE TIPO_MOVIMIENTO_CXC SET Nombre = ?2, Operacion_Cuenta_Corriente = ?3, Fecha_Modificacion = ?4, Usuario_Modificacion = ?5 WHERE Id_Tipo_Movimiento_CXC = ?1", nativeQuery = true)
    void updateTipoMovimiento(Long id, String nombre, int operacionCuentaCorriente, Date fechaModificacion,
            String usuarioModificacion);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM TIPO_MOVIMIENTO_CXC WHERE Id_Tipo_Movimiento_CXC = ?1", nativeQuery = true)
    void deleteById(@SuppressWarnings("null") Long id);

}