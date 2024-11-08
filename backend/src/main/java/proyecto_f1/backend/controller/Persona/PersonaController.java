package proyecto_f1.backend.controller.Persona;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import proyecto_f1.backend.model.Persona.Persona;
import proyecto_f1.backend.repository.PersonaRepository.PersonaRepository;

@RestController
@RequestMapping("/api/personas")
public class PersonaController {

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping
    public List<Persona> getAllPersonas() {
        return personaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Persona getPersonaById(@PathVariable Integer id) {
        return personaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Persona createPersona(@RequestBody Persona persona) {
        return personaRepository.save(persona);
    }

    @PutMapping("/{id}")
    public Persona updatePersona(@PathVariable Integer id, @RequestBody Persona personaDetails) {
        Persona persona = personaRepository.findById(id).orElse(null);

        if (persona != null) {
            persona.setNombre(personaDetails.getNombre());
            persona.setApellido(personaDetails.getApellido());
            persona.setFechaNacimiento(personaDetails.getFechaNacimiento());
            persona.setIdGenero(personaDetails.getIdGenero());
            persona.setDireccion(personaDetails.getDireccion());
            persona.setTelefono(personaDetails.getTelefono());
            persona.setCorreoElectronico(personaDetails.getCorreoElectronico());
            persona.setIdEstadoCivil(personaDetails.getIdEstadoCivil());
            persona.setFechaModificacion(LocalDate.now());
            persona.setUsuarioModificacion(personaDetails.getUsuarioModificacion());
            return personaRepository.save(persona);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deletePersona(@PathVariable Integer id) {
        personaRepository.deleteById(id);
    }

    @GetMapping("/buscar/{nombre}")
    public List<Persona> getPersonasByNombre(@PathVariable String nombre) {
        return personaRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
