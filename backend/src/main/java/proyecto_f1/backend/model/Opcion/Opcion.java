package proyecto_f1.backend.model.Opcion;


import proyecto_f1.backend.model.Menu.Menu;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "OPCION")
public class Opcion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Opcion")
    private Long idOpcion;

    @ManyToOne
    @JoinColumn(name = "Id_Menu", nullable = false)
    private Menu menu;

    @Column(name = "Nombre", nullable = false, length = 50)
    private String nombre;

    @Column(name = "Orden_Menu", nullable = false)
    private int ordenMenu;

    @Column(name = "Pagina", nullable = false, length = 100)
    private String pagina;

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

    // Getters y Setters

    public Long getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(Long idOpcion) {
        this.idOpcion = idOpcion;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getOrdenMenu() {
        return ordenMenu;
    }

    public void setOrdenMenu(int ordenMenu) {
        this.ordenMenu = ordenMenu;
    }

    public String getPagina() {
        return pagina;
    }

    public void setPagina(String pagina) {
        this.pagina = pagina;
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
