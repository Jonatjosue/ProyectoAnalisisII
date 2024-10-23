package proyecto_f1.backend.model.Navbar;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "OPCION")
public class OpcionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Opcion")
    private Long idOpcion;

    @Column(name = "Id_Menu")
    private Long idMenu;
    
    @Column(name = "Nombre")
    private String nombre;

    @Column(name = "Orden_Menu")
    private Integer ordenMenu;

    @Column(name = "Fecha_Creacion")
    private Date fechaCreacion;

    @Column(name = "Usuario_Creacion")
    private String usuarioCreacion;

    @Column(name = "Fecha_Modificacion")
    private Date fechaModificacion;

    @Column(name = "Usuario_Modificacion")
    private String usuarioModificacion;

    // Getters and Setters

    public Long getIdMenu() {
        return idMenu;
    }

    public void setIdMenu(Long idMenu) {
        this.idMenu = idMenu;
    }

    public Long getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(Long idOpcion) {
        this.idOpcion = idOpcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getOrdenMenu() {
        return ordenMenu;
    }

    public void setOrdenMenu(Integer ordenMenu) {
        this.ordenMenu = ordenMenu;
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
