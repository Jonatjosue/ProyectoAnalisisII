package proyecto_f1.backend.repository.Genero;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.Genero.Genero;

@Repository
public interface GeneroRepository extends JpaRepository<Genero, Long> {
}
