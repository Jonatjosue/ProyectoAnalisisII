package proyecto_f1.backend.model.CuentaCorriente;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "vwCuentaCorriente")

public class CuentaCorriente {

    @Id
    @Column(name = "Id_Tipo_Documento")
    private Integer idTipoDocumento;

    public Integer getIdTipoDocumento() {
        return idTipoDocumento;
    }

    public void setIdTipoDocumento(Integer idTipoDocumento) {
        this.idTipoDocumento = idTipoDocumento;
    }

    @Column(name = "Id_Persona")
    private Integer idPersona;

    public Integer getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(Integer idPersona) {
        this.idPersona = idPersona;
    }

    public String getNoDocumento() {
        return noDocumento;
    }

    public void setNoDocumento(String noDocumento) {
        this.noDocumento = noDocumento;
    }

    @Column(name = "No_Documento")
    private String noDocumento;

    public Integer getIdSaldoCuenta() {
        return idSaldoCuenta;
    }

    public void setIdSaldoCuenta(Integer idSaldoCuenta) {
        this.idSaldoCuenta = idSaldoCuenta;
    }

    @Column(name = "Id_Saldo_Cuenta")
    private Integer idSaldoCuenta;

    public BigDecimal getSaldoAnterior() {
        return saldoAnterior;
    }

    public void setSaldoAnterior(BigDecimal saldoAnterior) {
        this.saldoAnterior = saldoAnterior;
    }

    @Column(name = "Saldo_Anterior")
    private BigDecimal saldoAnterior;

    @Column(name = "Debitos")
    private BigDecimal debitos;

    public BigDecimal getDebitos() {
        return debitos;
    }

    public void setDebitos(BigDecimal debitos) {
        this.debitos = debitos;
    }

    @Column(name = "Creditos")
    private BigDecimal creditos;

    public BigDecimal getCreditos() {
        return creditos;
    }

    public void setCreditos(BigDecimal creditos) {
        this.creditos = creditos;
    }

    @Column(name = "Saldo_Fecha_Creacion")
    private LocalDateTime saldoFechaCreacion;

    public LocalDateTime getSaldoFechaCreacion() {
        return saldoFechaCreacion;
    }

    public void setSaldoFechaCreacion(LocalDateTime saldoFechaCreacion) {
        this.saldoFechaCreacion = saldoFechaCreacion;
    }

    @Column(name = "Saldo_Usuario_Creacion")
    private String saldoUsuarioCreacion;

    public String getSaldoUsuarioCreacion() {
        return saldoUsuarioCreacion;
    }

    public void setSaldoUsuarioCreacion(String saldoUsuarioCreacion) {
        this.saldoUsuarioCreacion = saldoUsuarioCreacion;
    }

    @Column(name = "Saldo_Fecha_Modificacion")
    private LocalDateTime saldoFechaModificacion;

    public LocalDateTime getSaldoFechaModificacion() {
        return saldoFechaModificacion;
    }

    public void setSaldoFechaModificacion(LocalDateTime saldoFechaModificacion) {
        this.saldoFechaModificacion = saldoFechaModificacion;
    }

    @Column(name = "Saldo_Usuario_Modificacion")
    private String saldoUsuarioModificacion;

    public String getSaldoUsuarioModificacion() {
        return saldoUsuarioModificacion;
    }

    public void setSaldoUsuarioModificacion(String saldoUsuarioModificacion) {
        this.saldoUsuarioModificacion = saldoUsuarioModificacion;
    }

    @Column(name = "Status_Cuenta")
    private String statusCuenta;

    public String getStatusCuenta() {
        return statusCuenta;
    }

    public void setStatusCuenta(String statusCuenta) {
        this.statusCuenta = statusCuenta;
    }

    @Column(name = "Tipo_Saldo_Cuenta")
    private String tipoSaldoCuenta;

    public String getTipoSaldoCuenta() {
        return tipoSaldoCuenta;
    }

    public void setTipoSaldoCuenta(String tipoSaldoCuenta) {
        this.tipoSaldoCuenta = tipoSaldoCuenta;
    }

    @Column(name = "Fecha_Movimiento")
    private LocalDateTime fechaMovimiento;

    public LocalDateTime getFechaMovimiento() {
        return fechaMovimiento;
    }

    public void setFechaMovimiento(LocalDateTime fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento;
    }

    @Column(name = "Valor_Movimiento")
    private BigDecimal valorMovimiento;

    public BigDecimal getValorMovimiento() {
        return valorMovimiento;
    }

    public void setValorMovimiento(BigDecimal valorMovimiento) {
        this.valorMovimiento = valorMovimiento;
    }

    @Column(name = "Valor_Movimiento_Pagado")
    private BigDecimal valorMovimientoPagado;

    public BigDecimal getValorMovimientoPagado() {
        return valorMovimientoPagado;
    }

    public void setValorMovimientoPagado(BigDecimal valorMovimientoPagado) {
        this.valorMovimientoPagado = valorMovimientoPagado;
    }

    @Column(name = "Generado_Automaticamente")
    private Boolean generadoAutomaticamente;

    public Boolean getGeneradoAutomaticamente() {
        return generadoAutomaticamente;
    }

    public void setGeneradoAutomaticamente(Boolean generadoAutomaticamente) {
        this.generadoAutomaticamente = generadoAutomaticamente;
    }

    @Column(name = "Descripcion")
    private String descripcion;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Column(name = "Tipo_Movimiento_CXC")
    private String tipoMovimientoCXC;

    public String getTipoMovimientoCXC() {
        return tipoMovimientoCXC;
    }

    public void setTipoMovimientoCXC(String tipoMovimientoCXC) {
        this.tipoMovimientoCXC = tipoMovimientoCXC;
    }

    @Column(name = "Operacion_Cuenta_Corriente")
    private Integer operacionCuentaCorriente;

    public Integer getOperacionCuentaCorriente() {
        return operacionCuentaCorriente;
    }

    public void setOperacionCuentaCorriente(Integer operacionCuentaCorriente) {
        this.operacionCuentaCorriente = operacionCuentaCorriente;
    }

}
