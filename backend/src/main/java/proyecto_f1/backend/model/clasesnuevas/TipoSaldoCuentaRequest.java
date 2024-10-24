package proyecto_f1.backend.model.clasesnuevas;

import java.util.Date;

public class TipoSaldoCuentaRequest {
    private int Id_Tipo_Saldo_Cuenta;
    private String Nombre;
    private Date Fecha_Creacion;
    private String Usuario_Creacion;
    private Date Fecha_Modificacion;
    private String Usuario_Modificacion;

    // Getters y Setters
    public int getId_Tipo_Saldo_Cuenta() {
        return Id_Tipo_Saldo_Cuenta;
    }

    public void setId_Tipo_Saldo_Cuenta(int id_Tipo_Saldo_Cuenta) {
        Id_Tipo_Saldo_Cuenta = id_Tipo_Saldo_Cuenta;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public Date getFecha_Creacion() {
        return Fecha_Creacion;
    }

    public void setFecha_Creacion(Date fecha_Creacion) {
        Fecha_Creacion = fecha_Creacion;
    }

    public String getUsuario_Creacion() {
        return Usuario_Creacion;
    }

    public void setUsuario_Creacion(String usuario_Creacion) {
        Usuario_Creacion = usuario_Creacion;
    }

    public Date getFecha_Modificacion() {
        return Fecha_Modificacion;
    }

    public void setFecha_Modificacion(Date fecha_Modificacion) {
        Fecha_Modificacion = fecha_Modificacion;
    }

    public String getUsuario_Modificacion() {
        return Usuario_Modificacion;
    }

    public void setUsuario_Modificacion(String usuario_Modificacion) {
        Usuario_Modificacion = usuario_Modificacion;
    }
}
