package proyecto_f1.backend.repository.CuentaCorrienteRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import proyecto_f1.backend.model.CuentaCorriente.CuentaCorriente;

public interface CuentaCorrienteRepository extends JpaRepository<CuentaCorriente, Integer> {

    // Método para llamar al procedimiento almacenado
    @Procedure(name = "InsertarDatosCuentaCorriente")
    void insertarDatosCuentaCorriente(
            @Param("Id_Tipo_Documento") Integer idTipoDocumento,
            @Param("Id_Persona") Integer idPersona,
            @Param("No_Documento") String noDocumento,
            @Param("Id_Saldo_Cuenta") Integer idSaldoCuenta,
            @Param("Saldo_Anterior") BigDecimal saldoAnterior,
            @Param("Debitos") BigDecimal debitos,
            @Param("Creditos") BigDecimal creditos,
            @Param("Saldo_Fecha_Creacion") LocalDateTime saldoFechaCreacion,
            @Param("Saldo_Usuario_Creacion") String saldoUsuarioCreacion,
            @Param("Status_Cuenta") Integer statusCuenta, // Cambiado a Integer
            @Param("Tipo_Saldo_Cuenta") Integer tipoSaldoCuenta, // Cambiado a Integer
            @Param("Fecha_Movimiento") LocalDateTime fechaMovimiento,
            @Param("Valor_Movimiento") BigDecimal valorMovimiento,
            @Param("Valor_Movimiento_Pagado") BigDecimal valorMovimientoPagado,
            @Param("Generado_Automaticamente") Boolean generadoAutomaticamente, // Boolean para bit
            @Param("Descripcion") String descripcion,
            @Param("Tipo_Movimiento_CXC") Integer tipoMovimientoCXC, // Cambiado a Integer
            @Param("Operacion_Cuenta_Corriente") Integer operacionCuentaCorriente); // Integer

    CuentaCorriente findByIdTipoDocumentoAndIdPersona(Integer idTipoDocumento, Integer idPersona);
}