import style from './ModalWindow.module.scss'
import { ModalWindowProps } from '../../types'
import React from 'react'
import { useAppDispatch } from '../../redux/appHooks'
import { setToEdit } from '../../redux/productSlice'
function ModalWindow({children,isOpen,modalId,handleId,handleOpen}:ModalWindowProps) {
  function handleBlur(e:React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement
    if(target.id===modalId && handleOpen) handleOpen(false)
  }
  return isOpen&&<div className={style.mainModalWindow} id={modalId} onClick={handleBlur}>
    {children}
  </div>
}

export default ModalWindow