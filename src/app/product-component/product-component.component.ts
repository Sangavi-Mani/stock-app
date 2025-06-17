import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 Import this
import { CommonModule } from '@angular/common'; // optional if using *ngIf, *ngFor

import { ProductService, Product } from '../service/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
 imports: [CommonModule, FormsModule,HttpClientModule], // 
  templateUrl: './product-component.component.html'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', reservedItems: 0, availableItems: 0 };
  updateProductData: Product = { id: 0, name: '', availableItems: 0, reservedItems: 0 };
  productById?: Product;
  searchId: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
    console.log(this.products);
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(data => {
      this.products.push(data);
      this.newProduct = { name: '', reservedItems: 0, availableItems: 0 };
    });
  }

  getProductById(): void {
    this.productService.getProductById(this.searchId).subscribe(data => {
      this.productById = data;
    });
  }

  populateUpdateForm(product: Product): void {
    this.updateProductData = { ...product }; // Copy product data
  }

  updateProduct(): void {
    if (this.updateProductData.id != null) {
      this.productService.updateProduct(this.updateProductData.id, this.updateProductData).subscribe(data => {
        this.loadAllProducts(); // Refresh list
        this.updateProductData = { id: 0, name: '', availableItems: 0, reservedItems: 0 };
      });
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }
}
