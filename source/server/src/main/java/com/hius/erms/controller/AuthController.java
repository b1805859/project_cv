package com.hius.erms.controller;

import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.AuthRequest;
import com.hius.erms.io.AuthResponse;
import com.hius.erms.service.UserService;
import com.hius.erms.service.impl.AppUserDetailsService;
import com.hius.erms.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import com.hius.erms.io.UserRequest;
import com.hius.erms.io.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Map;

import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller responsible for authentication operations.
 * <p>
 * Provides APIs for:
 * <ul>
 *     <li>User login (JWT authentication)</li>
 *     <li>Password encoding (for testing/debugging)</li>
 * </ul>
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    /**
     * Authenticate user and generate JWT token.
     *
     * @param request authentication request containing email and password
     * @return AuthResponse containing email, JWT token, and role
     */
    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@RequestBody AuthRequest request) {
        authenticate(request.getEmail(), request.getPassword());

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(request.getEmail());

        String token = jwtUtil.generateToken(userDetails);
        String role = userService.getUserRole(request.getEmail());

        return ApiResponse.<AuthResponse>builder()
                .data(new AuthResponse(request.getEmail(), token, role))
                .build();
    }

    /**
     * Public user registration endpoint.
     *
     * @param request the registration request payload
     * @return ApiResponse containing the created user response
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserResponse> register(@RequestBody UserRequest request) {
        // Enforce USER role for public registration for security
        request.setRole("USER");
        return ApiResponse.<UserResponse>builder()
                .message("User registered successfully")
                .data(userService.createUser(request))
                .build();
    }

    /**
     * Perform authentication using Spring Security AuthenticationManager.
     *
     * @param email    user's email
     * @param password user's raw password
     */
    private void authenticate(String email, String password) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (BadCredentialsException ex) {
            throw new AppException(ErrorCode.EMAIL_OR_PASSWORD_IS_INCORRECT);
        }
    }

    /**
     * Encode raw password using configured PasswordEncoder.
     * <p>
     * NOTE: This API should NOT be exposed in production.
     *
     * @param request map containing "password"
     * @return encoded password string
     */
    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String, String> request) {
        return passwordEncoder.encode(request.get("password"));
    }
}