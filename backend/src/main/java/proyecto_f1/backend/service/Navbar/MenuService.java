package proyecto_f1.backend.service.Navbar;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.Navbar.MenuEntity;
import proyecto_f1.backend.repository.Navbar.MenuRepository;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    public List<MenuEntity> findAll() {
        return menuRepository.findAll();
    }
    
    public Optional<MenuEntity> findById(Long id) {
        return menuRepository.findById(id);
    }

    public MenuEntity save(MenuEntity modulo) {
        return menuRepository.save(modulo);
    }
}
