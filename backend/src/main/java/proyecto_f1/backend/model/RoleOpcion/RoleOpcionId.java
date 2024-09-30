package proyecto_f1.backend.model.RoleOpcion;

import java.io.Serializable;

public class RoleOpcionId implements Serializable {
    private int idRole;
    private int idOpcion;

    // Getters, Setters, hashCode y equals

    public int getIdRole() {
        return idRole;
    }

    public void setIdRole(int idRole) {
        this.idRole = idRole;
    }

    public int getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(int idOpcion) {
        this.idOpcion = idOpcion;
    }

    @Override
    public int hashCode() {
        return idRole + idOpcion;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof RoleOpcionId)) return false;
        RoleOpcionId that = (RoleOpcionId) obj;
        return idRole == that.idRole && idOpcion == that.idOpcion;
    }
}

