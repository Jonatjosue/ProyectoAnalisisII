package proyecto_f1.backend.model.TipoMovimientoCXC;


import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "TIPO_MOVIMIENTO_CXC")
public class TipoMovimientoCXC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Tipo_Movimiento_CXC")
    private Long idTipoMovimientoCXC;

    @Column(name = "Nombre", nullable = false, length = 75)
    private String nombre;

    @Column(name = "Operacion_Cuenta_Corriente", nullable = false)
    private int operacionCuentaCorriente;

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

    public Long getIdTipoMovimientoCXC() {
        return idTipoMovimientoCXC;
    }

    public void setIdTipoMovimientoCXC(Long idTipoMovimientoCXC) {
        this.idTipoMovimientoCXC = idTipoMovimientoCXC;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getOperacionCuentaCorriente() {
        return operacionCuentaCorriente;
    }

    public void setOperacionCuentaCorriente(int operacionCuentaCorriente) {
        this.operacionCuentaCorriente = operacionCuentaCorriente;
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

