


//request de Vendedor para la Order

axios({
    method: 'get',
    url: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=test_user',
    headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
    }
})


//request Example


//datos que necesito para crear Order
const order = {
    external_reference: '2022-11-22T20:31:58.556Z',
    items: [{
        id: '836e7c7c-8d0a-41d4-bc60-380ff179dff2',
        category_id: '',
        currency_id: 'ARS',
        description: '',
        picture_url: 'https://izzycooking.com/wp-content/uploads/2021/05/Tres-Leches-Cake-683x1024.jpg',
        title: 'TRES LECHES CAKE',
        quantity: 1,
        unit_price: 500
    }],
    payer: {
        phone: { area_code: '1121', number: '1231212' },
        address: {
            zip_code: '5521',
            street_name: 'calle cerro arco',
            street_number: '1'
        },
        email: 'test_user_16943485@testuser.com',
    },

}
//


//datos datos de confirmacion
const adminData = {
    "money_release_status": "pending",
    "status_detail": "accredited",
    "status": "approved",
    "transaction_amount_refunded": 0,
    "transaction_amount": 1300,
    "id": 51785037066,
}




const dataUser = {
    additional_info: '',
    auto_return: '',
    back_urls: {
        failure: 'http://localhost:3000/',
        pending: 'http://localhost:3000/',
        success: 'http://localhost:3000/'
    },
    binary_mode: false,
    client_id: '1385912062963638',
    collector_id: 1239200986,
    coupon_code: null,
    coupon_labels: null,
    date_created: '2022-11-22T17:17:58.324-04:00',
    date_of_expiration: null,
    expiration_date_from: null,
    expiration_date_to: null,
    expires: false,
    external_reference: '2022-11-22T21:17:57.432Z',
    id: '1239200986-5f3aff28-ba00-4178-a969-15d789279b98',
    init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1239200986-5f3aff28-ba00-4178-a969-15d789279b98',
    internal_metadata: null,
    items: [
        {
            id: '836e7c7c-8d0a-41d4-bc60-380ff179dff2',
            category_id: '',
            currency_id: 'ARS',
            description: '',
            picture_url: 'https://izzycooking.com/wp-content/uploads/2021/05/Tres-Leches-Cake-683x1024.jpg',
            title: 'TRES LECHES CAKE',
            quantity: 1,
            unit_price: 500
        },
        {
            id: '0fcfd1c9-0ef5-4e86-ba3f-1e2488c0df15',
            category_id: '',
            currency_id: 'ARS',
            description: '',
            picture_url: 'https://izzycooking.com/wp-content/uploads/2021/05/Tres-Leches-Cake-683x1024.jpg',
            title: 'CHURROS WITH CHOCOLATE SAUCE',
            quantity: 1,
            unit_price: 300
        },
        {
            id: '3f258d01-4fd9-4165-a7ef-0143e135d423',
            category_id: '',
            currency_id: 'ARS',
            description: '',
            picture_url: 'https://izzycooking.com/wp-content/uploads/2021/05/Tres-Leches-Cake-683x1024.jpg',
            title: 'SPANISH SPONGE CAKE',
            quantity: 1,
            unit_price: 500
        }
    ],
    marketplace: 'NONE',
    marketplace_fee: 0,
    metadata: {},
    notification_url: null,
    operation_type: 'regular_payment',
    payer: {
        phone: { area_code: '1121', number: '1231212' },
        address: {
            zip_code: '5521',
            street_name: 'calle cerro arco',
            street_number: '1'
        },
        email: 'test_user_16943485@testuser.com',
        identification: { number: '', type: '' },
        name: 'Ezequiel sosa',
        surname: '',
        date_created: null,
        last_purchase: null
    },
    payment_methods: {
        default_card_id: null,
        default_payment_method_id: null,
        excluded_payment_methods: [[Object]],
        excluded_payment_types: [[Object]],
        installments: null,
        default_installments: null
    },
    processing_modes: null,
    product_id: null,
    redirect_urls: { failure: '', pending: '', success: '' },
    sandbox_init_point: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1239200986-5f3aff28-ba00-4178-a969-15d789279b98',
    site_id: 'MLA',
    shipments: {
        default_shipping_method: null,
        receiver_address: {
            zip_code: '',
            street_name: '',
            street_number: null,
            floor: '',
            apartment: '',
            city_name: null,
            state_name: null,
            country_name: null
        }
    },
    total_amount: null,
    last_updated: null
}



//

//lo que nesecito del admin




//request Admin

const dataAdmin = {
    "results": [
        {
            "metadata": {},
            "corporation_id": null,
            "operation_type": "regular_payment",
            "point_of_interaction": {
                "business_info": {
                    "unit": "online_payments",
                    "sub_unit": "checkout_pro"
                },
                "type": "UNSPECIFIED"
            },
            "fee_details": [
                {
                    "amount": 339.95,
                    "fee_payer": "payer",
                    "type": "financing_fee"
                },
                {
                    "amount": 53.3,
                    "fee_payer": "collector",
                    "type": "mercadopago_fee"
                }
            ],
            "notification_url": null,
            "date_approved": "2022-11-22T16:37:32.000-04:00",
            "money_release_schema": null,
            "payer": {
                "entity_type": null,
                "identification": {
                    "number": "23011111114",
                    "type": "CUIL"
                },
                "phone": {
                    "number": null,
                    "extension": null,
                    "area_code": null
                },
                "operator_id": null,
                "last_name": null,
                "id": "1239201892",
                "type": null,
                "first_name": null,
                "email": "test_user_58997563@testuser.com"
            },
            "transaction_details": {
                "total_paid_amount": 1639.95,
                "acquirer_reference": null,
                "installment_amount": 546.65,
                "financial_institution": null,
                "net_received_amount": 1246.7,
                "overpaid_amount": 0,
                "external_resource_url": null,
                "payable_deferral_period": null,
                "payment_method_reference_id": null
            },
            "statement_descriptor": "Mercadopago*fake",
            "call_for_authorize_id": null,
            "installments": 3,
            "pos_id": null,
            "external_reference": "2022-11-22T20:31:58.556Z",
            "date_of_expiration": null,
            "charges_details": [
                {
                    "refund_charges": [],
                    "last_updated": "2022-11-22T16:37:31.000-04:00",
                    "metadata": {},
                    "amounts": {
                        "original": 53.3,
                        "refunded": 0
                    },
                    "date_created": "2022-11-22T16:37:31.000-04:00",
                    "name": "mercadopago_fee",
                    "reserve_id": null,
                    "accounts": {
                        "from": "collector",
                        "to": "mp"
                    },
                    "id": "51785037066-001",
                    "type": "fee",
                    "client_id": 0
                }
            ],
            "id": 51785037066,
            "payment_type_id": "credit_card",
            "payment_method": {
                "id": "master",
                "type": "credit_card"
            },
            "order": {
                "id": "6586363723",
                "type": "mercadopago"
            },
            "counter_currency": null,
            "money_release_status": "pending",
            "brand_id": null,
            "status_detail": "accredited",
            "differential_pricing_id": null,
            "additional_info": {
                "authentication_code": null,
                "ip_address": "186.158.236.32",
                "nsu_processadora": null,
                "available_balance": null,
                "items": [
                    {
                        "quantity": "1",
                        "category_id": null,
                        "picture_url": null,
                        "description": null,
                        "id": "836e7c7c-8d0a-41d4-bc60-380ff179dff2",
                        "title": "TRES LECHES CAKE",
                        "unit_price": "500.0"
                    },
                    {
                        "quantity": "1",
                        "category_id": null,
                        "picture_url": null,
                        "description": null,
                        "id": "0fcfd1c9-0ef5-4e86-ba3f-1e2488c0df15",
                        "title": "CHURROS WITH CHOCOLATE SAUCE",
                        "unit_price": "300.0"
                    },
                    {
                        "quantity": "1",
                        "category_id": null,
                        "picture_url": null,
                        "description": null,
                        "id": "3f258d01-4fd9-4165-a7ef-0143e135d423",
                        "title": "SPANISH SPONGE CAKE",
                        "unit_price": "500.0"
                    }
                ],
                "payer": {
                    "phone": {
                        "number": "1231212",
                        "area_code": "1121"
                    },
                    "first_name": "Ezequiel sosa"
                }
            },
            "live_mode": true,
            "marketplace_owner": null,
            "card": {
                "first_six_digits": "503175",
                "expiration_year": 2025,
                "bin": "50317557",
                "date_created": "2022-11-22T16:37:31.000-04:00",
                "expiration_month": 11,
                "id": null,
                "cardholder": {
                    "identification": {
                        "number": "11111111",
                        "type": "DNI"
                    },
                    "name": "APRO"
                },
                "last_four_digits": "0604",
                "date_last_updated": "2022-11-22T16:37:31.000-04:00"
            },
            "integrator_id": null,
            "status": "approved",
            "transaction_amount_refunded": 0,
            "transaction_amount": 1300,
            "description": "TRES LECHES CAKE",
            "financing_group": null,
            "money_release_date": "2022-12-10T16:37:32.000-04:00",
            "merchant_number": null,
            "refunds": [],
            "authorization_code": "301299",
            "captured": true,
            "collector_id": 1239200986,
            "merchant_account_id": null,
            "taxes_amount": 0,
            "date_last_updated": "2022-11-22T16:38:43.000-04:00",
            "coupon_amount": 0,
            "store_id": null,
            "build_version": "2.120.2",
            "date_created": "2022-11-22T16:37:31.000-04:00",
            "acquirer_reconciliation": [],
            "sponsor_id": null,
            "shipping_amount": 0,
            "issuer_id": "3",
            "payment_method_id": "master",
            "binary_mode": false,
            "platform_id": null,
            "deduction_schema": null,
            "processing_mode": "aggregator",
            "currency_id": "ARS",
            "shipping_cost": 0
        }
    ],
    "paging": {
        "total": 1,
        "limit": 30,
        "offset": 0
    }
}
///


//USER VENDEDORRR


[
    {
        "id": 1239200986,
        "nickname": "TESTKI1SXBPD",
        "password": "9LoFIlDX1b",
        "site_status": "active",
        "email": "test_user_3774024@testuser.com"
    }
]


//USER

[
    {
        "id": 1239201892,
        "nickname": "TESTHXWUFXVF",
        "password": "EQfAEkxx3N",
        "site_status": "active",
        "email": "test_user_58997563@testuser.com"
    },
    {
        "id": 1239360712,
        "nickname": "TEST3GJHXBD6",
        "password": "YivEqogQjE",
        "site_status": "active",
        "email": "test_user_77564041@testuser.com"
    },
    {
        "id": 1239365772,
        "nickname": "TESTJ0EUVLXA",
        "password": "p7ASJhsCBT",
        "site_status": "active",
        "email": "test_user_54304966@testuser.com"
    },
    {
        "id": 1239362622,
        "nickname": "TESTGKBH6ZNO",
        "password": "AGPKQ9XyhF",
        "site_status": "active",
        "email": "test_user_56642096@testuser.com"
    },
    {
        "id": 1239364311,
        "nickname": "TEST2ENJQCEW",
        "password": "cIV1bKfGtT",
        "site_status": "active",
        "email": "test_user_83935865@testuser.com"
    },
    {
        "id": 1239365805,
        "nickname": "TESTBTPSLPQD",
        "password": "QSRZzpNpcM",
        "site_status": "active",
        "email": "test_user_27819546@testuser.com"
    },
    {
        "id": 1239365825,
        "nickname": "TETE6457963",
        "password": "si0ffYCtTx",
        "site_status": "active",
        "email": "test_user_64433230@testuser.com"
    },
    {
        "id": 1239363488,
        "nickname": "TESTSSJUHTC0",
        "password": "OSgyvkCs97",
        "site_status": "active",
        "email": "test_user_69564235@testuser.com"
    },
    {
        "id": 1239364366,
        "nickname": "TESTL7WZVYGV",
        "password": "jhqZ5xYDW9",
        "site_status": "active",
        "email": "test_user_16943485@testuser.com"
    },
    {
        "id": 1239363534,
        "nickname": "TESTLGBOHI9A--este",
        "password": "FxbLIBPYV5",
        "site_status": "active",
        "email": "test_user_21680130@testuser.com"
    }
]



// // Número	Código de seguridad	Fecha de caducidad
// // Mastercard	5031 7557 3453 0604	123	11/25
// // Visa	4509 9535 6623 3704	123	11/25
// // American Express	3711 803032 57522	1234	11/25
// // Para probar diferentes resultados de pago, completa el estado deseado en el nombre del titular de la tarjeta:

// // Estado de pago	Descripción	Documento de identidad
// // APRO	Pago aprobado	DNI del usuario de prueba
// // OTHE	Rechazado por error general	DNI del usuario de prueba
// // CONT	Pendiente de pago	-
// // CALL	Rechazado con validación para autorizar	-
// // FUND	Rechazado por importe insuficiente	-
// // SECU	Rechazado por código de seguridad inválido	-
// // EXPI	Rechazado debido a un problema de fecha de vencimiento	-
// // FORM	Rechazado debido a un error de formulari



// ///




// curl -X GET \
// 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=test_user_16943485@testuser.com' \
// -H 'Authorization: Bearer APP_USR-1385912062963638-111422-e1e1168b94be269d55d7cbca8fcaf186-1239200986' 

// data del user

// binary_mode: false,
// client_id: '1385912062963638',
// collector_id: 1239200986,
// coupon_code: null,
// coupon_labels: null,
// date_created: '2022-11-22T12:21:14.854-04:00',
// date_of_expiration: null,
// expiration_date_from: null,
// expiration_date_to: null,
// expires: false,
// external_reference: '',
// id: '1239200986-ae165444-6db1-4c49-89fd-d74a911af8fb',
// init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1239200986-ae165444-6db1-4c49-89fd-d74a911af8fb',
// internal_metadata: null,
// ///



//user 1
// idProductPrev =1239200986-0074f545-fb5f-4653-93bd-7d79390d3401
// http://localhost:3000/?collection_id=51775810577&collection_status=approved&payment_id=51775810577&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=6583164276&preference_id=1239200986-0074f545-fb5f-4653-93bd-7d79390d3401&site_id=MLA&processing_mode=aggregator&merchant_account_id=null
// //

// curl -X GET \
//       'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=null' \
//       -H 'Authorization: Bearer APP_USR-1385912062963638-111422-e1e1168b94be269d55d7cbca8fcaf186-1239200986'

// Authorization: Bearer 

// http://localhost:3000/?collection_id=51773246217&collection_status=approved&payment_id=51773246217&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=6582308516&preference_id=1239200986-7a255c21-2690-4f16-bd56-14c111ba7a05&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

// id collectora = 1239200986
// 51774209760

// {
//     additional_info: '',
//     auto_return: '',
//     back_urls: {
//       failure: 'http://localhost:3000/',
//       pending: 'http://localhost:3000/',
//       success: 'http://localhost:3000/'
//     },
//     binary_mode: false,
//     client_id: '1385912062963638',
//     collector_id: 1239200986,
//     coupon_code: null,
//     coupon_labels: null,
//     date_created: '2022-11-22T11:12:53.144-04:00',
//     date_of_expiration: null,
//     expiration_date_from: null,
//     expiration_date_to: null,
//     expires: false,
//     external_reference: '',
//     id: '1239200986-569dc8af-040f-4d5b-9d01-85149b8e40a4',
//     init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1239200986-569dc8af-040f-4d5b-9d01-85149b8e40a4',
//     internal_metadata: null,
//     items: [
//       {
//         id: '836e7c7c-8d0a-41d4-bc60-380ff179dff2',
//         category_id: '',
//         currency_id: 'ARS',
//         description: '',
//         title: 'TRES LECHES CAKE',
//         quantity: 1,
//         unit_price: 500
//       },
//       {
//         id: '0fcfd1c9-0ef5-4e86-ba3f-1e2488c0df15',
//         category_id: '',
//         currency_id: 'ARS',
//         description: '',
//         title: 'CHURROS WITH CHOCOLATE SAUCE',
//         quantity: 1,
//         unit_price: 300
//       },
//       {
//         id: '3f258d01-4fd9-4165-a7ef-0143e135d423',
//         category_id: '',
//         currency_id: 'ARS',
//         description: '',
//         title: 'SPANISH SPONGE CAKE',
//         quantity: 1,
//         unit_price: 500
//       }
//     ],
//     marketplace: 'NONE',
//     marketplace_fee: 0,
//     metadata: {},
//     notification_url: null,
//     operation_type: 'regular_payment',
//     payer: {
//       phone: { area_code: '1121', number: '1231212' },
//       address: { zip_code: '', street_name: '', street_number: null },
//       email: 'ezequiel.ignacio.sosa@gmail.com',
//       identification: { number: '', type: '' },
//       name: 'Ezequiel sosa',
//       surname: '',
//       date_created: null,
//       last_purchase: null
//     },
//     payment_methods: {
//       default_card_id: null,
//       default_payment_method_id: null,
//       excluded_payment_methods: [ [Object] ],
//       excluded_payment_types: [ [Object] ],
//       installments: null,
//       default_installments: null
//     },
//     processing_modes: null,
//     product_id: null,
//     redirect_urls: { failure: '', pending: '', success: '' },
//     sandbox_init_point: 'https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1239200986-569dc8af-040f-4d5b-9d01-85149b8e40a4',
//     site_id: 'MLA',
//     shipments: {
//       default_shipping_method: null,
//       receiver_address: {
//         zip_code: '',
//         street_name: '',
//         street_number: null,
//         floor: '',
//         apartment: '',
//         city_name: null,
//         state_name: null,
//         country_name: null
//       }
//     },
//     total_amount: null,
//     last_updated: null
//   }


//   curl -X GET \
//   'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=ID_REF' \
//   -H 'Authorization: Bearer APP_USR-1385912062963638-111422-e1e1168b94be269d55d7cbca8fcaf186-1239200986' 

// //reject /?collection_id=51775452181&collection_status=rejected&payment_id=51775452181&status=rejected&external_reference=null&payment_type=credit_card&merchant_order_id=6583017027&preference_id=1239200986-ea362c68-9a83-480e-bd13-caf8c62cf598&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

//   http://localhost:3000/?collection_id=51774209760&collection_status=approved&payment_id=51774209760&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=6582596224&preference_id=1239200986-569dc8af-040f-4d5b-9d01-85149b8e40a4&site_id=MLA&processing_mode=aggregator&merchant_account_id=null