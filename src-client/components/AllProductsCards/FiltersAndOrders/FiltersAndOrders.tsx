
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  orderByAscDesc,
  prepState,
  actionFilterByCategoryOrType,
  cleanFilters,
  IactionPayload,
} from "../../../redux/slice/filter-product-client/filters-redux";
import { Iproduct, Ireducers } from "../../../../lib/types";
import styles from "../../../styles/FiltersAndOrders.module.css";


const FilterAndOrder = () => {
  const dispatch: Function = useDispatch()
  const products: any = useSelector<Ireducers>((state) => state.reducerProducts.products)
  const productsFilters: any = useSelector<Ireducers>((state) => state.reducerFilters.productsToFilter)
  const prevStateContainer: any = useSelector<Ireducers>((state) => state.reducerFilters.productPrevState)
  const productsByName: any = useSelector<Ireducers>((state) => state.reducerProductsByName)


  let currentProducts: any = [];
  if (productsByName.productsByName.length > 0) {
    currentProducts = productsByName.productsByName;
  } else if (productsFilters.length > 0) {
    currentProducts = productsFilters;
  } else {
    currentProducts = products;
  }

  const stateSelects = {
    selectPrice: "",
    selectDimention: "",
    selectCategory: "",
    selectType: "",
  };
  const [select, setSelect] = useState(stateSelects);

  const previousState = {
    price: "",
    dimention: "",
    category: "",
    type: "",
  };
  const [prev, setPrevState] = useState(previousState);


  const handlerChangePrice = (e: Event) => {
    e.preventDefault();
    const { value }: any = e.target;
    const o: IactionPayload = {
      state: currentProducts,
      order: value,

    };
    setSelect({ ...select, selectPrice: value, selectDimention: "" });
    dispatch(orderByAscDesc(o));
  };


  const handlerChangeDimention = (e: Event) => {
    e.preventDefault();
    const { value }: any = e.target;
    const o: IactionPayload = {
      state: currentProducts,
      order: value,

    };
    setSelect({ ...select, selectDimention: value, selectPrice: "" });
    dispatch(orderByAscDesc(o));
  };

  const handleChangeCategory = (e: Event) => {
    e.preventDefault();
    const { value }: any = e.target;
    const o: IactionPayload = {
      state: currentProducts,
      order: value,
    };

    setSelect({ ...select, selectDimention: "", selectPrice: "" });

    if (prev.category && prev.type) {
      const o: IactionPayload = {
        state: products,
        order: value,
      };

      setSelect({ ...select, selectCategory: value });
      setPrevState({ ...prev, category: value });
      dispatch(cleanFilters);
      dispatch(prepState(o));
      dispatch(actionFilterByCategoryOrType(o));
      return;
    }

    if (prev.category) {
      dispatch(cleanFilters);
      setSelect({ ...select, selectCategory: value });
      setPrevState({ ...prev, category: value });
      dispatch(prepState(o));
      dispatch(actionFilterByCategoryOrType(o));
      return;
    }

    dispatch(prepState(o));
    setSelect({ ...select, selectCategory: value });
    setPrevState({ ...prev, category: value });
    dispatch(actionFilterByCategoryOrType(o));
  };

  const handleChangeType = (e: Event) => {
    e.preventDefault();

    setSelect({ ...select, selectDimention: "", selectPrice: "" });
    const { value }: any = e.target;
    const o: IactionPayload = {
      state: currentProducts,
      order: value,
    };

    if (prev.category !== "" && prev.type !== "") {
      const ob: IactionPayload = {
        state: prevStateContainer,
        order: value,
      };

      setSelect({ ...select, selectType: value });
      dispatch(actionFilterByCategoryOrType(ob));
      return;
    }

    setPrevState({ ...prev, type: value });
    dispatch(actionFilterByCategoryOrType(o));
    setSelect({ ...select, selectType: value });
  };

  const handleClean = (e: Event) => {
    e.preventDefault();
    dispatch(cleanFilters());
    setSelect(stateSelects);
  };


  const categories: any = products
    .map((product: Iproduct) => product.category)
    .filter((category: any, index: number, array: any) => array.indexOf(category) === index);

  const types: any = products
    .map((product: Iproduct) => product.type)
    .filter((type: any, index: number, array: any) => array.indexOf(type) === index);

  return (
    <div className={styles.filter__container}>
      <select
        name="selectCategory"
        value={select.selectCategory}
        className={styles.filter__select}
        onChange={(e: any) => handleChangeCategory(e)}
      >
        <option value="" disabled>Filter by Category</option>
        {/* <option value="all">Filter by Category</option> */}
        {categories && categories.map((category: any, index: number) => {
          return (
            <option key={index} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          );
        })}
      </select>

      <select
        name="selectType"
        value={select.selectType}
        className={styles.filter__select}
        onChange={(e: any) => handleChangeType(e)}
      >
        <option value="" disabled>Filter by Type</option>
        {/* <option value="all">Filter by Type</option> */}
        {types &&types.map((type: any, index: number) => {
          return (
            <option key={index} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          );
        })}
      </select>

      <select
        name="selectPrice"
        value={select.selectPrice}
        className={styles.filter__select}
        onChange={(e: any) => handlerChangePrice(e)}
      >
        <option value="" disabled>Sort by Price</option>
        {/* <option value="none">Sort by Price</option> */}
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <select
        name="selectDimention"
        value={select.selectDimention}
        className={styles.filter__select}
        onChange={(e: any) => handlerChangeDimention(e)}
      >
        <option value="" disabled>Sort by Dimention</option>
        {/* <option value="none">Sort by Dimention</option> */}
        <option value="-">Ascending</option>
        <option value="+">Descending</option>
      </select>

      <button
        className={styles.filter__btn}
        onClick={(e: any) => handleClean(e)}
      >
        Clear filters
      </button>
    </div>
  );
};

export default FilterAndOrder;

