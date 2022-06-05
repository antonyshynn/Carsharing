import { Component, OnInit } from '@angular/core';
import {Car} from '../car'
import {UserEntity} from "../user";
import {NgForm} from "@angular/forms";
import {CarService} from "../services/car.service";
import {UserService} from "../services/user.service";
import {TokenStorageService} from "../services/token-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

export interface JWTSession {
  authorities: String[];
  id: number;
  token: string;
  type: string;
  username: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css',
    '../../assets/bootstrap.min.css']
})
export class AdminPanelComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  jwtSession!: JWTSession;
  isAdmin = false;
  isManager = false;

  public blankCar !: Car;
  public blankUser !: UserEntity;
  public cars !: Car[];
  public editCar !: Car;
  public addedCar !: Car;
  public deletedCar !: Car;


  public user !: UserEntity;
  constructor(private authService: AuthService, private router: Router, private carService: CarService, private userService: UserService, private tokenStorageService: TokenStorageService) {
    this.user = this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.getAllCars();
    let token = sessionStorage.getItem('auth-user')
    if (token === null)
      return
    if (token.includes('user:write'))
      this.isManager = true;
    if (token.includes('user:create'))
      this.isAdmin = true;
  }

  public navToHome() {
    this.router.navigate(['/home']);
  }

  public getAllCars() {
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

  public onAddUser(addForm: NgForm): void {
    this.isSignUpFailed = false;
    this.authService.create(addForm.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        addForm.reset();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        addForm.reset();
      }
    );
  }

  public onUpdateCar(car: Car) : void {
    if (car.status === 'OK') {
      car.reportMessage = '';
    }
    this.carService.updateCar(car).subscribe(
      (response: Car) => {
        console.log(response);
        this.getAllCars();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getTitle(str: string | undefined): string {
    if (str === undefined)
      return '';
    return str.substring(0, str.indexOf('\n'));
  }

  public getBody(str: string): string {
    return str.substring(str.indexOf('\n'), str.length);
  }

  public getPosition(string: string, subString: string, index: number) {
    return string.split(subString, index).join(subString).length;
  }




  public onAddCar(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-car-form').click();
    this.carService.addCar(addForm.value).subscribe(
      (response: Car) => {
        this.addedCar = response;
        this.getAllCars();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteCar(carId: number): void {
    this.carService.deleteCar(carId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllCars();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCars(key: string): void {
    console.log(key);
    const results: Car[] = [];
    for (const car of this.cars) {
      if (car.brand.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.model.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.transmission.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.status.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.fuelType.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(car);
      }
    }
    this.cars = results;
    if (!key) {
      this.getAllCars();
    }
  }

  public onOpenModal(car: Car, user: UserEntity, mode: string): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'addCar') {
      button.setAttribute('data-target', '#addCarModal');
    }
    if (mode === 'addUser') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'editCar') {
      this.editCar = car;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'reportMessage') {
      this.editCar = car;
      button.setAttribute('data-target', '#reportMessageModal');
    }
    if (mode === 'delete') {
      this.deletedCar = car;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    if(container) {
      container.appendChild(button);
    }
    button.click();
  };

  logout(): void {
    this.tokenStorageService.signOut();
    // window.location.reload();
    this.router.navigate(['/', 'login']);
  }
}
