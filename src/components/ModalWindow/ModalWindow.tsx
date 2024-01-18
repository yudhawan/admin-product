import style from './ModalWindow.module.scss'
import { ModalWindowProps } from '../../types'
import React from 'react'
function ModalWindow({children,isOpen,modalId,handleOpen}:ModalWindowProps) {
  function handleBlur(e:React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement
    if(target.id===modalId && handleOpen) handleOpen(false)
  }
  return isOpen&&<div className={style.mainModalWindow} id={modalId} onClick={handleBlur}>
    {children}
  </div>
}

export default ModalWindow