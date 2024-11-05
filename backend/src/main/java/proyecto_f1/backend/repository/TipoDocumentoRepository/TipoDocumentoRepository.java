package proyecto_f1.backend.repository.TipoDocumentoRepository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto_f1.backend.model.TipoDocumento.TipoDocumento;

@Repository
public interface TipoDocumentoRepository extends JpaRepository<TipoDocumento, Long> {
    // Puedes agregar métodos personalizados si los necesitas
}
