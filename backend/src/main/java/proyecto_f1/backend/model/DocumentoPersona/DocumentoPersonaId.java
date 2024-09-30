package proyecto_f1.backend.model.DocumentoPersona;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class DocumentoPersonaId implements Serializable {

    @Column(name = "Id_Tipo_Documento")
    private Long idTipoDocumento;

    @Column(name = "Id_Persona")
    private Long idPersona;

    // Constructor, Getters y Setters

    public DocumentoPersonaId() {
    }

    public DocumentoPersonaId(Long idTipoDocumento, Long idPersona) {
        this.idTipoDocumento = idTipoDocumento;
        this.idPersona = idPersona;
    }

    public Long getIdTipoDocumento() {
        return idTipoDocumento;
    }

    public void setIdTipoDocumento(Long idTipoDocumento) {
        this.idTipoDocumento = idTipoDocumento;
    }

    public Long getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(Long idPersona) {
        this.idPersona = idPersona;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocumentoPersonaId that = (DocumentoPersonaId) o;
        return idTipoDocumento == that.idTipoDocumento &&
               idPersona == that.idPersona;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTipoDocumento, idPersona);
    }
}

