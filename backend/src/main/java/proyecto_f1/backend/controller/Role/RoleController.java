package proyecto_f1.backend.controller.Role;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.Role.Role;
import proyecto_f1.backend.service.Role.RoleService;

@RestController
@RequestMapping("/api/Role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public Role crearRole(@RequestBody Role role) {
        return roleService.crearRole(role);
    }

    @GetMapping("/All")
    public List<Role> obtenerRoles() {
        return roleService.obtenerRoles();
    }

    @GetMapping("/{idRole}")
    public Role obtenerRolePorId(@PathVariable Long idRole) {
        return roleService.obtenerRolePorId(idRole);
    }

}
