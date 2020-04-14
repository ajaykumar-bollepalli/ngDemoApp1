import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductsService } from './products.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage:boolean = false;
    errorMessage: string;
    
    _listFilter: string;
  
    get listFilter() : string {
      return this._listFilter;
    }
    
    set listFilter(v : string) {
      this._listFilter = v;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    /**
     * ProductService -> Dependency
     */
    constructor(private productList: ProductsService) {
        
    }
    performFilter(filterBy: string) : IProduct[]{
      filterBy = filterBy.toLowerCase();
      return this.products.filter( (product: IProduct) =>
        product.productName.toLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {
      console.log("In OnInit");
      this.productList.getProducts().subscribe( {
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });
      
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message; 
      
    }
}