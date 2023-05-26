package com.example.Grupo4.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "productos")
public class Producto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String nombre;

  @Column(columnDefinition = "LONGTEXT")
  private String descripcion;

  @OneToMany(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "producto_id")
  private List<Imagen> imagenes;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinColumn(name = "caracteristica_id")
  private List<Caracteristica> caracteristicas;

  @OneToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "politica_id")
  private Politica politica;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "categoria_id")
  @JsonIgnoreProperties("productos")
  private Categoria categoria;

  @ManyToOne(cascade = CascadeType.MERGE)
  @JoinColumn(name = "ciudad_id")
  private Ciudad ciudad;
}
