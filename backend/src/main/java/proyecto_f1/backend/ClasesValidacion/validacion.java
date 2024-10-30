package proyecto_f1.backend.ClasesValidacion;

//import org.hibernate.mapping.List;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import proyecto_f1.backend.model.Usuario.UsuarioRole;


public class validacion {

    public static class LoginRequest {
        public static String username;
        public static String password;

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }

    public static class recuperar {
        private String username;
        private String correo;
         @JsonProperty("respuestas")
        private List<respuesta> respuestas;
    
        public List<respuesta> getrespuestas() {
            return respuestas;
        }
    
        public void setrespuestas(List<respuesta> respuestas) {
            this.respuestas = respuestas;
        }
    
        public String getcorreo() {
            return correo;
        }
    
        public void setcorreo(String correo) {
            this.correo = correo;
        }
    
        public String getUsername() {
            return username;
        }
    
        public void setusername(String username) {
            this.username = username;
        }
    }



    public static class repuestasInvalidas{
        @JsonProperty("idRespuesta")
        private  int idRespuesta;
        @JsonProperty("respuesta")
        private  String respuesta;
        @JsonProperty("valida")
        private  boolean valida;

        public boolean getvalida() {
            return valida;
        }
    
        public void setvalida(boolean valida) {
            this.valida = valida;
        }
    
        public int getidRespuesta() {
            return idRespuesta;
        }
    
        public void setidRespuesta(int idRespuesta) {
            this.idRespuesta = idRespuesta;
        }
    
        public String getrespuesta() {
            return respuesta;
        }
    
        public void setrespuesta(String respuesta) {
            this.respuesta = respuesta;
        }
    
    }

public static class respuesta {
    @JsonProperty("idRespuesta")
    private int idRespuesta;
    @JsonProperty("respuesta")
    private String respuesta;

    public int getIdrespuesta() {
        return idRespuesta;
    }

    public void setIdrespuesta(int idRespuesta) {
        this.idRespuesta = idRespuesta;
    }

    public String getrespuesta() {
        return respuesta;
    }

    public void setrespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
}

    public static class AuthResponse {
        private String token;
        private List<UsuarioRole> roles;  // Nuevo campo para el rol del usuario
        private RespuestaAutenticacion respuesta;

        public AuthResponse(String token, List<UsuarioRole> roles,RespuestaAutenticacion respuesta) {  // Constructor actualizado
            this.token = token;
            this.roles = roles;
            this.respuesta = respuesta;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public List<UsuarioRole> getRoles() {  // Getter para el rol
            return roles;
        }

        public void setRole(long role) {  // Setter para el rol
            this.roles = null;
        }

        public RespuestaAutenticacion getrespuesta() {  // Getter para el rol
            return respuesta;
        }

        public void setrespuesta(RespuestaAutenticacion respuesta) {  // Setter para el rol
            this.respuesta = respuesta;
        }
    }


    public static class PreguntaResponse {
        private String token;
        private long role;  // Nuevo campo para el rol del usuario
        private RespuestaAutenticacionPregunta respuesta;

        public PreguntaResponse(String token, long role , RespuestaAutenticacionPregunta respuestaConstruc ) {  // Constructor actualizado
            this.token = token;
            this.role = role;
            this.respuesta =respuestaConstruc;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public long getRole() {  // Getter para el rol
            return role;
        }

        public void setRole(long role) {  // Setter para el rol
            this.role = role;
        }

        public RespuestaAutenticacionPregunta getrespuesta() {  // Getter para el rol
            return respuesta;
        }

        public void setrespuesta(RespuestaAutenticacionPregunta respuesta) {  // Setter para el rol
            this.respuesta = respuesta;
        }
    }

    public static class RespuestaAutenticacion {
        private boolean respuesta;
        private String descripcion; 

        public RespuestaAutenticacion(boolean respuesta, String descripcion) {  // Constructor actualizado
            this.respuesta = respuesta;
            this.descripcion = descripcion;
        }

        public String getdescripcion() {
            return descripcion;
        }

        public void setdescripcion(String descripcion) {
            this.descripcion = descripcion;
        }

        public boolean getrespuesta() {  // Getter para el rol
            return respuesta;
        }

        public void setrespuesta(boolean respuesta) {  // Setter para el rol
            this.respuesta = respuesta;
        }
    }

    public static class RespuestaAutenticacionPregunta {
        private boolean respuesta;
        private String descripcion; 
        private List<repuestasInvalidas> Listrespuestas;

        public RespuestaAutenticacionPregunta(boolean respuesta, String descripcion , List<repuestasInvalidas> ListrespuestasConstructor) {  // Constructor actualizado
            this.respuesta = respuesta;
            this.descripcion = descripcion;
            this.Listrespuestas = ListrespuestasConstructor;
        }

        public String getdescripcion() {
            return descripcion;
        }

        public void setdescripcion(String descripcion) {
            this.descripcion = descripcion;
        }

        public boolean getrespuesta() {  // Getter para el rol
            return respuesta;
        }

        public void setrespuesta(boolean respuesta) {  // Setter para el rol
            this.respuesta = respuesta;
        }

        public List<repuestasInvalidas> getListrespuestas() {  // Getter para el rol
            return Listrespuestas;
        }

        public void setListrespuestas(List<repuestasInvalidas> respuesta) {  // Setter para el rol
            Listrespuestas = respuesta;
        }
    }

    public interface PreguntasUsuarioRecuperacion {
        Long getIdPregunta();
        String getPregunta();
    }

    

    public static class preguntasUsuarioRecuperaciones{
        @JsonProperty("Id_Pregunta")
        private Long idPregunta;
        @JsonProperty("Pregunta")
        private String pregunta;

        public preguntasUsuarioRecuperaciones(){}

        public preguntasUsuarioRecuperaciones(Long idPregunta , String pregunta){
            this.idPregunta = idPregunta;
            this.pregunta = pregunta;
        }

        public Long getidPregunta() {  // Getter para el rol
            return idPregunta;
        }

        public void setidPregunta(Long idPregunta) {  // Setter para el rol
            this.idPregunta = idPregunta;
        }

        public String getpregunta() {  // Getter para el rol
            return pregunta;
        }

        public void setpregunta(String pregunta) {  // Setter para el rol
            this.pregunta = pregunta;
        }
    }

}
