import React from 'react'
import style from "./Header.module.css"
import img from "../assets/baloon.jpg"

const Header = () => {
  return (
    <div className={style.header}>
        <img className={style.header__logo} src={img} alt="LOGO" />
        <h1 className={style.header__title}>Travelogger</h1>
    </div>
  )
}

export default Header