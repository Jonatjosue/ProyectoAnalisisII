package proyecto_f1.backend.service.Navbar;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.Navbar.ModuloEntity;
import proyecto_f1.backend.repository.Navbar.ModuloRepository;

@Service
public class ModuloService {
    
    @Autowired
    private ModuloRepository moduloRepository;

    public List<ModuloEntity> findAll() {
        return moduloRepository.findAll();
    }

    public Optional<ModuloEntity> findById(Long id) {
        return moduloRepository.findById(id);
    }

    public ModuloEntity save(ModuloEntity modulo) {
        return moduloRepository.save(modulo);
    }

    
}
