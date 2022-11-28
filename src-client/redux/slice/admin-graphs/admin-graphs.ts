import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState: any = {
    salesGraph: {},
    productMS: {},
    MVProduct: {} 
}

export const adminGraphs = createSlice({
    name: "adminGraphs",
    initialState: initialState,
    reducers:{
        actionGetSales : (state: any, action: any) => {
            state.salesGraph = action.payload
        },
        cleanState: (state: any, action: any) => {
            state.salesGraph = action.payload;
            state.productMS = action.payload;
            state.MVProduct = action.payload;
        },
        actionMVP: (state: any, action: any) => {
            state.MVProduct = action.payload
        }, 
        actionSolds: (state: any, action: any) => {
            state.productMS = action.payload
        }

    }
})

// ACTIONS

export const getSales = () => async (dispatch: Function) => {
    const sales: any = await axios.get('/api/adminScope/graphDatas/salesGraph')

    return dispatch(adminGraphs.actions.actionGetSales(sales.data))
}

export const getMVP = (type: string) => async (dispatch: Function) => {
    const products: any = await axios.get(`/api/adminScope/graphDatas/MVPData?${type === 'all'? '': `type=${type}`}`)

    return dispatch(adminGraphs.actions.actionMVP(products.data))
}

export const getSolds = (type: string) => async (dispatch: Function) => {
    
    const products: any = await axios.get(`/api/adminScope/graphDatas/soldsData?${type === 'all'? '': `type=${type}`}`)
    return dispatch(adminGraphs.actions.actionSolds(products.data))
}



export const cleanState = () => (dispatch: Function) => {
    return dispatch(adminGraphs.actions.cleanState({}))
}


export default adminGraphs.reducer