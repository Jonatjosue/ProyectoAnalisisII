package proyecto_f1.backend.model.DocumentoPersona;

import jakarta.persistence.*;
import java.util.Date;
import proyecto_f1.backend.model.Persona.Persona;
import proyecto_f1.backend.model.TipoDocumento.TipoDocumento;

@Entity
@Table(name = "DOCUMENTO_PERSONA")
public class documentoPersona {

    // Clave primaria compuesta: Id_Tipo_Documento + Id_Persona
    @EmbeddedId
    private DocumentoPersonaId id;

    @Column(name = "No_Documento", length = 50)
    private String noDocumento;

    @Column(name = "Fecha_Creacion", nullable = false)
    private Date fechaCreacion;

    @Column(name = "Usuario_Creacion", nullable = false, length = 100)
    private String usuarioCreacion;

    @Column(name = "Fecha_Modificacion")
    private Date fechaModificacion;

    @Column(name = "Usuario_Modificacion", length = 100)
    private String usuarioModificacion;

    // Relación con la entidad Persona
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idPersona")
    @JoinColumn(name = "Id_Persona", referencedColumnName = "Id_Persona", nullable = false)
    private Persona persona;

    // Relación con la entidad TipoDocumento
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idTipoDocumento")
    @JoinColumn(name = "Id_Tipo_Documento", referencedColumnName = "Id_Tipo_Documento", nullable = false)
    private TipoDocumento tipoDocumento;

    // Getters y Setters

    public DocumentoPersonaId getId() {
        return id;
    }

    public void setId(DocumentoPersonaId id) {
        this.id = id;
    }

    public String getNoDocumento() {
        return noDocumento;
    }

    public void setNoDocumento(String noDocumento) {
        this.noDocumento = noDocumento;
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

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }
}

