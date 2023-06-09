export namespace Products {

    export interface Product {
        /** Id of the product. */
        id: number;
        /** Name of the product. */
        name: string;
        /** Description of the product. */
        description: string;
        /** Price in argentine pesos. */
        price: number;
        /** Icon for preview in Products landing. */
        icon: string;
        /** Pictures for the product. */
        pictures: Pictures[];
        /** Available colors for the product. */
        colors: Colors[];
        /** If true, the product is available for purchase. */
        available?: boolean;
        /** Sizes available for the product. */
        sizes?: Sizes[];
        /** Type of product. */
        type: string;
        /** Favorite */
        favorite?: boolean;
        amount?: number;
    }

    interface Pictures {
        /** Id of the picture. */
        id: number;
        /** Source of the picture. */
        src: string;
    }

    type Colors = null | 'dark-red' | 'dark-green' | 'dark-blue' | 'purple-grey' | 'orange' | 'coral' | 'cyan' | 'black' | 'white';

    type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

    export interface ProductData {
        name: string;
        description: string;
        colors: Colors[];
        pictures: Pictures[];
    }
}