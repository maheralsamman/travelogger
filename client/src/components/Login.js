import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import firebase from "../firebase"

const Login = () => {
    const { user } = useSelector(selectUser)
    // useEffect(() => {
    //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
    //     setUser(user);
    //   });
    //   return () => unregisterAuthObserver();
    // }, []);

    if (!user) {
        return (
          <div>
            <h1>My App</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth uiConfig={firebase.uiConfig} firebaseAuth={firebase.client.auth()} />
          </div>
        );
      }
      return (
        <div>
          <h1>My App</h1>
          <p>Welcome {user.displayName}! You are now signed-in!</p>
          <a onClick={() => firebase.client.auth().signOut()}>Sign-out</a>
        </div>
      );
}

export default Login;
