package proyecto_f1.backend.service.Navbar;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import proyecto_f1.backend.ClasesValidacion.validacion.OpcionesMenuUsuario;
import proyecto_f1.backend.model.Navbar.MenuEntity;
import proyecto_f1.backend.model.Navbar.ModuloEntity;
import proyecto_f1.backend.model.Usuario.Usuario;
import proyecto_f1.backend.repository.Navbar.ModuloRepository;
import proyecto_f1.backend.repository.Usuario.UsuarioRepository;

@Service
public class ModuloService {
    
    @Autowired
    private ModuloRepository moduloRepository;

    
    @Autowired
    private UsuarioRepository usuariorepo;

    public List<ModuloEntity> findAll(String usuario, Long role) {
        List<ModuloEntity> opcion =  moduloRepository.findAll(Sort.by(Sort.Direction.ASC, "ordenMenu"));
        Optional<Usuario> us = usuariorepo.findByNombre(usuario);
        List<OpcionesMenuUsuario> posee = usuariorepo.obtenerPermisosMenus(us.get().getIdUsuario(), role);

        List<ModuloEntity> opcionFiltrada = opcion.stream()
        .filter(op -> posee.stream().anyMatch(p -> p.getId() == op.getIdModulo())) // Filtra si 'op' tiene un permiso en 'posee'
        .collect(Collectors.toList());

    return opcionFiltrada;
    }    

    public Optional<ModuloEntity> findById(Long id) {
        return moduloRepository.findById(id);
    }

    public ModuloEntity save(ModuloEntity modulo) {
        return moduloRepository.save(modulo);
    }

    
}
