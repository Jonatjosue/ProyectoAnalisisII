package proyecto_f1.backend.obtenerUsuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import proyecto_f1.backend.model.Usuario.Usuario;
import proyecto_f1.backend.repository.Usuario.UsuarioRepository;
import proyecto_f1.backend.repository.UsuarioRoleRepository.UsuarioRoleRepository;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil; // Clase de utilidad para manejar JWT

    @Autowired
    private UsuarioRepository userrepo;

    @Autowired
    private UsuarioRoleRepository roleUsuario;

    @Override
    protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest request, @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain chain)
            throws ServletException, IOException {
        // Tu lógica de filtrado aquí
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;
        String testUser = "testuser";



            // Permitir que la ruta de inicio de sesión pase sin filtro
    if (request.getRequestURI().equals("/api/Usuario/login")) {
        chain.doFilter(request, response); // Permitir acceso
        return; // Salir del método
    }
    //"/api/Usuario/obtienePreguntas", "/api/Usuario/recuperarCuenta"
    if (request.getRequestURI().equals("/api/Usuario/obtienePreguntas")) {
        chain.doFilter(request, response); // Permitir acceso
        return; // Salir del método
    }
//============================================================== para poder hacer pruebas sin token
    if (testUser.equals("testuser")) {

        Usuario userDetails = this.userrepo.findUsuario("Nologin");  /*  ###### CAMBIAR AQUI EL USUARIO A TESTEAR ####### */
        Collection<? extends GrantedAuthority> roles = roleUsuario.findRolesUsuario(username)
        .stream()
        .map(role -> new SimpleGrantedAuthority(role)) 
        .collect(Collectors.toList());

UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
        new UsernamePasswordAuthenticationToken(userDetails, null, roles);

usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        chain.doFilter(request, response); // Permitir acceso sin autenticación
        return;
    }
//========================================================================


    if (request.getRequestURI().equals("/api/Usuario/recuperarCuenta")) {
        chain.doFilter(request, response); // Permitir acceso
        return; // Salir del método
    }
        // Verifica si el encabezado Authorization está presente y comienza con "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7); // Extrae el token
            username = jwtUtil.extractUsername(jwt); // Extrae el nombre de usuario del token
        }

        // Si el usuario está presente en el contexto de seguridad y no ha sido autenticado, autenticamos el token
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Usuario userDetails = this.userrepo.findUsuario(username); // Carga el usuario
            if (jwtUtil.validateToken(jwt, userDetails)) { // Valida el token
                // Establece la autenticación en el contexto de seguridad
                Collection<? extends GrantedAuthority> roles = roleUsuario.findRolesUsuario(username)
                        .stream()
                        .map(role -> new SimpleGrantedAuthority(role)) // Asume que role es un String
                        .collect(Collectors.toList());

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, roles);
                
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        chain.doFilter(request, response); // Continúa la cadena de filtros
    }
}
