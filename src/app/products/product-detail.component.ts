import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsService } from './products.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMessage: string;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductsService) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.getProduct(id);
  }
  getProduct(id: number): void {
    this.productService.getProduct(id) .subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    })
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
