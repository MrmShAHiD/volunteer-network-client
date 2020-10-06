import { Grid } from '@material-ui/core';
import * as firebase from "firebase/app";
import React, { useContext, useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import RegisterInfo from '../RegisterInfo/RegisterInfo';

const RegisterList = () => {
    const {user, setUser} = useContext(UserContext);
    const { name, isSignedIn } = user;
    const userSignOut = () => {
        return firebase.auth().signOut().then(function () {
            const signedOutUser = {
                name: '',
                email: '',
                isSignedIn: false
            }
            return signedOutUser;
    
        }).catch(function (error) {
            // An error happened.
        })
        .then(res => {
            setUser(res);
        })
    }
    const [register, setRegister] = useState([]);

    useEffect(() => {
        fetch(`http://peaceful-scrubland-04513.herokuapp.com/register/${user.email}`)
        .then(res => res.json())
        .then(data => {
            setRegister(data);
        })
    },[user.email, register])

    return (
        <div>
            <Navbar style={{padding:'40px'}} collapseOnSelect expand="lg" bg="transparent" variant="light">
                <Link to="/home">
                    <Navbar.Brand>
                        <img style={{height:'100px'}} src="https://i.ibb.co/0DwF3w5/main-logo.png" alt="" />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{textAlign: 'center'}} className="nav-links">
                        <Link style={{marginLeft:'10px'}} to="/home">Home</Link>
                        <Link style={{marginLeft:'10px'}} to="/donation">Donation</Link>
                        <Link style={{marginLeft:'10px'}} to="/events">Events</Link>
                        {isSignedIn ? <Link style={{marginLeft:'10px'}} to="/"> <Button className="mr-3" variant="success" onClick={userSignOut}>Logout</Button></Link>
                            : <Link style={{marginLeft:'10px'}} to="/login"><Button className="mr-3" variant="success">Login</Button></Link>}
                        <Link style={{marginLeft:'10px'}} to="/registerList"><Button className="mr-3" variant="primary">Register</Button></Link>
                        <Link style={{marginLeft:'10px'}} to="/admin"><Button className="mr-3" variant="dark">Admin</Button></Link>
                        {isSignedIn && <h6 className="user-name-size">{name}</h6>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Grid container direction="row">
                {
                    register.map((register => <RegisterInfo registerList={register}  key={register._id}></RegisterInfo>))
                }
            </Grid>
        </div>
    );
};

export default RegisterList;