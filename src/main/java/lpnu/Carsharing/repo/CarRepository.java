package lpnu.Carsharing.repo;

import lpnu.Carsharing.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, Long> {

    Optional<Car> findCarById(Long id);

    Optional<Long> deleteCarById(Long id);

    List<Car> findCarsByPurchaserId(Long id);

    List<Car> findByBrandIgnoreCaseAndPriceIsLessThanAndYearIsGreaterThan(String brand, Integer price, Integer year);

}
