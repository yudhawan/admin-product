import { PayloadAction, createSlice} from '@reduxjs/toolkit'
import { ProductType, StatusType } from '../types'
import {dataDummy} from './data'
type stateProductType = {products:ProductType[],toEdit?:ProductType|null} & StatusType
const initialState: stateProductType = {
    products:dataDummy,
    toEdit:null,
    loading:false,
    error:'',
    success:false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct:(state,action)=>{
      const sortedProductDesc = state.products.length?[...state.products]?.sort((a,b)=> b.id-a.id)[0]['id']: 0
      const latestId = sortedProductDesc
      const newProduct = action.payload
      newProduct.id=latestId+1
      state.products=[...state.products,newProduct]
    },
    setToEdit:(state,action)=>{
      state.toEdit=action.payload
    },
    editProduct:(state,action)=>{
      const currentProduct = [...state.products]
      const oldProduct = currentProduct.filter(val=>val.id!==action.payload?.id)
      state.products=[...oldProduct,action.payload]
    },
    deleteProduct:(state,action:PayloadAction<number[]>)=>{
      const listProduct = action.payload //[id:number]
      const dataProducts = state.products
      const updatedProducts = dataProducts.filter(val=> !listProduct.includes(val.id))
      state.products=updatedProducts
    },
  },
  
})
export const {addProduct,setToEdit,editProduct,deleteProduct}= productSlice.actions
export default productSlice.reducer