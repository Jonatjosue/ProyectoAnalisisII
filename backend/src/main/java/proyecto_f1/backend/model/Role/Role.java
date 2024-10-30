package proyecto_f1.backend.model.Role;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "ROLE")  // Especificar el nombre exacto de la tabla existente
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Role")
    private Long idRole;

    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Fecha_Creacion")
    private Date fechaCreacion;

    @Column(name = "Usuario_Creacion")
    private String usuarioCreacion;

    @Column(name = "Fecha_Modificacion")
    private Date fechaModificacion;

    @Column(name = "Usuario_Modificacion")
    private String usuarioModificacion;


    // Getters y Setters

    public Long getIdRole() {
        return idRole;
    }

    public void setIdRole(Long idRole) {
        this.idRole = idRole;
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
