package com.example.Grupo4.security;

import com.example.Grupo4.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  private final UserDetailsService userDetailsService;

  private final JwtUtil jwtUtil;

  public JwtRequestFilter(UserDetailsService userDetailsService, JwtUtil jwtUtil) {
    this.userDetailsService = userDetailsService;
    this.jwtUtil = jwtUtil;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                  FilterChain filterChain) throws ServletException, IOException {

    final String authorizationHeader = httpServletRequest.getHeader("Authorization");

    String username = null;
    String jwt = null;
    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
      jwt = authorizationHeader.substring(7);
      try {
        username = jwtUtil.extractUserName(jwt);
      } catch (ExpiredJwtException e) {
        System.out.println("El token ha expirado");
      }
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

      if (jwtUtil.validateToken(jwt, userDetails)) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        usernamePasswordAuthenticationToken.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
        
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
      }
    }
    filterChain.doFilter(httpServletRequest, httpServletResponse);
  }
}
