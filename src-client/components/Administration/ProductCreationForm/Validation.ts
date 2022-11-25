const validString = /^[a-z ]+$/i;
const validNumber = /^[1-9]\d*(\.\d+)?$/i;


export default function validation(formProduct: any) {
  let errors = {
    name: "",
    price: "",
    dimension: "",
    description: "",
  };

  // console.log((formProduct))
  // Name validation
  if (!validString.test(formProduct.name) || formProduct.name.length < 3)
    errors.name = "Name is required. Must be longer than two characters and cannot contain numbers or special characters.";

  // Price validation
  if (!validNumber.test(formProduct.price) || formProduct.price <= 0 || isNaN(formProduct.price))
    errors.price = "Price is required and has to be higher than 0.";

  // Dimention validation
  if (!validNumber.test(formProduct.dimension) || formProduct.dimension <= 0 || !(/^\d+$/.test(formProduct.dimension)) || isNaN(formProduct.dimension))
    errors.dimension = "Dimention is required and has to be higher than 0.";

  // Description validation
  if (formProduct.description <= 10)
    errors.description = "Description is required and has to be longer than 10 characters.";


  return errors;
}



