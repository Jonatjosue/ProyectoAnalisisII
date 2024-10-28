package proyecto_f1.backend.service.Navbar;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.Navbar.OpcionEntity;
import proyecto_f1.backend.repository.Navbar.OpcionRepository;

@Service
public class OpcionService {
    
    @Autowired
    private OpcionRepository opcionRepository;

    public List<OpcionEntity> findAll() {
        return opcionRepository.findAll();
    }

    public Optional<OpcionEntity> findById(Long id) {
        return opcionRepository.findById(id);
    }

    public OpcionEntity save(OpcionEntity opcion) {
        return opcionRepository.save(opcion);
    }
}
