package proyecto_f1.backend.model.SaldoCuenta;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "SALDO_CUENTA")
public class SaldoCuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Saldo_Cuenta")
    private Long idSaldoCuenta;

    @Column(name = "Id_Persona", nullable = false)
    private int idPersona;

    @Column(name = "Id_Status_Cuenta", nullable = false)
    private int idStatusCuenta;

    @Column(name = "Id_Tipo_Saldo_Cuenta", nullable = false)
    private int idTipoSaldoCuenta;

    @Column(name = "Saldo_Anterior")
    private BigDecimal saldoAnterior;

    @Column(name = "Debitos")
    private BigDecimal debitos;

    @Column(name = "Creditos")
    private BigDecimal creditos;

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

    public Long getIdSaldoCuenta() {
        return idSaldoCuenta;
    }

    public void setIdSaldoCuenta(Long idSaldoCuenta) {
        this.idSaldoCuenta = idSaldoCuenta;
    }

    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    public int getIdStatusCuenta() {
        return idStatusCuenta;
    }

    public void setIdStatusCuenta(int idStatusCuenta) {
        this.idStatusCuenta = idStatusCuenta;
    }

    public int getIdTipoSaldoCuenta() {
        return idTipoSaldoCuenta;
    }

    public void setIdTipoSaldoCuenta(int idTipoSaldoCuenta) {
        this.idTipoSaldoCuenta = idTipoSaldoCuenta;
    }

    public BigDecimal getSaldoAnterior() {
        return saldoAnterior;
    }

    public void setSaldoAnterior(BigDecimal saldoAnterior) {
        this.saldoAnterior = saldoAnterior;
    }

    public BigDecimal getDebitos() {
        return debitos;
    }

    public void setDebitos(BigDecimal debitos) {
        this.debitos = debitos;
    }

    public BigDecimal getCreditos() {
        return creditos;
    }

    public void setCreditos(BigDecimal creditos) {
        this.creditos = creditos;
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

