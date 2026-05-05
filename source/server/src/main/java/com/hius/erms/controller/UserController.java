package com.hius.erms.controller;

import com.hius.erms.io.ApiResponse;
import com.hius.erms.io.UserRequest;
import com.hius.erms.io.UserResponse;
import com.hius.erms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing user resources.
 * <p>
 * Provides APIs for:
 * <ul>
 *     <li>User registration</li>
 *     <li>Fetching user list</li>
 *     <li>Deleting users</li>
 * </ul>
 * All endpoints are prefixed with /admin.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    /**
     * Register a new user.
     *
     * @param request user registration request payload
     * @return ApiResponse containing created user
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<UserResponse> registerUser(
            @RequestBody UserRequest request) {

        return ApiResponse.<UserResponse>builder()
                .message("User registered successfully")
                .data(userService.createUser(request))
                .build();
    }

    /**
     * Retrieve all users.
     *
     * @return ApiResponse containing list of users
     */
    @GetMapping("/users")
    public ApiResponse<List<UserResponse>> readUser() {
        return ApiResponse.<List<UserResponse>>builder()
                .message("Fetched users successfully")
                .data(userService.readUsers())
                .build();
    }

    /**
     * Delete a user by ID.
     *
     * @param id user ID
     * @return ApiResponse with no data
     */
    @DeleteMapping("/users/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ApiResponse.<Void>builder()
                .message("User deleted successfully")
                .build();
    }
}