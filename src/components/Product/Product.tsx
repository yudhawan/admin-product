import cx from 'classnames'
import { ProductType } from '../../types'
import { htmlToPlainText } from '../../common/textConverter'
import { useAppDispatch } from '../../redux/appHooks'
import { deleteProduct, setToEdit } from '../../redux/productSlice'
import { ModalConsumer } from '../../common/ModalContext'
import style from './Product.module.scss'
function Product({brand,des,nama,sku,variasi,id,checked,handleSelect}:ProductType&{checked:number[],handleSelect:(val:number)=>void}) {
  const dispatch = useAppDispatch()
  return (
    <div className={cx(style.mainProduct,{[style.selected]:checked.includes(id)})} onClick={()=>handleSelect(id)}>
      {!checked.includes(id)&&<button className={style.deleteButton} onClick={(e)=>{
        e.stopPropagation()
        dispatch(deleteProduct([id]))}}>Delete</button>}
      <ModalConsumer>
        {
          (modalContext)=>{
            const {handleId,handleOpen} = modalContext ||{}
            return <a onClick={()=>{
              handleId&&handleId('editProduct')
              handleOpen&&handleOpen(true)
              dispatch(setToEdit({brand,des,nama,sku,variasi,id}))
            }}>{nama}</a>
          }
        }
      
      </ModalConsumer>
      <h4>{sku}</h4>
      <h4>{brand}</h4>
      <p>{htmlToPlainText(des)}</p>
      <div></div>
  </div>
       
  )
}

export default Product