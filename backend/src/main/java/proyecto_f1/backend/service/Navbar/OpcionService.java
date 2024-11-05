package proyecto_f1.backend.service.Navbar;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.ClasesValidacion.validacion.OpcionesMenuUsuario;
import proyecto_f1.backend.model.Navbar.OpcionEntity;
import proyecto_f1.backend.repository.Navbar.OpcionRepository;
import proyecto_f1.backend.repository.Usuario.UsuarioRepository;
import proyecto_f1.backend.model.Usuario.*;

@Service
public class OpcionService {
    
    @Autowired
    private OpcionRepository opcionRepository;

    @Autowired
    private UsuarioRepository usuariorepo;



    public List<OpcionEntity> findAll(String usuario, Long role) {
        List<OpcionEntity> opcion = opcionRepository.findAll(Sort.by(Sort.Direction.ASC, "ordenMenu"));

        Optional<Usuario> us = usuariorepo.findByNombre(usuario);

        List<OpcionesMenuUsuario> posee = usuariorepo.obtenerPermisosOpciones(us.get().getIdUsuario(), role);
    
        List<OpcionEntity> opcionFiltrada = opcion.stream()
            .filter(op -> posee.stream().anyMatch(p -> p.getId() == op.getIdOpcion())) // Filtra si 'op' tiene un permiso en 'posee'
            .collect(Collectors.toList());
    
        return opcionFiltrada;
    }
    public List<OpcionEntity> buscaOpcion() {
        return opcionRepository.findAll(Sort.by(Sort.Direction.ASC, "ordenMenu"));
    }
    
    

    public Optional<OpcionEntity> findById(Long id) {
        return opcionRepository.findById(id);
    }

    public OpcionEntity save(OpcionEntity opcion) {
        return opcionRepository.save(opcion);
    }
}
