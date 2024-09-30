package proyecto_f1.backend.ClasesValidacion;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class jwtValida {

    // Clave secreta en formato base64
    private static final String SECRET_KEY = "your_secret_key_in_base64_format";  // Cambia esta clave

    // Método para generar el token JWT
    public static String generateToken(String username) {
        // Convertir la clave secreta a un objeto SecretKey
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Token válido por 10 horas
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
