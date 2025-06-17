import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  availableItems: number;
  reservedItems: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:2222/stocks';

  constructor(private http: HttpClient) {}

  // addProduct(product: Product): Observable<Product> {
  //     let result  = this.http.post<Product>(`${this.baseUrl}/save`, product);
  //   return result;
  // }

 

addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(`${this.baseUrl}/save`, product).pipe(
    catchError(error => {
      console.error('Error adding product:', error);
      return throwError(() => new Error('Something went wrong while adding the product'));
    })
  );
}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/all`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/update/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
