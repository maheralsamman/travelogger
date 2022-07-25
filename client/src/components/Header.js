import React from 'react'
import style from "./Header.module.css"
import img from "../assets/baloon.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/userSlice'
import firebase from '../firebase'
import {IoIosArrowBack} from 'react-icons/io'
import {VscSignIn, VscSignOut} from 'react-icons/vsc'



const Header = ({back, login}) => {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <header className={style.header}>
        {/* <div className={style.header__backButton} onClick={() => navigate(-1)}>
          <IoIosArrowBack/>
        </div> */}
        <div className={style.header__logo}>
          <h1 className={style.header__title}>Travel</h1>
          <img className={style.header__logoImg} src={img} alt="LOGO"/>
          <h1 className={style.header__title}>gger</h1>
          
        </div>
        <div className={style.header__sign}>
          {user
              ? <div className={style.header__signIcon} onClick={() => firebase.client.auth().signOut()}><VscSignOut/></div>
              : <Link className={style.header__signIcon} to="/login"><VscSignIn/></Link>}
        </div>
    </header>
  )
}

export default Header