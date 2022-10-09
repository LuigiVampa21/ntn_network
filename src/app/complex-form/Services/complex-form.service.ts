import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, mapTo, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ComplexFormValue } from "../models/complex-form-value.model";



@Injectable({
  providedIn: 'root',
})

export class ComplexFormService {
    
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environment.apiURL}/users`, formValue).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    );
  }
}