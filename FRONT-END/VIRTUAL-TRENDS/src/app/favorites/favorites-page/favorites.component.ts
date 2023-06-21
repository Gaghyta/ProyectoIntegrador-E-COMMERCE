import { Component, OnInit } from '@angular/core';
import { DniDataService } from 'src/app/services/data-services/dni-data.service';
import { FavoritesService } from 'src/app/services/products-services/favorites.service';
import { Products } from 'src/app/utils/products';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  products: Products.Product[] = [];
  hasFavorite: boolean = false;
  hasAmount: boolean = false;
  isLoading: boolean = false;
  emptyFavorites: boolean = false;
  constructor(private FavoritesService: FavoritesService, private DNIService: DniDataService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.DNIService.recibirDNI().subscribe(dni => {
      this.loadProducts(dni);
    });
    setTimeout(() => {
      this.isLoading = false;
      this.emptyFavorites = this.products.length === 0;
    }, 1000);

  }

  public loadProducts(dni: number) {
    this.FavoritesService.get(dni).subscribe((data: any) => {
      this.products = data;
    });
  }
}
