import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  displayedColumns: string[] = [
    'image',
    'name',
    'brand',
    'productType',
    'description',
  ];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: false }) set matPaginator(
    mp: MatPaginator
  ) {
    setTimeout(() => (this.dataSource.paginator = mp), 3000);
  }
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    setTimeout(() => (this.dataSource.sort = ms), 3000);
  }

  constructor(private data: DataService) {
    this.GetAllProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetAllProducts(): any {
    let productArr = [] as Product[];
    this.data.GetAllProducts().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
    });
  }
}
