package proyecto_f1.backend.model.VistaSucursalEmpresa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "VW_Sucursal_Empresa")
public class VistaSucursalEmpresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Sucursal")
    private Long idSucursal;

    @Column(name = "passwordcantidadmayusculas", nullable = false)
    private Integer passwordCantidadMayusculas;

    @Column(name = "passwordcantidadminusculas", nullable = false)
    private Integer passwordCantidadMinusculas;

    @Column(name = "passwordcantidadcaracteresespeciales", nullable = false)
    private Integer passwordCantidadCaracteresEspeciales;

    @Column(name = "passwordlargo", nullable = false)
    private Integer passwordLargo;

    @Column(name = "passwordcantidadnumeros", nullable = false)
    private Integer passwordCantidadNumeros;

    // Getters and Setters

    public Long getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(Long idSucursal) {
        this.idSucursal = idSucursal;
    }

    public Integer getPasswordCantidadMayusculas() {
        return passwordCantidadMayusculas;
    }

    public void setPasswordCantidadMayusculas(Integer passwordCantidadMayusculas) {
        this.passwordCantidadMayusculas = passwordCantidadMayusculas;
    }

    public Integer getPasswordCantidadMinusculas() {
        return passwordCantidadMinusculas;
    }

    public void setPasswordCantidadMinusculas(Integer passwordCantidadMinusculas) {
        this.passwordCantidadMinusculas = passwordCantidadMinusculas;
    }

    public Integer getPasswordCantidadCaracteresEspeciales() {
        return passwordCantidadCaracteresEspeciales;
    }

    public void setPasswordCantidadCaracteresEspeciales(Integer passwordCantidadCaracteresEspeciales) {
        this.passwordCantidadCaracteresEspeciales = passwordCantidadCaracteresEspeciales;
    }

    public Integer getPasswordLargo() {
        return passwordLargo;
    }

    public void setPasswordLargo(Integer passwordLargo) {
        this.passwordLargo = passwordLargo;
    }

    public Integer getPasswordCantidadNumeros() {
        return passwordCantidadNumeros;
    }

    public void setPasswordCantidadNumeros(Integer passwordCantidadNumeros) {
        this.passwordCantidadNumeros = passwordCantidadNumeros;
    }
}
