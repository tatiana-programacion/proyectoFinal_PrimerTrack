package com.example.Grupo4.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Grupo4.model.Caracteristica;

@Repository
public interface ICaracteristicaRepository extends JpaRepository<Caracteristica, Integer>{
    
}
