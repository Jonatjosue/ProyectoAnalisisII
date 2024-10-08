package proyecto_f1.backend.repository.EmpresaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;
import proyecto_f1.backend.model.empresa.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> { 
    

    @Query(value = "SELECT em.PasswordIntentosAntesDeBloquear FROM Empresa em " +
            "INNER JOIN Sucursal sucu ON em.id_empresa = sucu.id_empresa " +
            "INNER JOIN Usuario us ON sucu.Id_Sucursal = us.Id_Sucursal " +
            "WHERE us.Id_Usuario = :idUsuario", nativeQuery = true)
    Long findPasswordIntentosByIdUsuario(@Param("idUsuario") Long idUsuario);

    @Query(value = "SELECT  em.PasswordCantidadPreguntasValidar  FROM USUARIO us"+
                    "inner join SUCURSAL SUCU"+
                    "on sucu.Id_Sucursal = us.Id_Sucursal"+
                    "inner join EMPRESA em"+
                    "on em.id_empresa = sucu.id_empresa" +
                    "where us.Id_Usuario = :idUsuario", nativeQuery = true)
    Long findCantidadPreguntasValidar(@Param("idUsuario") Long idUsuario);

}
