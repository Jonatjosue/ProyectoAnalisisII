package proyecto_f1.backend.model.UsuarioPregunta;


import jakarta.persistence.*;
import java.util.Date;
import proyecto_f1.backend.model.Usuario.Usuario;

@Entity
@Table(name = "USUARIO_PREGUNTA")
public class UsuarioPregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Pregunta")
    private Long idPregunta;

    @ManyToOne
    @JoinColumn(name = "Id_Usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "Pregunta", nullable = false, length = 100)
    private String pregunta;

    @Column(name = "Respuesta", nullable = false, length = 100)
    private String respuesta;

    @Column(name = "Orden_Pregunta", nullable = false)
    private int ordenPregunta;

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

    // Getters y Setters

    public int getSiguientePreguntaAcceso() {
        return SiguientePreguntaAcceso;
    }

    public void setSiguientePreguntaAcceso(int SiguientePreguntaAcceso) {
        this.SiguientePreguntaAcceso = SiguientePreguntaAcceso;
    }

    public Long getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(Long idPregunta) {
        this.idPregunta = idPregunta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public int getOrdenPregunta() {
        return ordenPregunta;
    }

    public void setOrdenPregunta(int ordenPregunta) {
        this.ordenPregunta = ordenPregunta;
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

