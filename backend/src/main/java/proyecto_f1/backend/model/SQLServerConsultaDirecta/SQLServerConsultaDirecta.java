package proyecto_f1.backend.model.SQLServerConsultaDirecta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.ConnectionCallback;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Map;

@Component
public class SQLServerConsultaDirecta {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Método genérico para ejecutar SELECT en TIPO_DOCUMENTO
    public List<Map<String, Object>> obtenerTipoDocumento() {
        String sql = "SELECT Id_Tipo_Documento, Nombre, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion FROM ProyectoAnalisis.dbo.TIPO_DOCUMENTO";
        return jdbcTemplate.queryForList(sql);
    }

    // Método genérico para ejecutar SELECT en TIPO_MOVIMIENTO_CXC
    public List<Map<String, Object>> obtenerTipoMovimientoCXC() {
        String sql = "SELECT Id_Tipo_Movimiento_CXC, Nombre, Operacion_Cuenta_Corriente, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion FROM ProyectoAnalisis.dbo.TIPO_MOVIMIENTO_CXC";
        return jdbcTemplate.queryForList(sql);
    }

    // Método genérico para ejecutar SELECT en TIPO_SALDO_CUENTA
    public List<Map<String, Object>> obtenerTipoSaldoCuenta() {
        String sql = "SELECT Id_Tipo_Saldo_Cuenta, Nombre, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion FROM ProyectoAnalisis.dbo.TIPO_SALDO_CUENTA";
        return jdbcTemplate.queryForList(sql);
    }

    // Método genérico para ejecutar SELECT en SALDO_CUENTA
    public List<Map<String, Object>> obtenerSaldoCuenta() {
        String sql = "SELECT Id_Saldo_Cuenta, Id_Persona, Id_Status_Cuenta, Id_Tipo_Saldo_Cuenta, Saldo_Anterior, Debitos, Creditos, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion FROM ProyectoAnalisis.dbo.SALDO_CUENTA";
        return jdbcTemplate.queryForList(sql);
    }

    // Método genérico para ejecutar SELECT en MOVIMIENTO_CUENTA
    public List<Map<String, Object>> obtenerMovimientoCuenta() {
        String sql = "SELECT Id_Movimiento_Cuenta, Id_Saldo_Cuenta, Id_Tipo_Movimiento_CXC, Fecha_Movimiento, " +
                "Valor_Movimiento, Valor_Movimiento_Pagado, Generado_Automaticamente, Descripcion, " +
                "Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion " +
                "FROM ProyectoAnalisis.dbo.MOVIMIENTO_CUENTA";
        return jdbcTemplate.queryForList(sql);
    }

    // Método genérico para ejecutar INSERT
    public int ejecutarInsert(String sql, Object... params) {
        return jdbcTemplate.update(sql, params);
    }

    // Método para obtener todos los registros en ROLE_OPCION
    public List<Map<String, Object>> obtenerRoleOpcion() {
        String sql = "SELECT Id_Opcion, Alta, Baja, Cambio, Imprimir, Exportar, Fecha_Creacion, Usuario_Creacion, Fecha_Modificacion, Usuario_Modificacion "
                + "FROM ProyectoAnalisis.dbo.ROLE_OPCION";
        return jdbcTemplate.queryForList(sql);
    }

    // Método para insertar en ROLE_OPCION
    public int insertarRoleOpcion(String sql, Object... params) {
        return jdbcTemplate.update(sql, params);
    }

    // Método para actualizar ROLE_OPCION
    public int actualizarRoleOpcion(String sql, Object... params) {
        return jdbcTemplate.update(sql, params);
    }

    // Método para eliminar en ROLE_OPCION
    public int eliminarRoleOpcion(int id) {
        String sql = "DELETE FROM ProyectoAnalisis.dbo.ROLE_OPCION WHERE Id_Opcion = ?";
        return jdbcTemplate.update(sql, id);
    }

    // Método genérico para ejecutar SELECT
    public List<Map<String, Object>> ejecutarConsulta(String sql) {
        return jdbcTemplate.queryForList(sql);
    }

    public List<Map<String, Object>> obtenerRoleOpcionPorNombre(int idRole, String nombreOpcion) {
        String sql = "SELECT * " +
                "FROM [ROLE] r " +
                "JOIN ROLE_OPCION ro ON ro.Id_Role = r.Id_Role " +
                "JOIN OPCION o ON o.Id_Opcion = ro.Id_Opcion " +
                "WHERE r.Id_Role = ? AND o.Nombre = ?";

        return jdbcTemplate.queryForList(sql, idRole, nombreOpcion);
    }

    // Mejorar método para obtener registro por Id_Role y Id_Opcion
    public Map<String, Object> ejecutarConsultaPorIds(String sql, int idRole, int idOpcion) {
        try {
            // Ejecutar la consulta con los parámetros idRole y idOpcion y retornar un solo
            // resultado
            return jdbcTemplate.queryForMap(sql, idRole, idOpcion);
        } catch (EmptyResultDataAccessException e) {
            // Si no encuentra ningún resultado, retorna null o lanza una excepción
            // personalizada
            return null;
        }
    }

    public Map<String, Object> ejecutarConsultaPorId(String sql, int idRole, String nombreOpcion) {
        try {
            // Ejecutar la consulta con los parámetros idRole y nombreOpcion y retornar un
            // solo resultado
            return jdbcTemplate.queryForMap(sql, idRole, nombreOpcion);
        } catch (EmptyResultDataAccessException e) {
            // Si no encuentra ningún resultado, retorna null o lanza una excepción
            // personalizada
            return null;
        }
    }

    // Método para obtener SALDO_CUENTA junto con el nombre del usuario basado en el
    // ID de la persona
    public List<Map<String, Object>> obtenerSaldoCuentaConUsuario(int idPersona) {
        String sql = "SELECT sc.Id_Saldo_Cuenta, sc.Saldo_Anterior, sc.Debitos, sc.Creditos, " +
                "sc.Fecha_Creacion, sc.Usuario_Creacion, sc.Fecha_Modificacion, sc.Usuario_Modificacion, " +
                "p.Nombre AS NombreUsuario " +
                "FROM ProyectoAnalisis.dbo.SALDO_CUENTA sc " +
                "JOIN ProyectoAnalisis.dbo.PERSONA p ON sc.Id_Persona = p.Id_Persona " +
                "WHERE sc.Id_Persona = ?";
        return jdbcTemplate.queryForList(sql, idPersona);
    }

    // Método para ejecutar el procedimiento almacenado "ActualizarSaldoCuenta"
    public int ejecutarProcedimientoActualizarSaldoCuenta(int idSaldoCuenta, int idPersona) {
        String sql = "EXEC ActualizarSaldoCuenta @Id_Saldo_Cuenta = ?, @Id_Persona = ?";
        return jdbcTemplate.update(sql, idSaldoCuenta, idPersona);
    }

}
