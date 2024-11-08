package proyecto_f1.backend.service.TipoSaldoCuentaService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.TipoSaldoCuenta.TipoSaldoCuenta;
import proyecto_f1.backend.repository.TipoSaldoRepository.TipoSaldoCuentaRepository;

@Service
public class TipoSaldoCuentaService {
    @Autowired
    private TipoSaldoCuentaRepository tipoSaldoCuentaRepository;

    public List<TipoSaldoCuenta> getAllTipoSaldoCuentas() {
        return tipoSaldoCuentaRepository.findAll();
    }

    public Optional<TipoSaldoCuenta> getTipoSaldoCuentaById(Long id) {
        return tipoSaldoCuentaRepository.findById(id);
    }

    public TipoSaldoCuenta createTipoSaldoCuenta(TipoSaldoCuenta tipoSaldoCuenta) {
        return tipoSaldoCuentaRepository.save(tipoSaldoCuenta);
    }

    public TipoSaldoCuenta updateTipoSaldoCuenta(Long id, TipoSaldoCuenta tipoSaldoCuenta) {
        if (tipoSaldoCuentaRepository.existsById(id)) {
            tipoSaldoCuenta.setIdTipoSaldoCuenta(id);
            return tipoSaldoCuentaRepository.save(tipoSaldoCuenta);
        } else {
            throw new RuntimeException("TipoSaldoCuenta not found with id " + id);
        }
    }

    public void deleteTipoSaldoCuenta(Long id) {
        tipoSaldoCuentaRepository.deleteById(id);
    }
}
