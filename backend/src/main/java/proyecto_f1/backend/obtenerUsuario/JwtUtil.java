package proyecto_f1.backend.obtenerUsuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import proyecto_f1.backend.model.Usuario.Usuario;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {
    private final SecretKey secretKey = Keys.hmacShaKeyFor("your_secret_key_in_base64_format".getBytes()); // Cambia esto por una clave segura

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        } catch (Exception e) {
            // Manejo de excepciones: el token no es válido o ha expirado
            return null;
        }
    }

    public boolean validateToken(String token, Usuario userDetails) {
        final String username = extractUsername(token);
        return (username != null && username.equals(userDetails.getNombre()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token) != null && extractAllClaims(token).getExpiration().before(new Date());
    }
}
