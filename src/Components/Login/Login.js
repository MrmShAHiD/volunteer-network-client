import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Login = () => {
    const {user, setUser} = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    // sign in with google
    const handleSignInWithGoogle = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const user = res.user;
            const {displayName, email} = user;
            const signedInUser = {
                displayName: displayName,
                email: email,
                isSignedIn: true
            }
            return signedInUser;
        })
        .then(res => {
            setUser(res);
            history.replace(from);
        })
        .catch(err =>{
            const error = err.message;
            console.log(error);
        })
    };

    return (
        <div style={{textAlign: 'center', marginTop:'50px'}} className="container">
            <div>
                <Link to="/">
                    <img style={{height:'80px'}} src="https://i.ibb.co/64hMJpY/Group-1329.png" alt=""/>
                </Link>
            </div>
            <div style={{marginTop:'60px'}}>
                <h2>Log In</h2>
                <Button onClick={handleSignInWithGoogle} style={{padding:'15px', fontSize:'20px', border: '1px solid grey', borderRadius:'15px'}}><img style={{height:'30px'}} src="https://i.ibb.co/VHS2GwS/google.png" alt=""/><span style={{marginLeft:'15px'}}>Sign in with Google</span></Button>
            </div>
        </div>
    );
};

export default Login;