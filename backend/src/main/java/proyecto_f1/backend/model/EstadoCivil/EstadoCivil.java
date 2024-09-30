package proyecto_f1.backend.model.EstadoCivil;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ESTADO_CIVIL")
public class EstadoCivil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Estado_Civil")
    private Long idEstadoCivil;

    @Column(name = "Nombre", length = 50, nullable = false)
    private String nombre;

    @Column(name = "Fecha_Creacion", nullable = false)
    private Date fechaCreacion;

    @Column(name = "Usuario_Creacion", length = 100, nullable = false)
    private String usuarioCreacion;

    @Column(name = "Fecha_Modificacion")
    private Date fechaModificacion;

    @Column(name = "Usuario_Modificacion", length = 100)
    private String usuarioModificacion;

    // Getters y Setters

    public Long getIdEstadoCivil() {
        return idEstadoCivil;
    }

    public void setIdEstadoCivil(Long idEstadoCivil) {
        this.idEstadoCivil = idEstadoCivil;
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

