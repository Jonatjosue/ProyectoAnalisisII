package proyecto_f1.backend.model.RoleOpcion;


import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ROLE_OPCION")
@IdClass(RoleOpcionId.class)
public class RoleOpcion {

    @Id
    @Column(name = "Id_Role")
    private Long idRole;

    @Id
    @Column(name = "Id_Opcion")
    private int idOpcion;

    @Column(name = "Alta", nullable = false)
    private boolean alta;

    @Column(name = "Baja", nullable = false)
    private boolean baja;

    @Column(name = "Cambio", nullable = false)
    private boolean cambio;

    @Column(name = "Imprimir", nullable = false)
    private boolean imprimir;

    @Column(name = "Exportar", nullable = false)
    private boolean exportar;

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

    public Long getIdRole() {
        return idRole;
    }

    public void setIdRole(Long idRole) {
        this.idRole = idRole;
    }

    public int getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(int idOpcion) {
        this.idOpcion = idOpcion;
    }

    public boolean isAlta() {
        return alta;
    }

    public void setAlta(boolean alta) {
        this.alta = alta;
    }

    public boolean isBaja() {
        return baja;
    }

    public void setBaja(boolean baja) {
        this.baja = baja;
    }

    public boolean isCambio() {
        return cambio;
    }

    public void setCambio(boolean cambio) {
        this.cambio = cambio;
    }

    public boolean isImprimir() {
        return imprimir;
    }

    public void setImprimir(boolean imprimir) {
        this.imprimir = imprimir;
    }

    public boolean isExportar() {
        return exportar;
    }

    public void setExportar(boolean exportar) {
        this.exportar = exportar;
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

