package proyecto_f1.backend.service.PersonaService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.model.Persona.Persona;
import proyecto_f1.backend.repository.PersonaRepository.PersonaRepository;

import java.util.List;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    public List<Persona> obtenerPersonas() {
        return personaRepository.findAll();
    }

    public Persona obtenerPersonaPorId(Long id) {
        return personaRepository.findById(id).orElse(null);
    }
}