package proyecto_f1.backend.model.clasesnuevas;

import java.math.BigDecimal;
import java.util.Date;

public class MOVIMIENTOCUENTARequest {
    private int Id_Movimiento_Cuenta;
    private int Id_Saldo_Cuenta;
    private int Id_Tipo_Movimiento_CXC;
    private Date Fecha_Movimiento;
    private BigDecimal Valor_Movimiento;
    private BigDecimal Valor_Movimiento_Pagado;
    private boolean Generado_Automaticamente;
    private String Descripcion;
    private Date Fecha_Creacion;
    private String Usuario_Creacion;
    private Date Fecha_Modificacion;
    private String Usuario_Modificacion;

    // Getters y Setters
    public int getId_Movimiento_Cuenta() {
        return Id_Movimiento_Cuenta;
    }

    public void setId_Movimiento_Cuenta(int id_Movimiento_Cuenta) {
        Id_Movimiento_Cuenta = id_Movimiento_Cuenta;
    }

    public int getId_Saldo_Cuenta() {
        return Id_Saldo_Cuenta;
    }

    public void setId_Saldo_Cuenta(int id_Saldo_Cuenta) {
        Id_Saldo_Cuenta = id_Saldo_Cuenta;
    }

    public int getId_Tipo_Movimiento_CXC() {
        return Id_Tipo_Movimiento_CXC;
    }

    public void setId_Tipo_Movimiento_CXC(int id_Tipo_Movimiento_CXC) {
        Id_Tipo_Movimiento_CXC = id_Tipo_Movimiento_CXC;
    }

    public Date getFecha_Movimiento() {
        return Fecha_Movimiento;
    }

    public void setFecha_Movimiento(Date fecha_Movimiento) {
        Fecha_Movimiento = fecha_Movimiento;
    }

    public BigDecimal getValor_Movimiento() {
        return Valor_Movimiento;
    }

    public void setValor_Movimiento(BigDecimal valor_Movimiento) {
        Valor_Movimiento = valor_Movimiento;
    }

    public BigDecimal getValor_Movimiento_Pagado() {
        return Valor_Movimiento_Pagado;
    }

    public void setValor_Movimiento_Pagado(BigDecimal valor_Movimiento_Pagado) {
        Valor_Movimiento_Pagado = valor_Movimiento_Pagado;
    }

    public boolean isGenerado_Automaticamente() {
        return Generado_Automaticamente;
    }

    public void setGenerado_Automaticamente(boolean generado_Automaticamente) {
        Generado_Automaticamente = generado_Automaticamente;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public void setDescripcion(String descripcion) {
        Descripcion = descripcion;
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