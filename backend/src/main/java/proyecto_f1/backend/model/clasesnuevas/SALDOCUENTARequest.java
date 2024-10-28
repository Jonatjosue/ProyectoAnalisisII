package proyecto_f1.backend.model.clasesnuevas;

import java.math.BigDecimal;
import java.util.Date;

public class SALDOCUENTARequest {
    private int Id_Saldo_Cuenta;
    private int Id_Persona;
    private int Id_Status_Cuenta;
    private int Id_Tipo_Saldo_Cuenta;
    private BigDecimal Saldo_Anterior;
    private BigDecimal Debitos;
    private BigDecimal Creditos;
    private Date Fecha_Creacion;
    private String Usuario_Creacion;
    private Date Fecha_Modificacion;
    private String Usuario_Modificacion;

    // Getters y Setters
    public int getId_Saldo_Cuenta() {
        return Id_Saldo_Cuenta;
    }

    public void setId_Saldo_Cuenta(int id_Saldo_Cuenta) {
        Id_Saldo_Cuenta = id_Saldo_Cuenta;
    }

    public int getId_Persona() {
        return Id_Persona;
    }

    public void setId_Persona(int id_Persona) {
        Id_Persona = id_Persona;
    }

    public int getId_Status_Cuenta() {
        return Id_Status_Cuenta;
    }

    public void setId_Status_Cuenta(int id_Status_Cuenta) {
        Id_Status_Cuenta = id_Status_Cuenta;
    }

    public int getId_Tipo_Saldo_Cuenta() {
        return Id_Tipo_Saldo_Cuenta;
    }

    public void setId_Tipo_Saldo_Cuenta(int id_Tipo_Saldo_Cuenta) {
        Id_Tipo_Saldo_Cuenta = id_Tipo_Saldo_Cuenta;
    }

    public BigDecimal getSaldo_Anterior() {
        return Saldo_Anterior;
    }

    public void setSaldo_Anterior(BigDecimal saldo_Anterior) {
        Saldo_Anterior = saldo_Anterior;
    }

    public BigDecimal getDebitos() {
        return Debitos;
    }

    public void setDebitos(BigDecimal debitos) {
        Debitos = debitos;
    }

    public BigDecimal getCreditos() {
        return Creditos;
    }

    public void setCreditos(BigDecimal creditos) {
        Creditos = creditos;
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