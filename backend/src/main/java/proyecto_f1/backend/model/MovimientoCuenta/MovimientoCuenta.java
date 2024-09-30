package proyecto_f1.backend.model.MovimientoCuenta;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import proyecto_f1.backend.model.SaldoCuenta.SaldoCuenta;
import proyecto_f1.backend.model.TipoMovimientoCXC.TipoMovimientoCXC;
@Entity
@Table(name = "MOVIMIENTO_CUENTA")
public class MovimientoCuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Movimiento_Cuenta")
    private Long idMovimientoCuenta;

    @ManyToOne
    @JoinColumn(name = "Id_Saldo_Cuenta", nullable = false)
    private SaldoCuenta saldoCuenta;

    @ManyToOne
    @JoinColumn(name = "Id_Tipo_Movimiento_CXC", nullable = false)
    private TipoMovimientoCXC tipoMovimientoCXC;

    @Column(name = "Fecha_Movimiento", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaMovimiento;

    @Column(name = "Valor_Movimiento", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorMovimiento;

    @Column(name = "Valor_Movimiento_Pagado", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorMovimientoPagado;

    @Column(name = "Generado_Automaticamente", nullable = false)
    private boolean generadoAutomaticamente;

    @Column(name = "Descripcion", nullable = false, length = 75)
    private String descripcion;

    @Column(name = "Fecha_Creacion", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;

    @Column(name = "Usuario_Creacion", nullable = false, length = 100)
    private String usuarioCreacion;

    @Column(name = "Fecha_Modificacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaModificacion;

    @Column(name = "Usuario_Modificacion", length = 100)
    private String usuarioModificacion;

    // Getters y Setters

    public Long getIdMovimientoCuenta() {
        return idMovimientoCuenta;
    }

    public void setIdMovimientoCuenta(Long idMovimientoCuenta) {
        this.idMovimientoCuenta = idMovimientoCuenta;
    }

    public SaldoCuenta getSaldoCuenta() {
        return saldoCuenta;
    }

    public void setSaldoCuenta(SaldoCuenta saldoCuenta) {
        this.saldoCuenta = saldoCuenta;
    }

    public TipoMovimientoCXC getTipoMovimientoCXC() {
        return tipoMovimientoCXC;
    }

    public void setTipoMovimientoCXC(TipoMovimientoCXC tipoMovimientoCXC) {
        this.tipoMovimientoCXC = tipoMovimientoCXC;
    }

    public Date getFechaMovimiento() {
        return fechaMovimiento;
    }

    public void setFechaMovimiento(Date fechaMovimiento) {
        this.fechaMovimiento = fechaMovimiento;
    }

    public BigDecimal getValorMovimiento() {
        return valorMovimiento;
    }

    public void setValorMovimiento(BigDecimal valorMovimiento) {
        this.valorMovimiento = valorMovimiento;
    }

    public BigDecimal getValorMovimientoPagado() {
        return valorMovimientoPagado;
    }

    public void setValorMovimientoPagado(BigDecimal valorMovimientoPagado) {
        this.valorMovimientoPagado = valorMovimientoPagado;
    }

    public boolean isGeneradoAutomaticamente() {
        return generadoAutomaticamente;
    }

    public void setGeneradoAutomaticamente(boolean generadoAutomaticamente) {
        this.generadoAutomaticamente = generadoAutomaticamente;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public Date getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Date fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public String getUsuarioModificacion() {
        return usuarioModificacion;
    }

    public void setUsuarioModificacion(String usuarioModificacion) {
        this.usuarioModificacion = usuarioModificacion;
    }
}

