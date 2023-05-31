import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Brand } from '../shared/brand';
import { ProductType } from '../shared/product-type';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Product } from '../shared/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: AddProductComponent },
  ],
})
export class AddProductComponent implements OnInit {
  brands = [] as Brand[];
  productTypes = [] as ProductType[];
  product = {} as Product;
  brandSelected: any;
  typeSelected: any;
  imgData: any;
  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    brandId: new FormControl(''),
    productTypeId: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private data: DataService,
    public fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.GetAllBrands();
    this.GetAllProductTypes();

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
      productTypeId: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  GetAllBrands(): void {
    this.data.GetAllBrands().subscribe((result) => {
      this.brands = result;
    });
  }
  GetAllProductTypes(): void {
    this.data.GetAllProductTypes().subscribe((result) => {
      this.productTypes = result;
    });
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgData = reader.result;
    };
  }

  async OnSubmit(): Promise<void> {
    let name = this.productForm.get('name')?.value;
    let price = this.productForm.get('price')?.value;
    let brandId = this.brandSelected;
    let productTypeId = this.typeSelected;
    let description = this.productForm.get('description')?.value;

    this.product.name = name;
    this.product.price = price;
    this.product.brandId = brandId;
    this.product.productTypeId = productTypeId;
    this.product.description = description;
    this.product.image = this.imgData.slice(this.imgData.indexOf(',') + 1);

    this.data.AddProduct(this.product).subscribe((result) => {
      this.snackBar.open(`${result.product.name} created successfully!`, 'Ok', {
        duration: 3000,
      });
      this.router.navigate(['/product']);
    });
  }
}
