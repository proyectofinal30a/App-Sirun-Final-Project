import { TypeDiet, CategoryPro, StatusType, User } from "@prisma/client";


export interface Iimage {
  image: string;
  id?: string;
}

///For Form Mercado pago
export interface IUserBuyer {
  email: string;
  name: string;
  address: {
    id?: string;
    street_name: string;
    name_address: string;
    street_number: string;
    zip_code: string;
  };
  phone: {
    number: string;
    area_code: string;
  };
}

export interface Ipreference {
  external_reference?: string
  payer: IUserBuyer;
  items: IproductModelCart[];
  back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
}

export interface IproductModelCart {
  id: string;
  title: string;
  unit_price: number;
  picture_url: string;
  quantity: number;
  subTotal: number;
  currency_id: "ARS";
}

export interface IproductsCardModel {
  products: IproductModelCart[];
  confirmed: Boolean;
  payLink: string;
}

///

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
  evaluation: Ievaluations[];
}

interface packImage {
  image: string;
  imageCloudinary: Blob;
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
  products: Iproduct[];
  productsToFilter: Iproduct[];
  productPrevState: Iproduct[];
}

export interface IproductsByName {
  products: Iproduct[];
}

export interface PackProducDetailRating {
  detail: Iproduct;
  rating: number;
}

export interface ImyOrder {
  myOrder: {
    external_reference: string
    purchase_link: true
    total: string
    status: string
    date: string
    delivery_time: string
    user: {
      id: string
    };
    purchasedProducts: IitemForMercadoPago[];
  };
  purchasedProducts: IitemForMercadoPago[];
}

interface IallUsers {
  allUsers: userData[];
  usersByName: userData[];
}
export interface Iproducts {
  products: Iproduct[],
  productsToFilter: Iproduct[],
  productEdit: any,
  productsUpdate: any
  errorMessage: string
}
export interface Ireducers {
  reducerProduct?: null;
  reducerProducts: IallProducts;
  reducerUser: IUserDetail;
  reducerProductDetail: PackProducDetailRating;
  reducerProductsByName: IproductsByName;
  reducerCart: IproductsCardModel;
  reducerFilters: IallProducts;
  reducerAfterPayment: ImyOrder;
  reducerAllUsers: IallUsers;
  reducerAdmin: Iproducts;
  reducerAdminManagement: IadminManagement;
  reducerAdminReview: IreviewRedux
}

export interface Ierror {
  name: string;
  price: string;
  dimension: string;
  description: string;
}



declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      role: string;
    };
  }
}

export interface IDataAddress {
  name_address: string
  street_name: string
  street_number: string
  zip_code: string
  number: string
  area_code: string
}
export interface Iaddresses {
  id?: string
  name_address: string;
  zip_code: string;
  street_name: string;
  street_number: string;
  phone: {
    area_code: string;
    number: string;
  };
}




interface IimageProduc {
  image: string;
}

interface IobjProduct {
  name: string;
  id: string;
  image: IimageProduc[];
}

export interface IitemForMercadoPago {
  picture_url: string;
  title: string;
  quantity: string;
  unit_price: string;
  id?: string;
}

export interface Iorder {
  id: string;
  idPurchase: string;
  total: number;
  description: string;
  delivery_time: string;
  date: string;
  address: Iaddresses;
  purchasedProducts: IproductModelCart[];
  status: StatusType;
  purchase_link: string;
  id_user?: string;
  user?: User;
  addressOrder?: Iaddresses;
}

export interface IReview {
  id: string;
  review: string;
  rating: number;
  user: userData;
}

export interface Ievaluations {
  id: string;
  review: string;
  rating: number;
  product: IobjProduct;
  user: userData;
}

export interface userData {
  id: string;
  name: string;
  email: string;
  image: string;
  favorites: Iproduct[];
  addresses: Iaddresses[];
  orders: Iorder[];
  evaluations: Ievaluations[];
  role: string;
  favoriteId?:string[]
}

export interface IUserDetail {
  user: userData;
}

//Order
export interface IbodoyPreferenceLink {
  order: Ipreference;
  purchase_link: string;
}
//

export interface IadminManagement {
  usersOrders: Iorder[];
  usersOrdersAutoSave: Iorder[];
}


export interface IreviewAll {
  user: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
  product: {
    id: string;
    name: string;
    image: {
      image: string;
    }[];
  };
  rating: number;
  id: string;
  review: string;

}

export interface IuserReview {
  name: string;
  image: string;
  evaluations: {
    product: {
      name: string;
      image: string;
    };
    review: string;
    rating: number;
  }[]
}


export interface IProductReview {
  image: string
  name: string;
  evaluation: {
    user: {
      name: string;
      image: string;
    };
    review: string;
    rating: number;
  }[];
}

export interface IreviewRedux {
  reviewSave: IreviewAll[]
  reviewReact: IreviewAll[]
  userReview: IuserReview | null
  productReview: IProductReview | null
}

