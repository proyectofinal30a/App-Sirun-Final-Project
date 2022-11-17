import { TypeDiet, CategoryPro } from '@prisma/client'


export interface Iproduct {
    id?: string;
    name: string;
    price: number;
    dimension: number;
    available: boolean;
    type: TypeDiet;
    category: CategoryPro;
    image: any;
    description: string;
}


export interface IallProducts {
    products: Iproduct[] | []
    productsToFilter: Iproduct[]
    productPrevState: Iproduct[]
}


export interface IDetail {
    productDetail: Iproduct
}


export interface IproductsByName {
    products: Iproduct[] | []
}


export interface Ireducers {
    reducerProduct?: null
    reducerProducts: IallProducts
    reducerUser?: null
    reducerProductDetail: IDetail
    reducerProductsByName: IproductsByName
    reducerCart: any
    reducerFilters: IallProducts
}


export interface Ierror {
    name: string,
    price: string,
    dimension: string,
    description: string,
};



// const status_typee: Status_type = "pending"

// export type orderr = {
//     id: String;
//     id_user: String;
//     description: String;
//     products_id: Number[];
//     total: any;
//     status: Status_type;
//     date: String;
//     delivery_time: String;
// }