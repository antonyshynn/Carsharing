import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car} from "../car";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getCarsById(carId: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerUrl}/cars/room/${carId}`);
  }

  public getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerUrl}/cars/all`);
  }

  public addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiServerUrl}/cars/add`, car);
  }

  public updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiServerUrl}/cars/update`, car);
  }

  public deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/cars/delete/${carId}`);
  }

  public getCarsByCriteria(carBrand: string | null, price: string | null, year: string | null): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiServerUrl}/cars/search/${carBrand}/${price}/${year}`);
  }

}
