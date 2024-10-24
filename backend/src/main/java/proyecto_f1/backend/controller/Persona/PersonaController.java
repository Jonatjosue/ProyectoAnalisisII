package proyecto_f1.backend.controller.Persona;

import proyecto_f1.backend.model.PersonaView.PersonaView;
import proyecto_f1.backend.service.PersonaService.PersonaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personas")
@CrossOrigin(origins = "http://localhost:8081") // Permite que React acceda al backend
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @GetMapping
    public List<PersonaView> obtenerPersonas() {
        return personaService.obtenerPersonas();
    }

    @GetMapping("/{id}")
    public PersonaView obtenerPersonaPorId(@PathVariable Long id) {
        return personaService.obtenerPersonaPorId(id);
    }
}
