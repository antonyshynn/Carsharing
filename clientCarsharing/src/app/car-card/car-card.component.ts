import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Car} from "../car";
import {HttpErrorResponse} from "@angular/common/http";
import {UserEntity} from "../user";
import {CarService} from "../services/car.service";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css', '../home/home.component.css', '../../assets/bootstrap.min.css']
})
export class CarCardComponent implements OnInit {
  @Input() childCar!:Car;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();

  public user: UserEntity;
  public editCar!: Car;
  public car!:Car;
  public cars!:Car[];

  constructor(private carService: CarService, private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = tokenStorageService.getUser();
  }


  ngOnInit(): void {
    this.getCars();
  }

  public onOpenModal(car: Car) {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#updateReport');
    this.editCar = car;
    if(container) {
      container.appendChild(button);
    }
    button.click();
  }

  public onUpdateCar(car: Car) : void {
    this.carService.updateCar(car).subscribe(
      (response: Car) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  public onUpdateReport(message: string) {
    this.editCar.reportMessage = "\n\nUser: @" + this.user.username
      + " are writing about the car: #" + this.editCar.brand + ' ' + this.editCar.model +  "\n\n" + message.valueOf();
    this.editCar.status = "RENTED";
    this.editCar.purchaserId = this.user.id;
    if (this.editCar.id != null) {
      this.onUpdateCar(this.editCar);
    }
  }

  public getCars(): void {
    this.carService.getAllCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        this.cars.sort(function (a, b) {
          return b.price - a.price;
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
