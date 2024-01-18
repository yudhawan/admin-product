import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import style from './AddProduct.module.scss'
import { ModalConsumer } from '../../common/ModalContext';
import { useAppDispatch } from '../../redux/appHooks';
import { addProduct, editProduct } from '../../redux/productSlice';
import { ProductType, variasiType } from '../../types';

function AddProduct({toEdit,modalId}:{toEdit?:ProductType|null,modalId:string}) {
    const dispatch = useAppDispatch()
    const [id,setId] = useState<number>()
    const [nama,setNama] = useState<string>('')
    const [sku,setSku] = useState<string>('')
    const [brand,setBrand] = useState<string>('Brand 1')
    const [des,setDes] = useState<string>('')
    const [variasi,setVariasi] = useState<variasiType[]>([{key:'',value:''}])
    const [validation,setValidation]=useState<string[]>([])
    function handleChange(index:number,filed:'key'|'value',value:string) {
        const dataUpdated = cloneDeep(variasi)
        dataUpdated[index][filed]=value
        setVariasi(dataUpdated)
    }
    function handleSubmit(openFn:(val: boolean) => void) {
        if(!nama) {
            if(validation.includes('nama')) return;
            setValidation(prev=>([...prev, 'nama']))
            return;
        }
        if(!sku) {
            if(validation.includes('sku')) return;
            setValidation(prev=>([...prev, 'sku']))
            return;
        }
        if(!brand) {
            if(validation.includes('brand')) return;
            setValidation(prev=>([...prev, 'brand']))
            return;
        }
        // const newVariasi = variasi.filter(item => item.key !== '' && item.value !== '')
        if(modalId==='editProduct') dispatch(editProduct({id,nama,sku,brand,des,variasi}))
        else dispatch(addProduct({nama,sku,brand,des,variasi}))
        openFn(false)
    }
    function handleRemoveVariasi(id:number) {
        const newData = variasi.filter((__arg,index)=>index!==id)
        setVariasi(newData)
    }
    useEffect(()=>{
        if (toEdit && modalId==='editProduct') {
            setId(toEdit.id)
            setNama(toEdit.nama)
            setSku(toEdit.sku)
            setBrand(toEdit.brand)
            setDes(toEdit.des)
            setVariasi(toEdit.variasi)
        }
        if(modalId==='addProduct'){
            setId(0)
            setNama('')
            setSku('')
            setBrand('')
            setVariasi([{key:'',value:''}])
        }
    },[toEdit,modalId])
  return (
    <div className={style.mainAddProduct}>
        <div className={style.headProduct}>
            <h2>Add/Edit Product</h2>
            <ModalConsumer>
                {
                    (modalContext)=>{
                        const {handleOpen} = modalContext || {}
                        return <button className={style.closeButton} onClick={()=>handleOpen&&handleOpen(false)}>&#10006;</button>
                    }
                }
            </ModalConsumer>
            
        </div>
        <div className={style.labelContainer}>
            <input className={style.input} placeholder='Nama' value={nama} onChange={e=> setNama(e.target.value)} />
        </div>
        <div className={style.labelContainer}>
            <input className={style.input} placeholder='SKU' value={sku} onChange={e=> setSku(e.target.value)} />
        </div>
        <div className={style.labelContainer}>
            <label>Brand</label>
            <select className={style.select} onChange={(e)=>setBrand(e.target.value)} value={brand}>
                <option>Brand 1</option>
                <option>Brand 2</option>
                <option>Brand 3</option>
                <option>Brand 4</option>
                <option>Brand 5</option>
            </select>
        </div>
        <div className={style.labelContainer}>
            <label>Deskripsi</label>
            <CKEditor
                editor={ ClassicEditor }
                data={des}
                onChange={ ( __arg,editor ) => {
                    setDes(editor.data.get())
                } }
                config={{
                    toolbar: {
                        shouldNotGroupWhenFull: true,
                    },
                }}
            />
        </div>
        <div className={style.labelContainer}>
            <label>Variasi</label>
            {variasi.length&&variasi.map((val,index)=>{
                return(<div className={style.variasiContainer} key={index}>
                <input className={style.inputVariasi} placeholder='Key' value={val.key} onChange={e=> handleChange(index,'key',e.target.value)} />
                <input className={style.inputVariasi} placeholder='Value' value={val.value} onChange={e=> handleChange(index,'value',e.target.value)} />
                {variasi.length!=(index+1)&&<button className={style.buttonMinus} onClick={()=>handleRemoveVariasi(index)}>-</button>}
                {variasi.length==(index+1)&&<button className={style.buttonPlus} onClick={()=>setVariasi(prev=>([...prev,{key:'',value:''}]))}>+</button>}
            </div>)})}
        </div>
        <ModalConsumer>
            {
                (modalContext)=>{
                    const {handleOpen} = modalContext ||{}
                    return <button onClick={()=>handleSubmit(handleOpen?handleOpen:()=>{})}>Save</button>
                }
            }
        </ModalConsumer>
        
    </div>
  )
}

export default AddProduct