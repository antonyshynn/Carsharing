package lpnu.Carsharing.service;

import lpnu.Carsharing.entity.Car;
import lpnu.Carsharing.exception.CarNotFoundException;
import lpnu.Carsharing.repo.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class CarService {
    CarRepository carRepository;



    public Car findCarById(Long id) {
        return carRepository.findCarById(id)
                .orElseThrow(() -> new CarNotFoundException("Computer was not found with id: " + id));
    }

    public List<Car> findAllCars() {
        return carRepository.findAll();
    }

    public List<Car> findAllCarsByUserId(Long id) {
        return carRepository.findCarsByRoomId(id);
    }

    public Car addCar(Car car) {
        return carRepository.save(car);
    }

    public Car updateCar(Car car) {
        return carRepository.save(car);
    }

    public Long deleteCar(Long id) {
        return carRepository.deleteCarById(id).orElseThrow(() -> new CarNotFoundException("Cannot delete car with id: "  + id
        + ", because there is no such id"));
    }

}
