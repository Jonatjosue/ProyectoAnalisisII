package proyecto_f1.backend.model.TipoSaldoCuenta;


import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TIPO_SALDO_CUENTA")
public class TipoSaldoCuenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Tipo_Saldo_Cuenta")
    private Long idTipoSaldoCuenta;

    @Column(name = "Nombre", length = 50)
    private String nombre;

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

    public Long getIdTipoSaldoCuenta() {
        return idTipoSaldoCuenta;
    }

    public void setIdTipoSaldoCuenta(Long idTipoSaldoCuenta) {
        this.idTipoSaldoCuenta = idTipoSaldoCuenta;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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

