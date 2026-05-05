package com.hius.erms.service.impl;

import com.hius.erms.entity.UserEntity;
import com.hius.erms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(
            String email) throws UsernameNotFoundException {
        UserEntity exitingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Email not found for the email: " + email));
        return new User(exitingUser.getEmail(), exitingUser.getPassword(),
                Collections.singleton(
                        new SimpleGrantedAuthority(exitingUser.getRole())));
    }
}
