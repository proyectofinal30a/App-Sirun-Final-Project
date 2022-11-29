const validString = /^[a-z ]+$/i;
const validNumber = /^[1-9]\d*(\.\d+)?$/i;


export default function validation(formProduct: any) {
  let errors = {
    price: "",
    description: "",
  };

  // Price validation
  if (!validNumber.test(formProduct.price) || formProduct.price <= 0 || !(/^\d+$/.test(formProduct.price))) 
    errors.price = "Price is required and has to be higher than 0.";

  // Description validation
  if (formProduct.description <= 10)
    errors.description = "Description is required and has to be longer than 10 characters.";


  return errors;
}
