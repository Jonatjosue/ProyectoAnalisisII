package proyecto_f1.backend.ClasesValidacion;

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

    public static class AuthResponse {
        private String token;
        private long role;  // Nuevo campo para el rol del usuario
        private RespuestaAutenticacion respuesta;

        public AuthResponse(String token, long role,RespuestaAutenticacion respuesta) {  // Constructor actualizado
            this.token = token;
            this.role = role;
            this.respuesta = respuesta;
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

        public RespuestaAutenticacion getrespuesta() {  // Getter para el rol
            return respuesta;
        }

        public void setrespuesta(RespuestaAutenticacion respuesta) {  // Setter para el rol
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

}
