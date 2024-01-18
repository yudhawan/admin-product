import React from "react";

export type ModalWindowProps = {
    isOpen?:boolean
    modalId?:string
    handleOpen?:(val:boolean)=> void
    handleId?:((val: string) => void);
    children?:React.ReactNode
    blur?:boolean
}
export type StatusType={
    loading:boolean
    success:boolean
    error:string
}
export type UserType = {
    token:string
    username:string
    password:string
}
export type LoginType={
    username:string
    password:string
}
export type variasiType={
    key:string
    value:string
}
export type ProductType={
    id:number
    nama:string
    sku:string
    brand:string
    des:string
    variasi:variasiType[]
}