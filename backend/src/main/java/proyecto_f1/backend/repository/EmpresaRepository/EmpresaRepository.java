package proyecto_f1.backend.repository.EmpresaRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import proyecto_f1.backend.model.empresa.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> { 
    
}
