// si esta en la modalidad decrease no permitir numeros negativos  ni 100%
// asi no llega a 0


function masiveValidate (modalForm) {
    let errors = {
        quantity: "",
        direction : "",
        type : "",
    }

    switch(true){
        case !modalForm.quantity || !(/^\d+$/.test(modalForm.quantity)) || typeof Number(modalForm.quantity) !== 'number'  || Number(modalForm.quantity) < 0: 
        errors.quantity ="Quantity is required and must be a positive number";
        break;
        case !modalForm.direction:
        errors.direction = "This field is required.";
        break;
        case !modalForm.type:
        errors.type = "This field is required.";
        break;
        case modalForm.type === "percent" && modalForm.direction === "decrease" && Number(modalForm.quantity) >= 100:
        errors.quantity = "You can't decrease the quantity in percentage in 100% or more";
        break;
        default:
        break;
    }

    return errors;
}

export default masiveValidate;