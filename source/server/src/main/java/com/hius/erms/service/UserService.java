package com.hius.erms.service;

import com.hius.erms.io.UserRequest;
import com.hius.erms.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}