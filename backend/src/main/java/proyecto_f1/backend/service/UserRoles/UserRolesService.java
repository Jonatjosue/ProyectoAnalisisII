package proyecto_f1.backend.service.UserRoles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.UserRole.UserRoles;
import proyecto_f1.backend.repository.UserRole.UserRolesRepository;

@Service
public class UserRolesService {
    @Autowired
    private UserRolesRepository userRolesRepository;

    public List<UserRoles> getAllUserRoles() {
        return userRolesRepository.findAll();
    }
}
