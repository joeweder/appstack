package com.acme.appstack.web;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CustomUserDetailServiceImpl implements UserDetailsService
{
//  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
  {
    List<GrantedAuthority> authorities = new ArrayList<>();

    // Create a UserDetails object from the data
    UserDetails userDetails = new org.springframework.security.core.userdetails.User("bob", "tomato", authorities);

    return userDetails;
  }
}

