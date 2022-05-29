package com.example.ets.controller;

import com.example.ets.business.JWTUtility;
import com.example.ets.business.SecurityConfiguration;
import com.example.ets.business.UserService;

import com.example.ets.model.JwtRequest;
import com.example.ets.model.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value="/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class AuthController {

  @Autowired
  private JWTUtility jwtUtility;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserService userService;



    @PostMapping("/authenticate")
    public ResponseEntity<JwtResponse> authenticate(@RequestBody JwtRequest jwtRequest){


        UserDetails user=userService.loadUserByUsername(jwtRequest.getUsername());

        var isUserAuthenticated= user.getPassword().equals(jwtRequest.getPassword());

        var token= "";
        if(isUserAuthenticated){

           token =  jwtUtility.generateToken(user);
        }else {
            return new ResponseEntity<>((HttpStatus.UNAUTHORIZED));
        }


        return ResponseEntity.ok(new JwtResponse(token));



//
//        try {
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            jwtRequest.getUsername(),
//                            jwtRequest.getPassword()
//                    )
//            );
//        } catch (BadCredentialsException e) {
//            throw new Exception("INVALID_CREDENTIALS", e);
//        }
//
//        final UserDetails userDetails
//                = userService.loadUserByUsername(jwtRequest.getUsername());
//
//        final String token =
//                jwtUtility.generateToken(userDetails);
//
//        return  new JwtResponse(token);
    }
}
