package proyecto_f1.backend.Seguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import proyecto_f1.backend.obtenerUsuario.JwtRequestFilter;

@Configuration
@EnableWebSecurity
public class seguridad {

    @Autowired
    private JwtRequestFilter jwtRequestFilter; // Inyección de JwtRequestFilter

    @SuppressWarnings("deprecation")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Desactiva CSRF para permitir llamadas API
            .authorizeRequests(requests -> requests
                .requestMatchers("/public/**").permitAll() // Rutas públicas
                .requestMatchers("/api/Usuario/login", "/api/Usuario/obtienePreguntas", "/api/Usuario/recuperarCuenta").permitAll()
                .anyRequest().authenticated() // Todas las demás rutas requieren autenticación
            )
            .sessionManagement(management -> management
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // No usar sesiones
            );

        // Agregar el filtro antes del manejo de la autenticación por defecto
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build(); // Retorna la configuración del filtro de seguridad
    }
}
