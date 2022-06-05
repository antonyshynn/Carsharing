package lpnu.Carsharing.entity;

import lpnu.Carsharing.entity.enums.Fuel;
import lpnu.Carsharing.entity.enums.Transmission;
import lpnu.Carsharing.entity.enums.Status;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "cars")
public class Car implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "car_id",nullable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    @Column(nullable = false)
    private Integer year;
    @Column(nullable = false)
    private Integer capacity;
    @Column(nullable = false)
    private Fuel fuelType;
    @Column(nullable = false)
    private Double consumption;
    @Column(nullable = false)
    private Transmission transmission;
    @Column(length = 1000)
    private String imageUrl;
    @Column(nullable = false)
    private Integer price;
    @Column
    private String reportMessage;
    @Column
    private Status status;
    @Column
    private Long purchaserId;
}
