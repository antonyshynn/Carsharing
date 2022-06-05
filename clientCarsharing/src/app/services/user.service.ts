import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

const API_URL = 'http://localhost:8080/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
}
