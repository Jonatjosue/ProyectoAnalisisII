package proyecto_f1.backend.service.EstadoCivilService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import proyecto_f1.backend.model.EstadoCivil.EstadoCivil;
import proyecto_f1.backend.repository.EstadoCivilRepository.EstadoCivilRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EstadoCivilService {

    @Autowired
    private EstadoCivilRepository estadoCivilRepository;

    public List<EstadoCivil> findAll() {
        return estadoCivilRepository.findAll();
    }

    public Optional<EstadoCivil> findById(Long id) {
        return estadoCivilRepository.findById(id);
    }

    public EstadoCivil save(EstadoCivil estadoCivil) {
        estadoCivil.setFechaCreacion(new Date());
        return estadoCivilRepository.save(estadoCivil);
    }

   public EstadoCivil update(Long id, EstadoCivil estadoCivil) {
        EstadoCivil existingEstadoCivil = estadoCivilRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Estado civil no encontrado"));

        existingEstadoCivil.setNombre(estadoCivil.getNombre());
        existingEstadoCivil.setUsuarioModificacion(estadoCivil.getUsuarioModificacion());

        existingEstadoCivil.setFechaCreacion(existingEstadoCivil.getFechaCreacion()); // o asignar una nueva fecha

        return estadoCivilRepository.save(existingEstadoCivil);
    }
    public void delete(Long id) {
        estadoCivilRepository.deleteById(id);
    }
}
