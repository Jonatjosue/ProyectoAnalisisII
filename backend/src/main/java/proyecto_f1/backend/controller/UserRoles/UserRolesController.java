package proyecto_f1.backend.controller.UserRoles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.UserRole.UserRoles;
import proyecto_f1.backend.service.UserRoles.UserRolesService;

@RestController
@RequestMapping("/api/user-roles")
public class UserRolesController {
    @Autowired
    private UserRolesService userRolesService;

    @GetMapping
    public ResponseEntity<List<UserRoles>> getAllUserRoles() {
        List<UserRoles> userRoles = userRolesService.getAllUserRoles();
        return ResponseEntity.ok(userRoles);
    }
}
