package proyecto_f1.backend.service.CuentaCorrienteService;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.CuentaCorriente.CuentaCorriente;
import proyecto_f1.backend.repository.CuentaCorrienteRepository.CuentaCorrienteRepository;

@Service
public class CuentaCorrienteService {

    @Autowired
    private CuentaCorrienteRepository cuentaCorrienteRepository;

    // Obtener todas las cuentas corrientes
    public List<CuentaCorriente> findAll() {
        return cuentaCorrienteRepository.findAll();
    }

    // Buscar una cuenta corriente por su ID
    public CuentaCorriente findById(Integer id) {
        return cuentaCorrienteRepository.findById(id).orElse(null);
    }

    // Buscar una cuenta corriente por idTipoDocumento y idPersona
    public CuentaCorriente findByIdTipoDocumentoAndIdPersona(Integer idTipoDocumento, Integer idPersona) {
        return cuentaCorrienteRepository.findByIdTipoDocumentoAndIdPersona(idTipoDocumento, idPersona);
    }

    // Método que llama al procedimiento almacenado para insertar una cuenta
    // corriente
    public void insertarCuentaCorriente(CuentaCorriente cuentaCorriente) {
        try {
            // Conversión de tipos para asegurarse de que StatusCuenta, TipoSaldoCuenta y
            // TipoMovimientoCXC sean Integer
            Integer statusCuenta = cuentaCorriente.getStatusCuenta() != null
                    ? Integer.parseInt(cuentaCorriente.getStatusCuenta())
                    : null;
            Integer tipoSaldoCuenta = cuentaCorriente.getTipoSaldoCuenta() != null
                    ? Integer.parseInt(cuentaCorriente.getTipoSaldoCuenta())
                    : null;
            Integer tipoMovimientoCXC = cuentaCorriente.getTipoMovimientoCXC() != null
                    ? Integer.parseInt(cuentaCorriente.getTipoMovimientoCXC())
                    : null;

            cuentaCorrienteRepository.insertarDatosCuentaCorriente(
                    cuentaCorriente.getIdTipoDocumento(),
                    cuentaCorriente.getIdPersona(),
                    cuentaCorriente.getNoDocumento(),
                    cuentaCorriente.getIdSaldoCuenta(),
                    cuentaCorriente.getSaldoAnterior(),
                    cuentaCorriente.getDebitos(),
                    cuentaCorriente.getCreditos(),
                    cuentaCorriente.getSaldoFechaCreacion(),
                    cuentaCorriente.getSaldoUsuarioCreacion(),
                    statusCuenta, // Asegurado de que sea Integer
                    tipoSaldoCuenta, // Asegurado de que sea Integer
                    cuentaCorriente.getFechaMovimiento(),
                    cuentaCorriente.getValorMovimiento(),
                    cuentaCorriente.getValorMovimientoPagado(),
                    cuentaCorriente.getGeneradoAutomaticamente(),
                    cuentaCorriente.getDescripcion(),
                    tipoMovimientoCXC, // Asegurado de que sea Integer
                    cuentaCorriente.getOperacionCuentaCorriente());
        } catch (NumberFormatException e) {
            // Manejo de excepción si los campos no pueden convertirse a Integer
            throw new IllegalArgumentException(
                    "Error al convertir los valores de StatusCuenta, TipoSaldoCuenta o TipoMovimientoCXC a Integer", e);
        } catch (Exception e) {
            // Manejo de otras excepciones posibles
            throw new RuntimeException("Error al insertar los datos de la cuenta corriente", e);
        }
    }

    // Crear una nueva cuenta corriente usando el procedimiento almacenado
    public void createCuentaCorriente(CuentaCorriente cuentaCorriente) {
        insertarCuentaCorriente(cuentaCorriente); // Llama al procedimiento almacenado
    }

    // Actualizar una cuenta corriente
    public CuentaCorriente update(Integer id, CuentaCorriente detallesCuentaCorriente) {
        CuentaCorriente cuentaCorriente = findById(id);

        if (cuentaCorriente != null) {
            cuentaCorriente.setNoDocumento(detallesCuentaCorriente.getNoDocumento());
            cuentaCorriente.setSaldoAnterior(detallesCuentaCorriente.getSaldoAnterior());
            cuentaCorriente.setDebitos(detallesCuentaCorriente.getDebitos());
            cuentaCorriente.setCreditos(detallesCuentaCorriente.getCreditos());
            cuentaCorriente.setFechaMovimiento(detallesCuentaCorriente.getFechaMovimiento());
            cuentaCorriente.setValorMovimiento(detallesCuentaCorriente.getValorMovimiento());
            cuentaCorriente.setValorMovimientoPagado(detallesCuentaCorriente.getValorMovimientoPagado());
            cuentaCorriente.setDescripcion(detallesCuentaCorriente.getDescripcion());
            cuentaCorriente.setTipoMovimientoCXC(detallesCuentaCorriente.getTipoMovimientoCXC());
            cuentaCorriente.setOperacionCuentaCorriente(detallesCuentaCorriente.getOperacionCuentaCorriente());

            return cuentaCorrienteRepository.save(cuentaCorriente);
        }

        return null; // Si no se encuentra la cuenta, retorna null o puedes lanzar una excepción
    }

    // Eliminar una cuenta corriente
    public void delete(Integer id) {
        CuentaCorriente cuentaCorriente = findById(id);
        if (cuentaCorriente != null) {
            cuentaCorrienteRepository.delete(cuentaCorriente);
        }
    }
}