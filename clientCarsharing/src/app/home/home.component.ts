import { Component, OnInit } from '@angular/core';
import {Car} from "../car";
import {HttpErrorResponse} from "@angular/common/http";
import {CarService} from "../services/car.service";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAdmin = false;
  cars!: Car[];

  constructor(private carService: CarService, private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getCars();
    let token = sessionStorage.getItem('auth-user')
    if (token === null)
      return
    if (token.includes('user:write'))
      this.isAdmin = true;
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
