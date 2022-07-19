import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import firebase from "../firebase"
import styles from "./Login.module.css"

const Login = () => {
    const { user } = useSelector(selectUser)
    const navigate = useNavigate();
    useEffect(() => {
      if (user) {
        navigate("/view/all")
      }
    }, [user])
    return (
      <div className={styles.container}>
        <StyledFirebaseAuth uiConfig={firebase.uiConfig} firebaseAuth={firebase.client.auth()} />
      </div>
    );
}

export default Login;
