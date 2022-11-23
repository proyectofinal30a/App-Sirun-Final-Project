
const validate = (input: any) => {
    let errors: any = {};

    switch (true) {
        case !input.name || input.name.length < 3 || !/^[a-zA-Z\s]+$/.test(input.name):
            errors.name = 'Name is required and cannot include number and special characters.';
            break;
        case !input.email || !/\S+@\S+\.\S+/.test(input.email):
            errors.email = 'Email is required and must be valid.';
            break;
        case !input.message:
            errors.message = 'Message is requered'
    }
    return errors;
}

export default validate;

