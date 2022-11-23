import React, { useEffect } from "react";
import styles from "../../styles/AdminManageProducts.module.css";
import {AiFillEyeInvisible, AiFillEye, AiFillEdit} from 'react-icons/ai'
import {useSelector, useDispatch} from 'react-redux'
import { Iproduct, Ireducers } from "../../../lib/types";
import {getProducts} from "../../redux/slice/product-Admin-redux/GetProAdm-Redux"
import SearchBar from "../SearchBar/SearchBar";
// 1) DEBERIA TENER UNA SERACHBAR
//2) DEBERIA renderizar filtros
//3) Deberia verse carts con iconos para editar ----> link form para editar
//4) Deberian las carts tener un icono de si estan disponibles o no ------> alert avisando
//5) Deberia tener una boton + input para aumento masivo de precios

const AdminManageProducts = () => {

  
  const allProducts = useSelector((state:Ireducers)=> state.reducerAdmin.products)
  const dispatch : Function = useDispatch()


useEffect(()=>{
  dispatch(getProducts())
})

  return (
    <div className={styles.products_form__container}>
        <h1 className={styles.products_form__title}>Administration Product Managing</h1>
{/* /// ZONA SEARCHBAR */}
<SearchBar/>
{/* // ZONA FILTROS */}

{/* //ZONA AUMENTO MASIVO */}
{/* // boton + checkobox + input +/-  */}

{/* // ZONA RENDER DE CARTS */}







{/* // get all products sin el filtro de la function is available,
        para eso hacer un reducer get y una ruta get ? en back o se puede reutilizar
//      comprobar si se puede reutilizar los types de getallproducts
/       use selector  + map con solo foto, nombre y precio en la card y 
//      en el form selector de todos los datos y update de 
  name?? price       available    type(select)     category    description   image      
 // no cambiar el nombre del producto
 // para la parte de description (simular docs y no textarea )
 //https://www.sanity.io/guides/top-5-rich-text-react-components 
 // para la edicion de AVAILABLE ---> validar la edicion con un boton de confirmacion final
 // agregar un alert validation
 // 
 */}




    </div>
  );
};

export default AdminManageProducts;