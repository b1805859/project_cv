package com.hius.erms.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret.key}")
    private String SECRET_KEY;

    @Value("${jwt.expiration.minutes:480}")
    private long jwtExpirationMinutes;

    @Value("${jwt.allowed.clock.skew.seconds:120}")
    private long allowedClockSkewSeconds;

    @Value("${jwt.refresh.expiration.minutes:10080}")
    private long jwtRefreshExpirationMinutes;

    public String generateToken(
            UserDetails userDetails) { // Use email as username
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    public String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "refresh");
        return createRefreshToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String email) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * jwtExpirationMinutes))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

        private String createRefreshToken(Map<String, Object> claims, String email) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(
                new Date(System.currentTimeMillis() + 1000 * 60 * jwtRefreshExpirationMinutes))
            .signWith(getSignKey(), SignatureAlgorithm.HS256)
            .compact();
        }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token,
                              Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .setAllowedClockSkewSeconds(allowedClockSkewSeconds)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) &&
                !isTokenExpired(token));
    }

    public Boolean validateRefreshToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        Claims claims = extractAllClaims(token);
        Object t = claims.get("type");
        boolean isRefresh = t != null && "refresh".equals(t.toString());
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) && isRefresh);
    }

    public int getRefreshTokenMaxAgeSeconds() {
        return (int) (jwtRefreshExpirationMinutes * 60);
    }

}
