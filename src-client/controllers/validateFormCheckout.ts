const validate = (input: any) => {
    let errors: any = {};

    switch (true) {
        case !input.name || input.name.length < 3 || !/^[a-zA-Z\s]+$/.test(input.name):
            errors.name = 'Name is required and cannot include number and special characters';
            break;
        case !input.email || !/\S+@\S+\.\S+/.test(input.email):
            errors.email = 'Email is required and must be valid';
            break;
        case !input.phone || !/^[0-9]+$/.test(input.phone) || input.phone.length > 8 : // no incluir decimales
            errors.phone = 'Phone is required and must be numeric';
            break;
        case !input.areaCode || !/^[0-9]+$/.test(input.areaCode) || input.areaCode.length < 2 || input.areaCode.length > 5: // no incluir decimales
            errors.areaCode = 'Area Code is required and must be numeric';
            break;
        case !input.zipCode || !/^[0-9]+$/.test(input.zipCode) || input.zipCode.length < 4: // no incluir decimales
            errors.zipCode = 'Zip Code is required and must be numeric';
            break;
        case !input.streetName || !/^[a-zA-Z\s]+$/.test(input.streetName): // incluir numeros // no incluir decimales
            errors.streetName = 'Street Name is required and must be alphanumeric';
            break;
        case !input.streetNumber || !/^[0-9]+$/.test(input.streetNumber) || input.streetNumber.length > 4: // no incluir decimales
            errors.streetNumber = 'Street Number is required and must be numeric';
            break;
    }
    return errors;
}

export default validate;
