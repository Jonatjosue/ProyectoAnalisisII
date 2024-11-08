package proyecto_f1.backend.controller.TipoDocumentoController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto_f1.backend.model.TipoDocumento.TipoDocumento;
import proyecto_f1.backend.service.TipoDocumentoService.TipoDocumentoService;

import java.util.List;

@RestController
@RequestMapping("/api/tipodocumento")
public class TipoDocumentoController {

    @Autowired
    private TipoDocumentoService tipoDocumentoService;

    @GetMapping
    public ResponseEntity<List<TipoDocumento>> getAll() {
        List<TipoDocumento> tiposDocumento = tipoDocumentoService.findAll();
        return new ResponseEntity<>(tiposDocumento, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoDocumento> getById(@PathVariable Long id) {
        return tipoDocumentoService.findById(id)
                .map(tipoDocumento -> new ResponseEntity<>(tipoDocumento, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<TipoDocumento> create(@RequestBody TipoDocumento tipoDocumento) {
        TipoDocumento savedTipoDocumento = tipoDocumentoService.save(tipoDocumento);
        return new ResponseEntity<>(savedTipoDocumento, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoDocumento> update(@PathVariable Long id, @RequestBody TipoDocumento tipoDocumento) {
        TipoDocumento updatedTipoDocumento = tipoDocumentoService.update(id, tipoDocumento);
        if (updatedTipoDocumento != null) {
            return new ResponseEntity<>(updatedTipoDocumento, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tipoDocumentoService.delete(id);
    }
}
