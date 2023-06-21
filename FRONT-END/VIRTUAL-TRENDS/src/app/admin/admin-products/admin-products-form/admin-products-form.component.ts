import { Component, Input, OnInit } from '@angular/core';
import { GetCategoriesService } from 'src/app/services/admin/getCategories.service';
import { ProductsService } from 'src/app/services/admin/adminProducts.service';
import { Products } from 'src/app/utils/products';
import { AdminProductsComponent } from '../admin-products.component';
import { BehaviorSubject } from 'rxjs';
import { UserData } from 'src/app/services/auth/userdata';

@Component({
  selector: 'app-admin-products-form',
  templateUrl: './admin-products-form.component.html',
  styleUrls: ['./admin-products-form.component.css']
})
export class AdminProductsFormComponent implements OnInit {

  @Input() type: string = '';
  @Input() showModifyForm: boolean = false;
  colorsList: Products.Colors[] = ["dark-red", "dark-green", "purple-grey", "orange", "coral", "cyan"];
  sizesList: Products.Sizes[] = ["XS", "S", "M", "L", "XL"];
  id_prod: string = '';
  categorias: string[] = [];
  newProduct: Products.AdminProduct = {
    nombre: "",
    descripcion: "",
    precio: 0,
    colores: [],
    tallas: [],
    imagenes: [],
    categoria: "Remera"
  };
  modifiedProduct: Products.AdminProduct = {
    id_prod: 0,
    nombre: "",
    descripcion: "",
    precio: 0,
    colores: [],
    tallas: [],
    imagenes: [],
    categoria: "Remera",
    eliminar: false
  };
  idProductoValidationModify: boolean = false;
  idProductoValidationDelete: boolean = false;
  nameValidation: boolean = false;
  descriptionValidation: boolean = false;
  priceValidation: boolean = false;
  colorsValidation: boolean = false;
  sizesValidation: boolean = false;
  imagesValidation = {
    first: false,
    second: false,
    third: false
  };
  categoryValidation: boolean = true;
  showErrorText: boolean = false;
  showNotFoundTextDelete: boolean = false;
  showNotFoundTextModify: boolean = false;
  showProgressTextAdd: boolean = false;
  showProgressTextModify: boolean = false;
  showProgressTextDelete: boolean = false;
  showSuccessTextModify: boolean = false;
  showSuccessTextDelete: boolean = false;
  showSuccessTextAdd: boolean = false;
  showDeletedProductAdvertisement: boolean = false;

  constructor(private AdminProducts: ProductsService, private AdminCategories: GetCategoriesService, private AdminParentComponent: AdminProductsComponent) { }

  ngOnInit() {
    this.AdminCategories.get().subscribe((data: any) => {
      this.categorias = data;
    });
  }

  // Validaciones

  validateName() {
    const name = (document.getElementById('name-input') as HTMLInputElement).value;
    this.nameValidation = name.length > 0 && (/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g).test(name);
  }

  validateDescription() {
    const description = (document.getElementById('description-input') as HTMLInputElement).value;
    this.descriptionValidation = description.length > 0;
  }

  validatePrice() {
    const price = (document.getElementById('price-input') as HTMLInputElement).value;
    this.priceValidation = price.length > 0 && (/^[0-9]+(\.[0-9]{1,2})?$/g).test(price);
  }

  validateIdProductoModify() {
    const id_prod_modify = (document.getElementById('id-producto-modify') as HTMLInputElement).value;
    this.idProductoValidationModify = id_prod_modify.length > 0 && (/^[0-9]+$/g).test(id_prod_modify);
  }

  validateIdProductoDelete() {
    const id_prod_delete = (document.getElementById('id-producto-delete') as HTMLInputElement).value;
    this.idProductoValidationDelete = id_prod_delete.length > 0 && (/^[0-9]+$/g).test(id_prod_delete);
  }

  validateImages() {
    const firstPic = (document.getElementById('first-image-input') as HTMLInputElement).value;
    const secondPic = (document.getElementById('second-image-input') as HTMLInputElement).value;
    const thirdPic = (document.getElementById('third-image-input') as HTMLInputElement).value;
    this.imagesValidation.first = firstPic.length > 0;
    this.imagesValidation.second = secondPic.length > 0;
    this.imagesValidation.third = thirdPic.length > 0;
  }

  validateCategory() {
    const category = (document.getElementById('categories-select') as HTMLSelectElement).value;
    this.categoryValidation = category.length > 0;
  }

  resetState() {
    // Esta función es para resetear el estado inicial de los inputs para no enviar datos erróneos ya que los datos que se reciben del servicio son solo para mostrar.
    this.modifiedProduct = {
      id_prod: 0,
      nombre: "",
      descripcion: "",
      precio: 0,
      colores: [],
      tallas: [],
      imagenes: [],
      categoria: ""
    };
  }

  modifyProduct() {
    this.showModifyForm = false;
    this.resetState();
    this.id_prod = (document.getElementById('id-producto-modify') as HTMLInputElement).value;
    this.AdminProducts.get(this.id_prod).subscribe((data: any) => {
      this.showNotFoundTextModify = false;
      this.showModifyForm = true;
      this.modifiedProduct = data;
    });
    setTimeout(() => {
      (document.getElementById('categories-select') as HTMLSelectElement).value = this.modifiedProduct.categoria;
    }, 100);
    this.showNotFoundTextModify = this.modifiedProduct.id_prod === 0 ? true : false;
  }

  deleteProduct() {
    this.id_prod = (document.getElementById('id-producto-delete') as HTMLInputElement).value;
    this.AdminProducts.delete(Number(this.id_prod)).subscribe((data: any) => {
      this.showNotFoundTextDelete = false;
      this.showSuccessTextDelete = true;
    }, error => {
      this.showNotFoundTextDelete = true;
    });
  }

  addProduct(e: any) {
    e.preventDefault();

    if (this.type === 'add') {
      // Colors
      Array.from(this.colorsList).forEach(color => {
        Array.from(document.getElementsByClassName('color-checkbox')).forEach(element => {
          if (element.id === color && (element as HTMLInputElement).checked) {
            this.newProduct.colores.push(color);
          }
        });
      });

      // Sizes
      Array.from(this.sizesList).forEach(size => {
        Array.from(document.getElementsByClassName('talle-checkbox')).forEach(element => {
          if (element.id === size && (element as HTMLInputElement).checked) {
            this.newProduct.tallas.push(size);
          }
        });
      });

      this.colorsValidation = this.newProduct.colores.length > 0;
      this.sizesValidation = this.newProduct.tallas.length > 0;

      this.showErrorText = !this.colorsValidation || !this.sizesValidation;

      this.newProduct.nombre = (document.getElementById('name-input') as HTMLInputElement).value;
      this.newProduct.descripcion = (document.getElementById('description-input') as HTMLInputElement).value;
      this.newProduct.precio = Number((document.getElementById('price-input') as HTMLInputElement).value);
      this.newProduct.categoria = (document.getElementById('categories-select') as HTMLSelectElement).value;
      this.newProduct.imagenes.push((document.getElementById('first-image-input') as HTMLInputElement).value);
      this.newProduct.imagenes.push((document.getElementById('second-image-input') as HTMLInputElement).value);
      this.newProduct.imagenes.push((document.getElementById('third-image-input') as HTMLInputElement).value);

      this.showProgressTextAdd = this.colorsValidation && this.sizesValidation;

      if (this.showProgressTextAdd) {
        this.AdminProducts.add(this.newProduct).subscribe((data: any) => {
          this.showSuccessTextAdd = true;
        });
      }

    }
    else if (this.type === 'modify') {
      this.resetState();

      // Colors
      Array.from(this.colorsList).forEach(color => {
        Array.from(document.getElementsByClassName('color-checkbox')).forEach(element => {
          if (element.id === color && (element as HTMLInputElement).checked) {
            if (!this.modifiedProduct.colores.includes(color)) {
              this.modifiedProduct.colores.push(color);
            }
          }
        });
      });

      // Sizes
      Array.from(this.sizesList).forEach(size => {
        Array.from(document.getElementsByClassName('talle-checkbox')).forEach(element => {
          if (element.id === size && (element as HTMLInputElement).checked) {
            if (!this.modifiedProduct.tallas.includes(size)) {
              this.modifiedProduct.tallas.push(size);
            }
          }
        });
      });

      this.colorsValidation = this.modifiedProduct.colores.length > 0;
      this.sizesValidation = this.modifiedProduct.tallas.length > 0;

      this.showErrorText = !this.colorsValidation || !this.sizesValidation;

      this.modifiedProduct.id_prod = Number((document.getElementById('id-producto-modify') as HTMLInputElement).value);
      this.modifiedProduct.nombre = (document.getElementById('name-input') as HTMLInputElement).value;
      this.modifiedProduct.descripcion = (document.getElementById('description-input') as HTMLInputElement).value;
      this.modifiedProduct.precio = Number((document.getElementById('price-input') as HTMLInputElement).value);
      this.modifiedProduct.categoria = (document.getElementById('categories-select') as HTMLSelectElement).value;
      if (!this.modifiedProduct.imagenes.includes((document.getElementById('first-image-input') as HTMLInputElement).value)) {
        this.modifiedProduct.imagenes.push((document.getElementById('first-image-input') as HTMLInputElement).value);
      }
      if (!this.modifiedProduct.imagenes.includes((document.getElementById('second-image-input') as HTMLInputElement).value)) {
        this.modifiedProduct.imagenes.push((document.getElementById('second-image-input') as HTMLInputElement).value);
      }
      if (!this.modifiedProduct.imagenes.includes((document.getElementById('third-image-input') as HTMLInputElement).value)) {
        this.modifiedProduct.imagenes.push((document.getElementById('third-image-input') as HTMLInputElement).value);
      }

      this.showProgressTextModify = this.colorsValidation && this.sizesValidation;

      if (this.showProgressTextModify) {
        this.AdminProducts.update(this.modifiedProduct).subscribe((data: any) => {
          this.showSuccessTextModify = data ? true : false;
        });
      }
    }
  }

}
