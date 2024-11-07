package proyecto_f1.backend.service.Genero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.Genero.Genero;
import proyecto_f1.backend.repository.Genero.GeneroRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GeneroService {

    @Autowired
    private GeneroRepository generoRepository;

    public List<Genero> obtenerTodos() {
        return generoRepository.findAll();
    }

    public Optional<Genero> obtenerPorId(Long id) {
        return generoRepository.findById(id);
    }

    public Genero crearGenero(Genero genero) {
        return generoRepository.save(genero);
    }

    public Genero actualizarGenero(Long id, Genero generoActualizado) {
        return generoRepository.findById(id).map(genero -> {
            genero.setNombre(generoActualizado.getNombre());
            genero.setFechaModificacion(generoActualizado.getFechaModificacion());
            genero.setUsuarioModificacion(generoActualizado.getUsuarioModificacion());
            return generoRepository.save(genero);
        }).orElseThrow(() -> new RuntimeException("Género no encontrado con el ID: " + id));
    }

    public void deleteGenero(Long id) {
        generoRepository.deleteById(id);
    }
}

