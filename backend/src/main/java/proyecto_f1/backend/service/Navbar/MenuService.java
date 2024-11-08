package proyecto_f1.backend.service.Navbar;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.ClasesValidacion.validacion.OpcionesMenuUsuario;
import proyecto_f1.backend.model.Navbar.MenuEntity;
import proyecto_f1.backend.model.Usuario.Usuario;
import proyecto_f1.backend.repository.Navbar.MenuRepository;
import proyecto_f1.backend.repository.Usuario.UsuarioRepository;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    
    @Autowired
    private UsuarioRepository usuariorepo;

    public List<MenuEntity> findAll(String usuario, Long role) {
        List<MenuEntity> opcion =  menuRepository.findAll(Sort.by(Sort.Direction.ASC, "ordenMenu"));
        Optional<Usuario> us = usuariorepo.findByNombre(usuario);
        List<OpcionesMenuUsuario> posee = usuariorepo.obtenerPermisosMenus(us.get().getIdUsuario(), role);

        List<MenuEntity> opcionFiltrada = opcion.stream()
        .filter(op -> posee.stream().anyMatch(p -> p.getId() == op.getIdMenu())) // Filtra si 'op' tiene un permiso en 'posee'
        .collect(Collectors.toList());

    return opcionFiltrada;
    }
    public List<MenuEntity> buscaMenu() {
    return menuRepository.findAll(Sort.by(Sort.Direction.ASC, "ordenMenu"));
    }
  
    
    public Optional<MenuEntity> findById(Long id) {
        return menuRepository.findById(id);
    }

    public MenuEntity save(MenuEntity menu) {
        return menuRepository.save(menu);
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
}
