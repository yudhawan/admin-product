import { useState } from 'react'
import cx from 'classnames'
import style from './DasboardPage.module.scss'
import { ModalConsumer } from '../../common/ModalContext'
import { useAppDispatch, useAppSelector } from '../../redux/appHooks'
import Product from '../../components/Product/Product'
import { logout } from '../../redux/userSlice'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import AddProduct from '../../components/AddProduct/AddProduct'
import { deleteProduct } from '../../redux/productSlice'
function DasboardPage() {
  const dispatch=useAppDispatch()
  const {products,toEdit}=useAppSelector(state=> state.products)
  const [search, setSearch]=useState<string>('')
  const [check, setCheck]=useState<number[]>([])
  function handleSelect(id:number) {
    const checkId = check.includes(id)
    if(checkId){
      const newCheck = check.filter(val => val!==id)
      setCheck(newCheck)
    }else{
      setCheck(prev=>([...prev,id]))
    }
  }
  function handleLogout() {
    dispatch(logout())
  }
  return (
    <div className={style.main}>
      <div className={style.headerInfo}>
        <h1>Products</h1>
        <button className={style.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
      <div className={style.accessContainer}>
        <input placeholder='Search' value={search} onChange={e=>setSearch(e.target.value)} className={style.input}  />
        <ModalConsumer>
        {(modalContext) => {
            const { handleOpen,handleId } = modalContext || {};

            return (
              <button className={style.buttonAdd} onClick={() => {
                handleOpen && handleOpen(true)
                handleId && handleId('addProduct')
              }}>Add Product</button>
            );
          }}
        </ModalConsumer>
        <button disabled={!check.length} onClick={()=> {
            dispatch(deleteProduct(check))
            setCheck([])
          }} className={cx(style.deleteButtonDisable,{[style.deleteButton]:check.length})}>Delete Selected</button>
      </div>
      <div className={style.listProductsContainer}>
        {
          [...products].sort((a, b) => b.id - a.id).filter(val=>val.nama.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((val,index)=><Product id={val.id} brand={val.brand} des={val.des} nama={val.nama} sku={val.sku} variasi={val.variasi} key={index} checked={check} handleSelect={handleSelect} />)
        }
      </div>
      <ModalConsumer>
        {
          (modalContext)=> {
            const {handleOpen,handleId,modalId,isOpen} = modalContext || {}
            return(<ModalWindow modalId={modalId} isOpen={isOpen} handleId={handleId} handleOpen={handleOpen}>
              {
                (modalId==='addProduct' || modalId==='editProduct')&&<AddProduct toEdit={toEdit?toEdit:null} modalId={modalId} />
              }
            </ModalWindow>)
          }
        }
      </ModalConsumer>
    </div>
  )
}

export default DasboardPage