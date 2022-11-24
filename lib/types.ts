import { TypeDiet, CategoryPro, StatusType } from '@prisma/client'

export interface Iimage {
    image: string
    id?: string
}

export interface IinfoBuyer {
    email: string
    name: string
    address: {
        streetName: string,
        streetNumber: number,
        zipCode: number
    }
    phone: {
        number: number
        area_code: number
    }
}

export interface IbodyForMercadoPago {
    infoBuyer: IinfoBuyer
    products: IitemForMercadoPago[]
}

export interface IitemForMercadoPago {
    id: string
    name: string
    price: number
    image: Iimage[]
    quantity: number
}





export interface Iproduct {
    id: string;
    name: string;
    price: number;
    dimension: number;
    available: boolean;
    type: TypeDiet;
    category: CategoryPro;
    image: Iimage[];
    description: string;
    evaluation: Ievaluations[]
}




interface packImage {
    image: string
    imageCloudinary: Blob
}
export interface IproductSumbit {
    name: string;
    price: number;
    dimension: number;
    available: boolean;
    type: TypeDiet;
    category: CategoryPro;
    image: packImage[];
    description: string;
}


export interface IallProducts {
    products: Iproduct[]
    productsToFilter: Iproduct[]
    productPrevState: Iproduct[]
}


export interface IproductsByName {
    products: Iproduct[]
}

export interface PackProducDetailRating {
    detail: Iproduct
    rating: number
}

export interface ImyOrder {
    myOrder: {
      external_reference: string;
      total: string;
      status: string;
      date: string;
      delivery_time: string;
      user: IinfoBuyer;
      purchasedProducts: IitemForMercadoPago[];
    };
}

interface IallUsers {
    allUsers: Iuser[];
    usersByName: Iuser[];
}

export interface Ireducers {
    reducerProduct?: null
    reducerProducts: IallProducts
    reducerUser: Iuser
    reducerProductDetail: PackProducDetailRating
    reducerProductsByName: IproductsByName
    reducerCart: any
    reducerFilters: IallProducts
    reducerAfterPayment: ImyOrder
    reducerAllUsers: IallUsers
    reducerAdmin : any

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




interface Iorder {
    total: number
    description: string
    delivery_time: string
    date: string
    product: IobjProduct[]
    status: StatusType
}


export interface IReview {
    id: string
    review: string
    rating: number
    user: userData
}


export interface Ievaluations {
    id: string
    review: string
    rating: number
    product: IobjProduct
    user: userData
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