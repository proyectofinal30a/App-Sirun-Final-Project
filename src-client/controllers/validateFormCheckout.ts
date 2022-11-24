import { IUserBuyer } from '../../lib/types'
const validate = (input: IUserBuyer) => {
    let errors: IUserBuyer = {
        email: '',
        name: '',
        address: {
            street_name: '',
            street_number: '',
            zip_code: ''
        },
        phone: {
            number: '',
            area_code: ''
        }
    };

    const myvalidate = {
        errorName:
            !input.name ||
            input.name.length < 3 ||
            !/^[a-zA-Z\s]+$/.test(input.name),

        errorEmail: !input.email ||
            !/\S+@\S+\.\S+/.test(input.email),

        errorPhoneAreaCode:
            !input.phone.area_code ||
            !/^[0-9]+$/.test(input.phone.area_code) ||
            input.phone.area_code.length < 2 ||
            input.phone.area_code.length > 4 ||
            !(/^\d+$/.test(input.phone.area_code)) ||
            typeof Number(input.phone.area_code) !== 'number',

        errorPhoneNumber:
            !input.phone.number ||
            !/^[0-9]+$/.test(input.phone.number) ||
            input.phone.number.length < 7 ||
            input.phone.number.length > 10 ||
            !(/^\d+$/.test(input.phone.number)) ||
            typeof Number(input.phone.number) !== 'number',

        errorAddresStreetName:
            !input.address.street_name ||
            input.address.street_name.length < 3 ||
            !/^[a-zA-Z0-9\s]+$/.test(input.address.street_name),

        errorAdrresStreeNumber:
            !input.address.street_number ||
            !/^[0-9]+$/.test(input.address.street_number) ||
            input.address.street_number.length > 4 ||
            !(/^\d+$/.test(input.address.street_number)) ||
            typeof Number(input.address.street_number) !== 'number',

        errorAdrresZipCode:
            !input.address.zip_code ||
            !/^[0-9]+$/.test(input.address.zip_code) ||
            input.address.zip_code.length < 4 ||
            !(/^\d+$/.test(input.address.zip_code)) ||
            typeof Number(input.address.zip_code) !== 'number'

    }


    switch (true) {
        case myvalidate.errorName:
            errors.name = 'Name is required and cannot include number and special characters.';
            break;
        case myvalidate.errorEmail:
            errors.email = 'Email is required and must be valid.';
            break;
        case myvalidate.errorPhoneAreaCode:
            errors.phone.area_code = 'Area Code is required and must only contain numbers.';
            break;

        case myvalidate.errorPhoneNumber:
            errors.phone.number = 'Phone is required and must only contain numbers.';
            break;

        case myvalidate.errorAddresStreetName:
            errors.address.street_name = 'Street Name is required and must be alphanumeric.';
            break;
        case myvalidate.errorAdrresStreeNumber:
            errors.address.street_number = 'Street Number is required and must only contain numbers.';
            break;
        case myvalidate.errorAdrresZipCode:
            errors.address.zip_code = 'Zip Code is required and must only contain numbers.';
            break;
    }
    return errors;
}

export default validate;


