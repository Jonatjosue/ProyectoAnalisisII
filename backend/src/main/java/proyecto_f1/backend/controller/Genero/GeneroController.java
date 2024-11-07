package proyecto_f1.backend.controller.Genero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import proyecto_f1.backend.model.Genero.Genero;
import proyecto_f1.backend.service.Genero.GeneroService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/generos")
public class GeneroController {

    @Autowired
    private GeneroService generoService;

    @GetMapping
    public List<Genero> obtenerTodos() {
        return generoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genero> obtenerPorId(@PathVariable Long id) {
        Optional<Genero> genero = generoService.obtenerPorId(id);
        return genero.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Genero> crearGenero(@RequestBody Genero genero) {
        Genero nuevoGenero = generoService.crearGenero(genero);
        return new ResponseEntity<>(nuevoGenero, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genero> actualizarGenero(@PathVariable Long id, @RequestBody Genero genero) {
        try {
            Genero generoActualizado = generoService.actualizarGenero(id, genero);
            return ResponseEntity.ok(generoActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteGenero(@PathVariable Long id) {
        generoService.deleteGenero(id);
    }
}
