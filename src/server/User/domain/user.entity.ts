import { ProductEntity } from "@Product/domain/product.entity";

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

export interface UserEntity {
    name: string;
    id: string;
    email: string;
    role: string;
    address: Address[];
    products: ProductEntity[];
}