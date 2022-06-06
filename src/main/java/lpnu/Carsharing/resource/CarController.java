package lpnu.Carsharing.resource;

import lpnu.Carsharing.entity.Car;
import lpnu.Carsharing.service.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Car>> findCarByUserId(@PathVariable("id") Long id) {
        System.out.println(id);
            List<Car> toys = carService.findAllCarsByUserId(id);
            return new ResponseEntity<>(toys, HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Car>> findAllCars() {
        List<Car> toys = carService.findAllCars();
        return new ResponseEntity<>(toys, HttpStatus.OK);
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<Car> addToy(@RequestBody Car car) {
        Car newCar = carService.addCar(car);
        return new ResponseEntity<>(newCar, HttpStatus.CREATED);

    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<Car> updateComputer(@RequestBody Car car) {
       Car updatedCar = carService.updateCar(car);
        return new ResponseEntity<>(updatedCar, HttpStatus.OK);
    }

    @PutMapping("/report")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<Car> updateReport(@RequestBody Car car) {
        Car updatedCar = carService.updateCar(car);
        return new ResponseEntity<>(updatedCar, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<?> deleteToy(@PathVariable("id") Long id) {
        carService.deleteCar(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search/{carBrand}/{price}/{year}")
    @PreAuthorize("hasAuthority('user:read')")
    public ResponseEntity<List<Car>> findCarByUserId(@PathVariable("carBrand") String carBrand, @PathVariable("price") Integer price,
                                                     @PathVariable("year") Integer year) {
        List<Car> carsByCriteria = carService.findCarsByCriteria(carBrand, price, year);
        return new ResponseEntity<>(carsByCriteria, HttpStatus.OK);
    }
}
