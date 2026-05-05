package com.hius.erms.repository;

import com.hius.erms.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUserId(String userId);

    Boolean existsByEmail(String email);
}
