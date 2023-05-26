package com.example.Grupo4.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Grupo4.model.Ciudad;



@Repository
public interface ICiudadRepository extends JpaRepository<Ciudad, Integer>{

    
}
