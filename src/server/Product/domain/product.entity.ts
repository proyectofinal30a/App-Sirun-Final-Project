import { UserEntity } from "@User/domain/user.entity";

export interface Phone {
    area_code: number;
    number: number;
}

export interface Address {
    id: string;
    zipCode: string;
    streetName: string;
    available: boolean
    streetNumber: string;
    phone: Phone;
}

export interface ProductEntity {
    id: string;
    name: string;
    price: number;
    dimensionInCm: string;
    available: string;
    type: TypeDiet;
    category: CategoryPro;
    description: string;
    evaluation: string;
    images: string[];
    order: string;
    user: UserEntity[];
}


enum TypeDiet {
    Vegan = 'vegan',
    Celiac = 'celiac',
    VeganAndCeliac = 'vegan and Celiac',
    None = 'none'
}

enum CategoryPro {
    Cakes = 'cakes',
    Muffins = 'muffins',
    Cookies = 'cookies',
    Bakery = 'bakery',
    Desserts = 'desserts',
    Pies = 'pies',
    Others = 'other'
}