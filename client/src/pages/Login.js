import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/userSlice';
import firebase from "../firebase"
import styles from "./Login.module.css"
import Header from '../components/Header';
import Background from '../components/Background';

const Login = () => {
    const { user } = useSelector(selectUser)
    const navigate = useNavigate();
    useEffect(() => {
      if (user) {
        navigate("/view/all")
      }
    }, [user])
    return (
      <>
        <Header/>
        <Background/>
        <div className={styles.container}>
          <Link className={styles.link} to="/view/all">Browse trips without logging in</Link>
          <StyledFirebaseAuth uiConfig={firebase.uiConfig} firebaseAuth={firebase.client.auth()} />
        </div>
      </>
    );
}

export default Login;
