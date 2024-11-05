package proyecto_f1.backend.service.TipoDocumentoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proyecto_f1.backend.model.TipoDocumento.TipoDocumento;
import proyecto_f1.backend.repository.TipoDocumentoRepository.TipoDocumentoRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TipoDocumentoService {

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    public List<TipoDocumento> findAll() {
        return tipoDocumentoRepository.findAll();
    }

    public Optional<TipoDocumento> findById(Long id) {
        return tipoDocumentoRepository.findById(id);
    }

    public TipoDocumento save(TipoDocumento tipoDocumento) {
        tipoDocumento.setFechaCreacion(new Date());
        return tipoDocumentoRepository.save(tipoDocumento);
    }

    public TipoDocumento update(Long id, TipoDocumento tipoDocumento) {
        Optional<TipoDocumento> existingTipoDocumento = tipoDocumentoRepository.findById(id);
        if (existingTipoDocumento.isPresent()) {
            TipoDocumento updatedTipoDocumento = existingTipoDocumento.get();
            updatedTipoDocumento.setNombre(tipoDocumento.getNombre());
            updatedTipoDocumento.setFechaModificacion(new Date());
            updatedTipoDocumento.setUsuarioModificacion(tipoDocumento.getUsuarioModificacion());
            return tipoDocumentoRepository.save(updatedTipoDocumento);
        }
        return null; // O lanza una excepción según tu necesidad
    }

    public void delete(Long id) {
        tipoDocumentoRepository.deleteById(id);
    }
}
