package proyecto_f1.backend.repository.VistaSucursalEmpresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import proyecto_f1.backend.model.VistaSucursalEmpresa.VistaSucursalEmpresa;

@Repository
public interface RepoSucursalEmpresa extends JpaRepository<VistaSucursalEmpresa, Long> {

}
