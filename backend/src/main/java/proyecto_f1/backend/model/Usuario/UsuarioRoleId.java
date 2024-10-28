package proyecto_f1.backend.model.Usuario;

import java.io.Serializable;

public class UsuarioRoleId implements Serializable {
    private Long idUsuario;
    private Long idRole;

    public UsuarioRoleId() {
    }

    public UsuarioRoleId(Long idUsuario, Long idRole) {
        this.idUsuario = idUsuario;
        this.idRole = idRole;
    }

    // Getters y Setters

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdRole() {
        return idRole;
    }

    public void setIdRole(Long idRole) {
        this.idRole = idRole;
    }

    // Equals y hashCode (importante para claves compuestas)
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof UsuarioRoleId))
            return false;
        UsuarioRoleId that = (UsuarioRoleId) o;
        return idUsuario == that.idUsuario && idRole == that.idRole;
    }

    @Override
    public int hashCode() {
        long hashcode = 31 * idUsuario + idRole;
        return (int) hashcode;
    }
}
