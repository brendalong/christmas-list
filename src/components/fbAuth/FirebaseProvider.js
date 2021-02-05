import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "./firebaseConfig";
/*
    The context is imported and used by individual components
    that need data
*/
export const FirebaseContext = createContext()

/*
 This component establishes what data can be used.
 */
export const FirebaseProvider = (props) => {
  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const provider = new firebase.auth.GoogleAuthProvider();
  //https://firebase.google.com/docs/auth/web/start?authuser=0


  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  //setup other firebase logins


  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)

      .then((userProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile.user));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then(savedUserProfile => {
        console.log('savedU', savedUserProfile)
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile.user))
        setIsLoggedIn(true);
      });
  };
  

  const signInWithGoogle = () => {
    return firebase.auth().signInWithPopup(provider)
      .then(savedUserProfile => {
        console.log('savedU', savedUserProfile)
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile.user))
        checkUser(savedUserProfile.user.uid)
        setIsLoggedIn(true);
      })
  }

  const checkUser = (userId) => {
    console.log("checkUser", userId)

    fetch(`${firebaseConfig.databaseURL}/user.json/?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
    // return fetch(`${firebaseConfig.databaseURL}/user.json?orderBy="uid"&equalTo="${userId}"`)
    .then(result => result.json())
    .then(parsedResult => {
      console.log("check result", parsedResult)
      let resultArray = Object.keys(parsedResult)
      if(resultArray.length > 0){
        console.log("YEAH, true user")
      }else{
        console.log("false user")
        //add to user in DB
      }
    })
  }


  /*
    You return a context provider
    allow any child elements to access them.
*/

  return (
    <FirebaseContext.Provider value={{ isLoggedIn, login, logout, register, signInWithGoogle }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </FirebaseContext.Provider>
  );
}
