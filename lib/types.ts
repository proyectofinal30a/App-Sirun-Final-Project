import { TypeDiet, CategoryPro, StatusType } from '@prisma/client'

export interface Iimage {
    image: string[]
}


export interface Iproduct {
    id?: string;
    name: string;
    price: number;
    dimension: number;
    available: boolean;
    type: TypeDiet;
    category: CategoryPro;
    image?: Iimage[];
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
    products: Iproduct[]
}






interface Ireviews {
    allReviews: IReview[],
}


export interface Ireducers {
    reducerProduct?: null
    reducerProducts: IallProducts
    reducerUser: Iuser
    reducerProductDetail: IDetail
    reducerProductsByName: IproductsByName
    reducerCart: any
    reducerFilters: IallProducts
    reducerUserReview: Ireviews
}


export interface Ierror {
    name: string,
    price: string,
    dimension: string,
    description: string,
};


declare module "next-auth" {
    interface Session {
        user: {
            name: string
            email: string
            image: string
            role: string
        }
    }
}


interface Idirecciones {
    dir: string
    id?: string
}


interface IimageProduc {
    image: string
}


interface IobjProduct {
    name: string
    id: string
    image: IimageProduc[]
}


interface IproductOrde {

}


interface Iorder {
    total: number
    description: string
    delivery_time: string
    date: string
    product: IobjProduct[]
    status: StatusType
}


interface IdProductFavo {
    id: string
    name: string
    image: string
}
export interface IReview {
    id: string
    review: string
    rating: number
    user: userData
}


interface Ievaluations {
    id: string
    review: string
    rating: number
    product: IobjProduct
}


type userData = {
    id: string
    name: string
    email: string
    image: string
    favorites: Iproduct[]
    direcciones: Idirecciones[]
    orders: Iorder[]
    evaluations: Ievaluations[]
}


interface IPayload {
    payload: userData
}


export interface Iuser {
    user: userData
}


// declare module "next" {
//     interface NextApiRequest {
//         query: Partial<{ [key: string]: string | string[] }>
//     }
// }

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