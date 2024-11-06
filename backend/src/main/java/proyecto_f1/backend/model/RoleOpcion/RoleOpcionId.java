package proyecto_f1.backend.model.RoleOpcion;

import java.io.Serializable;
import java.util.Objects;

public class RoleOpcionId implements Serializable {
    private Long idRole;
    private int idOpcion;

    // Default constructor, equals, and hashCode methods

    public RoleOpcionId() {}

    public RoleOpcionId(Long idRole, int idOpcion) {
        this.idRole = idRole;
        this.idOpcion = idOpcion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RoleOpcionId that = (RoleOpcionId) o;
        return idOpcion == that.idOpcion && Objects.equals(idRole, that.idRole);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRole, idOpcion);
    }
}
