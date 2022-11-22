


//request de Vendedor para la Order

axios({
    method: 'get',
    url: 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=test_user',
    headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
    }
})



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


