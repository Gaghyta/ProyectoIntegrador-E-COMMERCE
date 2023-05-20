import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class NavigationService {
    constructor(private router: Router) {}

    /**
     * Navigates to 'Home' landing page
     */
    navigateToHome(): void {
        this.router.navigate(['/home']);
    }

    /**
     * Navigates to 'Sistema de talla' landing page
     */
    navigateToSistemaDeTalla(): void {
        this.router.navigate(['/sistema-de-talla']);
    }

    /**
     * Navigates to 'Talle Estandar' landing page.
     */
    
    navigateToTallaEstandar(): void {
        this.router.navigate(['/talla-estandar']);
    }

    /**
     * Navigates to 'Talle Personalizada' landing page.
     */
    
    navigateToTallaPersonalizada(): void {
        this.router.navigate(['/talla-personalizada']);
    }

    /**
     * Navigates to 'Product/:id' landing page for individual product.
     */
    navigateToProduct(): void {
        this.router.navigate(['/product']);
    }

    /**
     * Navigates to 'Products' landing where it shows all the products.
     */
    navigateToProducts(): void {
        this.router.navigate(['/products']);
    }

    /**
     * Navigates to 'Contacto' landing page.
     */

    navigateToContacto(): void {
        this.router.navigate(['/contacto']);
    }
}