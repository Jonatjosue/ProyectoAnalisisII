package proyecto_f1.backend.controller.ConsultaSQLControlador;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import proyecto_f1.backend.model.SQLServerConsultaDirecta.SQLServerConsultaDirecta;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@RestController
public class ConsultaSQLControlador {

    @Autowired
    private SQLServerConsultaDirecta consultaDirecta;

    // SELECT TIPO_DOCUMENTO
    @GetMapping("/api/tipo-documento")
    public List<Map<String, Object>> obtenerTipoDocumento() {
        return consultaDirecta.obtenerTipoDocumento();
    }

    // INSERT TIPO_DOCUMENTO (Sin Id_Tipo_Documento)
    @PostMapping("/api/tipo-documento")
    public String insertarTipoDocumento(@RequestBody Map<String, Object> nuevoRegistro) {
        String sql = "INSERT INTO ProyectoAnalisis.dbo.TIPO_DOCUMENTO " +
                "(Nombre, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion) " +
                "VALUES (?, ?, ?, ?, ?)";
        consultaDirecta.ejecutarInsert(sql,
                nuevoRegistro.get("Nombre"),
                convertirFecha(nuevoRegistro.get("Fecha_Creacion")),
                nuevoRegistro.get("Usuario_Creacion"),
                convertirFecha(nuevoRegistro.get("Fecha_Modificacion")),
                nuevoRegistro.get("Usuario_Modificacion"));
        return "Registro insertado con éxito en TIPO_DOCUMENTO";
    }

    // SELECT TIPO_MOVIMIENTO_CXC
    @GetMapping("/api/tipo-movimiento-cxc")
    public List<Map<String, Object>> obtenerTipoMovimientoCXC() {
        return consultaDirecta.obtenerTipoMovimientoCXC();
    }

    // INSERT TIPO_MOVIMIENTO_CXC (Sin Id_Tipo_Movimiento_CXC)
    @PostMapping("/api/tipo-movimiento-cxc")
    public String insertarTipoMovimientoCXC(@RequestBody Map<String, Object> nuevoRegistro) {
        String sql = "INSERT INTO ProyectoAnalisis.dbo.TIPO_MOVIMIENTO_CXC " +
                "(Nombre, Operacion_Cuenta_Corriente, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion) "
                +
                "VALUES (?, ?, ?, ?, ?, ?)";
        consultaDirecta.ejecutarInsert(sql,
                nuevoRegistro.get("Nombre"),
                nuevoRegistro.get("Operacion_Cuenta_Corriente"),
                convertirFecha(nuevoRegistro.get("Fecha_Creacion")),
                nuevoRegistro.get("Usuario_Creacion"),
                convertirFecha(nuevoRegistro.get("Fecha_Modificacion")),
                nuevoRegistro.get("Usuario_Modificacion"));
        return "Registro insertado con éxito en TIPO_MOVIMIENTO_CXC";
    }

    // SELECT TIPO_SALDO_CUENTA
    @GetMapping("/api/tipo-saldo-cuenta")
    public List<Map<String, Object>> obtenerTipoSaldoCuenta() {
        return consultaDirecta.obtenerTipoSaldoCuenta();
    }

    // INSERT TIPO_SALDO_CUENTA (Sin Id_Tipo_Saldo_Cuenta)
    @PostMapping("/api/tipo-saldo-cuenta")
    public String insertarTipoSaldoCuenta(@RequestBody Map<String, Object> nuevoRegistro) {
        String sql = "INSERT INTO ProyectoAnalisis.dbo.TIPO_SALDO_CUENTA " +
                "(Nombre, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion) " +
                "VALUES (?, ?, ?, ?, ?)";
        consultaDirecta.ejecutarInsert(sql,
                nuevoRegistro.get("Nombre"),
                convertirFecha(nuevoRegistro.get("Fecha_Creacion")),
                nuevoRegistro.get("Usuario_Creacion"),
                convertirFecha(nuevoRegistro.get("Fecha_Modificacion")),
                nuevoRegistro.get("Usuario_Modificacion"));
        return "Registro insertado con éxito en TIPO_SALDO_CUENTA";
    }

    // SELECT SALDO_CUENTA
    @GetMapping("/api/saldo-cuenta")
    public List<Map<String, Object>> obtenerSaldoCuenta() {
        return consultaDirecta.obtenerSaldoCuenta();
    }

    // INSERT SALDO_CUENTA (Sin Id_Saldo_Cuenta)
    @PostMapping("/api/saldo-cuenta")
    public String insertarSaldoCuenta(@RequestBody Map<String, Object> nuevoRegistro) {
        String sql = "INSERT INTO ProyectoAnalisis.dbo.SALDO_CUENTA " +
                "(Id_Persona, Id_Status_Cuenta, Id_Tipo_Saldo_Cuenta, Saldo_Anterior, Debitos, Creditos, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion) "
                +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        consultaDirecta.ejecutarInsert(sql,
                nuevoRegistro.get("Id_Persona"),
                nuevoRegistro.get("Id_Status_Cuenta"),
                nuevoRegistro.get("Id_Tipo_Saldo_Cuenta"),
                nuevoRegistro.get("Saldo_Anterior"),
                nuevoRegistro.get("Debitos"),
                nuevoRegistro.get("Creditos"),
                convertirFecha(nuevoRegistro.get("Fecha_Creacion")),
                nuevoRegistro.get("Usuario_Creacion"),
                convertirFecha(nuevoRegistro.get("Fecha_Modificacion")),
                nuevoRegistro.get("Usuario_Modificacion"));
        return "Registro insertado con éxito en SALDO_CUENTA";
    }

    // SELECT MOVIMIENTO_CUENTA
    @GetMapping("/api/movimiento-cuenta")
    public List<Map<String, Object>> obtenerMovimientoCuenta() {
        return consultaDirecta.obtenerMovimientoCuenta();
    }

    // INSERT MOVIMIENTO_CUENTA (con conversión de fechas)
    @PostMapping("/api/movimiento-cuenta")
    public String insertarMovimientoCuenta(@RequestBody Map<String, Object> nuevoRegistro) {
        String sql = "INSERT INTO ProyectoAnalisis.dbo.MOVIMIENTO_CUENTA " +
                "(Id_Saldo_Cuenta, Id_Tipo_Movimiento_CXC, Fecha_Movimiento, Valor_Movimiento, " +
                "Valor_Movimiento_Pagado, Generado_Automaticamente, Descripcion, Fecha_Creacion, " +
                "Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        // Convertir fechas a Timestamp
        Timestamp fechaMovimiento = convertirFecha(nuevoRegistro.get("Fecha_Movimiento"));
        Timestamp fechaCreacion = convertirFecha(nuevoRegistro.get("Fecha_Creacion"));
        Timestamp fechaModificacion = convertirFecha(nuevoRegistro.get("Fecha_Modificacion"));

        consultaDirecta.ejecutarInsert(sql,
                nuevoRegistro.get("Id_Saldo_Cuenta"),
                nuevoRegistro.get("Id_Tipo_Movimiento_CXC"),
                fechaMovimiento,
                nuevoRegistro.get("Valor_Movimiento"),
                nuevoRegistro.get("Valor_Movimiento_Pagado"),
                nuevoRegistro.get("Generado_Automaticamente"),
                nuevoRegistro.get("Descripcion"),
                fechaCreacion,
                nuevoRegistro.get("Usuario_Creacion"),
                fechaModificacion,
                nuevoRegistro.get("Usuario_Modificacion"));

        return "Registro insertado con éxito en MOVIMIENTO_CUENTA";
    }

    // SELECT ROLE_OPCION
    @GetMapping("/api/role-opcion")
    public List<Map<String, Object>> obtenerRoleOpcion() {
        String sql = "SELECT Id_Opcion, Alta, Baja, Cambio, Imprimir, Exportar, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion "
                +
                "FROM ProyectoAnalisis.dbo.ROLE_OPCION";
        return consultaDirecta.ejecutarConsulta(sql);
    }

    @GetMapping("/api/role-opcion/{idRole}/{idOpcion}")
    public Map<String, Object> obtenerRoleOpcionPorIds(@PathVariable int idRole, @PathVariable int idOpcion) {
        String sql = "SELECT Id_Opcion, Alta, Baja, Cambio, Imprimir, Exportar, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion "
                +
                "FROM ProyectoAnalisis.dbo.ROLE_OPCION WHERE Id_Role = ? AND Id_Opcion = ?";
        return consultaDirecta.ejecutarConsultaPorIds(sql, idRole, idOpcion);
    }

    // INSERT ROLE_OPCION (Sin Id_Opcion)
    @PostMapping("/api/role-opcion")
    public String insertarRoleOpcion(@RequestBody Map<String, Object> nuevoRegistro) {
        String sql = "INSERT INTO ProyectoAnalisis.dbo.ROLE_OPCION " +
                "(Alta, Baja, Cambio, Imprimir, Exportar, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion) "
                +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        consultaDirecta.ejecutarInsert(sql,
                nuevoRegistro.get("Alta"),
                nuevoRegistro.get("Baja"),
                nuevoRegistro.get("Cambio"),
                nuevoRegistro.get("Imprimir"),
                nuevoRegistro.get("Exportar"),
                convertirFecha(nuevoRegistro.get("Fecha_Creacion")),
                nuevoRegistro.get("Usuario_Creacion"),
                convertirFecha(nuevoRegistro.get("Fecha_Modificacion")),
                nuevoRegistro.get("Usuario_Modificacion"));
        return "Registro insertado con éxito en ROLE_OPCION";
    }

    // Actualizar ROLE_OPCION
    @PutMapping("/api/role-opcion/{id}")
    public String actualizarRoleOpcion(@PathVariable int id, @RequestBody Map<String, Object> registroActualizado) {
        String sql = "UPDATE ProyectoAnalisis.dbo.ROLE_OPCION " +
                "SET Alta = ?, Baja = ?, Cambio = ?, Imprimir = ?, Exportar = ?, Fecha_Modificacion = ?, Usuario_Modificacion = ? "
                +
                "WHERE Id_Opcion = ?";
        consultaDirecta.ejecutarInsert(sql,
                registroActualizado.get("Alta"),
                registroActualizado.get("Baja"),
                registroActualizado.get("Cambio"),
                registroActualizado.get("Imprimir"),
                registroActualizado.get("Exportar"),
                convertirFecha(registroActualizado.get("Fecha_Modificacion")),
                registroActualizado.get("Usuario_Modificacion"),
                id);
        return "Registro actualizado con éxito en ROLE_OPCION";
    }

    // Eliminar ROLE_OPCION
    @DeleteMapping("/api/role-opcion/{id}")
    public String eliminarRoleOpcion(@PathVariable int id) {
        String sql = "DELETE FROM ProyectoAnalisis.dbo.ROLE_OPCION WHERE Id_Opcion = ?";
        consultaDirecta.ejecutarInsert(sql, id);
        return "Registro eliminado con éxito en ROLE_OPCION";
    }

    // Método para convertir fechas a Timestamp
    private Timestamp convertirFecha(Object fecha) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            return new Timestamp(dateFormat.parse(fecha.toString()).getTime());
        } catch (ParseException e) {
            throw new RuntimeException("Error al convertir la fecha: " + fecha, e);
        }
    }

    @GetMapping("/api/role-opcion-por-nombre/{idRole}/{nombreOpcion}")
    public Map<String, Object> obtenerRoleOpcionPorNombre(
            @PathVariable("idRole") int idRole,
            @PathVariable("nombreOpcion") String nombreOpcion) {

        String sql = "SELECT r.Id_Role, ro.Id_Opcion, ro.Alta, ro.Baja, ro.Cambio, ro.Imprimir, ro.Exportar, o.Nombre, "
                +
                "ro.Fecha_Creacion, ro.Usuario_Creacion " +
                "FROM [ROLE] r " +
                "JOIN ROLE_OPCION ro ON ro.Id_Role = r.Id_Role " +
                "JOIN OPCION o ON o.Id_Opcion = ro.Id_Opcion " +
                "WHERE r.Id_Role = ? AND o.Nombre = ?";

        return consultaDirecta.ejecutarConsultaPorId(sql, idRole, nombreOpcion);
    }

}