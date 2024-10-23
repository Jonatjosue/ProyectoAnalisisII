package proyecto_f1.backend.repository.Navbar;

import org.springframework.data.jpa.repository.JpaRepository;

import proyecto_f1.backend.model.Navbar.MenuEntity;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {

}
