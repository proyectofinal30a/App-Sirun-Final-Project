import { IUserBuyer, IDataAddress } from '../../lib/types'
const validate = (input: IDataAddress) => {

    const errors: IDataAddress = {
        name_address: '',
        street_name: '',
        street_number: '',
        zip_code: '',
        number: '',
        area_code: ''
    };

    const myvalidate = {
        name_address:
            !input.name_address ||
            input.name_address.length < 3 ||
            !/^[a-zA-Z\s]+$/.test(input.name_address),
        errorPhoneAreaCode:
            !input.area_code ||
            !/^[0-9]+$/.test(input.area_code) ||
            input.area_code.length < 2 ||
            input.area_code.length > 4 ||
            !(/^\d+$/.test(input.area_code)) ||
            typeof Number(input.area_code) !== 'number',

        errorPhoneNumber:
            !input.number ||
            !/^[0-9]+$/.test(input.number) ||
            input.number.length < 7 ||
            input.number.length > 10 ||
            !(/^\d+$/.test(input.number)) ||
            typeof Number(input.number) !== 'number',

        errorAddresStreetName:
            !input.street_name ||
            input.street_name.length < 3 ||
            !/^[a-zA-Z0-9\s]+$/.test(input.street_name),

        errorAdrresStreeNumber:
            !input.street_number ||
            !/^[0-9]+$/.test(input.street_number) ||
            input.street_number.length > 4 ||
            !(/^\d+$/.test(input.street_number)) ||
            typeof Number(input.street_number) !== 'number',

        errorAdrresZipCode:
            !input.zip_code ||
            !/^[0-9]+$/.test(input.zip_code) ||
            input.zip_code.length < 4 ||
            !(/^\d+$/.test(input.zip_code)) ||
            typeof Number(input.zip_code) !== 'number'

    }

    switch (true) {
        case myvalidate.name_address:
            errors.name_address = 'Name is required and cannot include number and special characters.';
            break;
            
        case myvalidate.errorPhoneAreaCode:
            errors.area_code = 'Area Code is required and must only contain numbers.';
            break;

        case myvalidate.errorPhoneNumber:
            errors.number = 'Phone is required and must only contain numbers.';
            break;

        case myvalidate.errorAddresStreetName:
            errors.street_name = 'Street Name is required and must be alphanumeric.';
            break;

        case myvalidate.errorAdrresStreeNumber:
            errors.street_number = 'Street Number is required and must only contain numbers.';
            break;

        case myvalidate.errorAdrresZipCode:
            errors.zip_code = 'Zip Code is required and must only contain numbers.';
            break;

    }
    return errors;
}

export default validate;


