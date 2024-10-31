package proyecto_f1.backend.model.empresa;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "EMPRESA")
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Empresa")
    private Long idEmpresa;

    @Column(name = "Nombre", length = 100, nullable = false)
    private String nombre;

    @Column(name = "Direccion", length = 200, nullable = false)
    private String direccion;

    @Column(name = "Nit", length = 20, nullable = false)
    private String nit;

    @Column(name = "PasswordCantidadMayusculas")
    private Integer passwordCantidadMayusculas;

    @Column(name = "PasswordCantidadMinusculas")
    private Integer passwordCantidadMinusculas;

    @Column(name = "PasswordCantidadCaracteresEspeciales")
    private Integer passwordCantidadCaracteresEspeciales;

    @Column(name = "PasswordCantidadCaducidadDias")
    private Integer passwordCantidadCaducidadDias;

    @Column(name = "PasswordLargo")
    private Integer passwordLargo;

    @Column(name = "PasswordIntentosAntesDeBloquear")
    private Integer passwordIntentosAntesDeBloquear;

    @Column(name = "PasswordCantidadNumeros")
    private Integer passwordCantidadNumeros;

    @Column(name = "PasswordCantidadPreguntasValidar")
    private Integer passwordCantidadPreguntasValidar;

    @Column(name = "Fecha_Creacion", nullable = false)
    private Date fechaCreacion;

    @Column(name = "Usuario_Creacion", length = 100, nullable = false)
    private String usuarioCreacion;

    @Column(name = "Fecha_Modificacion")
    private Date fechaModificacion;

    @Column(name = "Usuario_Modificacion", length = 100)
    private String usuarioModificacion;

    // Getters y Setters

    public Long getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(Long idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getNit() {
        return nit;
    }

    public void setNit(String nit) {
        this.nit = nit;
    }

    public Integer getPasswordCantidadMayusculas() {
        return passwordCantidadMayusculas;
    }

    public void setPasswordCantidadMayusculas(Integer passwordCantidadMayusculas) {
        this.passwordCantidadMayusculas = passwordCantidadMayusculas;
    }

    public Integer getPasswordCantidadMinusculas() {
        return passwordCantidadMinusculas;
    }

    public void setPasswordCantidadMinusculas(Integer passwordCantidadMinusculas) {
        this.passwordCantidadMinusculas = passwordCantidadMinusculas;
    }

    public Integer getPasswordCantidadCaracteresEspeciales() {
        return passwordCantidadCaracteresEspeciales;
    }

    public void setPasswordCantidadCaracteresEspeciales(Integer passwordCantidadCaracteresEspeciales) {
        this.passwordCantidadCaracteresEspeciales = passwordCantidadCaracteresEspeciales;
    }

    public Integer getPasswordCantidadCaducidadDias() {
        return passwordCantidadCaducidadDias;
    }

    public void setPasswordCantidadCaducidadDias(Integer passwordCantidadCaducidadDias) {
        this.passwordCantidadCaducidadDias = passwordCantidadCaducidadDias;
    }

    public Integer getPasswordLargo() {
        return passwordLargo;
    }

    public void setPasswordLargo(Integer passwordLargo) {
        this.passwordLargo = passwordLargo;
    }

    public Integer getPasswordIntentosAntesDeBloquear() {
        return passwordIntentosAntesDeBloquear;
    }

    public void setPasswordIntentosAntesDeBloquear(Integer passwordIntentosAntesDeBloquear) {
        this.passwordIntentosAntesDeBloquear = passwordIntentosAntesDeBloquear;
    }

    public Integer getPasswordCantidadNumeros() {
        return passwordCantidadNumeros;
    }

    public void setPasswordCantidadNumeros(Integer passwordCantidadNumeros) {
        this.passwordCantidadNumeros = passwordCantidadNumeros;
    }

    public Integer getPasswordCantidadPreguntasValidar() {
        return passwordCantidadPreguntasValidar;
    }

    public void setPasswordCantidadPreguntasValidar(Integer passwordCantidadPreguntasValidar) {
        this.passwordCantidadPreguntasValidar = passwordCantidadPreguntasValidar;
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
}
