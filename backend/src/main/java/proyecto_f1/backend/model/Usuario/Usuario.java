package proyecto_f1.backend.model.Usuario;

import jakarta.persistence.*;
import java.util.Date;
import proyecto_f1.backend.model.StatusUsuario.StatusUsuario;
import proyecto_f1.backend.model.Genero.Genero;
import proyecto_f1.backend.model.Sucursal.Sucursal;

@Entity
@Table(name = "USUARIO")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Usuario")
    private Long idUsuario;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "Apellido", nullable = false, length = 100)
    private String apellido;

    @Column(name = "Fecha_Nacimiento", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;

    @Column(name = "Id_Status_Usuario", nullable = false)
    private String statusUsuario;

    @Column(name = "Password", length = 255)
    private String password;

    @Column(name = "Id_Genero", nullable = false)
    private String idGenero;

    @Column(name = "Ultima_Fecha_Ingreso")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ultimaFechaIngreso;

    @Column(name = "Intentos_De_Acceso")
    private Integer intentosDeAcceso;

    @Column(name = "Sesion_Actual", length = 100)
    private String sesionActual;

    @Column(name = "Ultima_Fecha_Cambio_Password")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ultimaFechaCambioPassword;

    @Column(name = "Correo_Electronico", length = 100)
    private String correoElectronico;

    @Column(name = "Requiere_Cambiar_Password")
    private Boolean requiereCambiarPassword;

    @Column(name = "Fotografia")
    private byte[] fotografia;

    @Column(name = "Telefono_Movil", length = 30)
    private String telefonoMovil;

    @Column(name = "Id_Sucursal", nullable = false)
    private String sucursal;

    @Column(name = "Fecha_Creacion", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaCreacion;

    @Column(name = "Usuario_Creacion", nullable = false, length = 100)
    private String usuarioCreacion;

    @Column(name = "Fecha_Modificacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaModificacion;

    @Column(name = "Usuario_Modificacion", length = 100)
    private String usuarioModificacion;

    @Column(name = "Siguiente_Pregunta_Acceso", nullable = false  )
    private int SiguientePreguntaAcceso;

    public int getSiguientePreguntaAcceso() {
        return SiguientePreguntaAcceso;
    }

    public void setSiguientePreguntaAcceso(int SiguientePreguntaAcceso) {
        this.SiguientePreguntaAcceso = SiguientePreguntaAcceso;
    }

    // Getters y Setters

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getStatusUsuario() {
        return statusUsuario;
    }

    public void setStatusUsuario(String statusUsuario) {
        this.statusUsuario = statusUsuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIdGenero() {
        return idGenero;
    }

    public void setIdGenero(String idGenero) {
        this.idGenero = idGenero;
    }

    public Date getUltimaFechaIngreso() {
        return ultimaFechaIngreso;
    }

    public void setUltimaFechaIngreso(Date ultimaFechaIngreso) {
        this.ultimaFechaIngreso = ultimaFechaIngreso;
    }

    public Integer getIntentosDeAcceso() {
        return intentosDeAcceso;
    }

    public void setIntentosDeAcceso(Integer intentosDeAcceso) {
        this.intentosDeAcceso = intentosDeAcceso;
    }

    public String getSesionActual() {
        return sesionActual;
    }

    public void setSesionActual(String sesionActual) {
        this.sesionActual = sesionActual;
    }

    public Date getUltimaFechaCambioPassword() {
        return ultimaFechaCambioPassword;
    }

    public void setUltimaFechaCambioPassword(Date ultimaFechaCambioPassword) {
        this.ultimaFechaCambioPassword = ultimaFechaCambioPassword;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public Boolean getRequiereCambiarPassword() {
        return requiereCambiarPassword;
    }

    public void setRequiereCambiarPassword(Boolean requiereCambiarPassword) {
        this.requiereCambiarPassword = requiereCambiarPassword;
    }

    public byte[] getFotografia() {
        return fotografia;
    }

    public void setFotografia(byte[] fotografia) {
        this.fotografia = fotografia;
    }

    public String getTelefonoMovil() {
        return telefonoMovil;
    }

    public void setTelefonoMovil(String telefonoMovil) {
        this.telefonoMovil = telefonoMovil;
    }

    public String getSucursal() {
        return sucursal;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
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
