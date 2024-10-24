package proyecto_f1.backend.model.clasesnuevas;

import java.util.Date;

public class TipoDocumentoRequest {
    private int Id_Tipo_Documento;
    private String Nombre;
    private Date Fecha_Creacion;
    private String Usuario_Creacion;
    private Date Fecha_Modificacion;
    private String Usuario_Modificacion;

    // Getters y Setters
    public int getId_Tipo_Documento() {
        return Id_Tipo_Documento;
    }

    public void setId_Tipo_Documento(int id_Tipo_Documento) {
        Id_Tipo_Documento = id_Tipo_Documento;
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
