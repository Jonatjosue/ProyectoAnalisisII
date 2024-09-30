package proyecto_f1.backend.repository.SucursalRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import proyecto_f1.backend.model.Sucursal.Sucursal;

public interface SucursalRepository extends JpaRepository<Sucursal, Long> {
    
}
