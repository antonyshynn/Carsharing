import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../car";
import {HttpErrorResponse} from "@angular/common/http";
import {CarService} from "../services/car.service";
import {UserEntity} from "../user";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css', '../home/home.component.css', '../../assets/bootstrap.min.css']
})
export class CarListComponent implements OnInit {
  carBrand !: string | null;
  price !: string | null;
  year !: string | null;
  carsList !: Car[];
  user: UserEntity;
  editCar!: Car;


  constructor(private route: ActivatedRoute,
              private router: Router, private carService: CarService, private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = tokenStorageService.getUser();
    this.route.queryParamMap
      .subscribe(params => {
        this.carBrand = params.get('carBrand');
        this.price = params.get('price');
        this.year = params.get('year');
      });
    this.getCars();
  }

  ngOnInit(): void {

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
    if (this.carBrand === null && this.price === null && this.year === null) {
      this.carService.getAllCars().subscribe(
        (response: Car[]) => {
          this.carsList = response;
          this.carsList.sort(function (a, b) {
            return b.price - a.price;
          });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.carService.getCarsByCriteria(this.carBrand, this.price, this.year).subscribe(
        (response: Car[]) => {
          this.carsList = response;
          this.carsList.sort(function (a, b) {
            return b.price - a.price;
          });
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }


}
