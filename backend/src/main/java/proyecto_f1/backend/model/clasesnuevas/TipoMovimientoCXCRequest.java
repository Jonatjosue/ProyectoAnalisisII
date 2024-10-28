package proyecto_f1.backend.model.clasesnuevas;

import java.util.Date;

public class TipoMovimientoCXCRequest {
    private int Id_Tipo_Movimiento_CXC;
    private String Nombre;
    private int Operacion_Cuenta_Corriente;
    private Date Fecha_Creacion;
    private String Usuario_Creacion;
    private Date Fecha_Modificacion;
    private String Usuario_Modificacion;

    // Getters y Setters
    public int getId_Tipo_Movimiento_CXC() {
        return Id_Tipo_Movimiento_CXC;
    }

    public void setId_Tipo_Movimiento_CXC(int id_Tipo_Movimiento_CXC) {
        Id_Tipo_Movimiento_CXC = id_Tipo_Movimiento_CXC;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public int getOperacion_Cuenta_Corriente() {
        return Operacion_Cuenta_Corriente;
    }

    public void setOperacion_Cuenta_Corriente(int operacion_Cuenta_Corriente) {
        Operacion_Cuenta_Corriente = operacion_Cuenta_Corriente;
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
