package com.hius.erms.service.impl;

import com.hius.erms.entity.UserEntity;
import com.hius.erms.exception.AppException;
import com.hius.erms.exception.ErrorCode;
import com.hius.erms.io.UserRequest;
import com.hius.erms.io.UserResponse;
import com.hius.erms.mapper.UserMapper;
import com.hius.erms.repository.UserRepository;
import com.hius.erms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service implementation for handling user-related operations.
 * <p>
 * This class contains business logic for user creation,
 * retrieval, and deletion.
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    /**
     * Creates a new user.
     *
     * @param request the user request containing registration details
     * @return the created user as {@link UserResponse}
     * @throws AppException if the email already exists
     * @implNote The password is encoded before saving to ensure security.
     */
    @Override
    @Transactional
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser = userMapper.toEntity(request);
        newUser.setUserId(UUID.randomUUID().toString());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        try {
            newUser = userRepository.save(newUser);
        } catch (DataIntegrityViolationException ex) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        return userMapper.toResponse(newUser);
    }

    /**
     * Retrieves the role of a user by email.
     *
     * @param email the email of the user
     * @return the role of the user (e.g., USER, ADMIN)
     * @throws AppException if the user is not found
     */
    @Override
    @Transactional(readOnly = true)
    public String getUserRole(String email) {
        UserEntity existing = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return existing.getRole();
    }

    /**
     * Retrieves all users from the database.
     *
     * @return a list of {@link UserResponse}
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> readUsers() {
        return userRepository.findAll().stream().map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    /**
     * Deletes a user by their unique identifier.
     *
     * @param id the user ID
     * @throws AppException if the user is not found
     */
    @Override
    @Transactional
    public void deleteUser(String id) {
        UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        userRepository.delete(existingUser);
    }
}