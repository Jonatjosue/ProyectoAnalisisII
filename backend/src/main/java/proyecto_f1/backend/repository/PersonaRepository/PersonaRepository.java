package proyecto_f1.backend.repository.PersonaRepository;



import org.springframework.data.jpa.repository.JpaRepository;

import proyecto_f1.backend.model.Persona.Persona;

public interface PersonaRepository extends JpaRepository<Persona, Long> {
}
