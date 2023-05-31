import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  Today: Date = new Date();
  apiUrl = 'http://localhost:5240/api';

  httpAuthOptions = {
    headers: new HttpHeaders({
      ContentType: 'aplication/json',
      token: 'true',
    }),
  };
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'aplication/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  Login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post(
        `${this.apiUrl}/Auth/Login`,
        {
          emailaddress: email,
          password: password,
        },
        this.httpOptions
      )
      .pipe((result) => result);
  }

  CheckToken(token: any): Observable<any> {
    return this.httpClient
      .post(
        `${this.apiUrl}/Auth/CheckToken`,
        {
          token: `${token}`,
        },
        this.httpOptions
      )
      .pipe(map((result) => result));
  }

  Register(email: string, pass: string): Observable<any> {
    return this.httpClient
      .post(
        `${this.apiUrl}/Auth/Register`,
        {
          emailaddress: email,
          password: pass,
        },
        this.httpOptions
      )
      .pipe(map((result) => result));
  }

  GetAllProducts(): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}/Product/GetAllProducts`, this.httpAuthOptions)
      .pipe(map((result) => result));
  }

  GetAllBrands(): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}/Product/GetAllBrands`, this.httpAuthOptions)
      .pipe(map((result) => result));
  }

  GetAllProductTypes(): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}/Product/GetAllProductTypes`, this.httpAuthOptions)
      .pipe(map((result) => result));
  }

  AddProduct(p: Product): Observable<any> {
    return this.httpClient
      .post(
        `${this.apiUrl}/Product/AddProduct`,
        {
          name: p.name,
          price: p.price,
          brandId: p.brandId,
          productTypeId: p.productTypeId,
          description: p.description,
          image: p.image,
          dateCreated: this.Today,
        },
        this.httpAuthOptions
      )
      .pipe(map((result) => result));
  }
}
