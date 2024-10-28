package proyecto_f1.backend.controller.Navbar;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.Navbar.MenuEntity;
import proyecto_f1.backend.service.Navbar.MenuService;

@RestController
@RequestMapping("api/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    public List<MenuEntity> getAllMenus() {
        return menuService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuEntity> getMenuById(@PathVariable Long id) {
        return menuService.findById(id)
                .map(menu -> ResponseEntity.ok(menu))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MenuEntity createMenu(@RequestBody MenuEntity menu) {
        return menuService.save(menu);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuEntity> updateMenu(@PathVariable Long id, @RequestBody MenuEntity menuDetails) {
        return menuService.findById(id)
                .map(menu -> {
                    menu.setIdModulo(menuDetails.getIdModulo());
                    menu.setNombre(menuDetails.getNombre());
                    menu.setOrdenMenu(menuDetails.getOrdenMenu());
                    menu.setFechaModificacion(menuDetails.getFechaModificacion());
                    menu.setUsuarioModificacion(menuDetails.getUsuarioModificacion());
                    return ResponseEntity.ok(menuService.save(menu));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
