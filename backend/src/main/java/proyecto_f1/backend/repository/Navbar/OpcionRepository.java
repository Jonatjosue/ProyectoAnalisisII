package proyecto_f1.backend.repository.Navbar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.Navbar.OpcionEntity;

@Repository
public interface OpcionRepository extends JpaRepository<OpcionEntity, Long>{

}
