import React, { useContext, useEffect, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { Button, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VolunteeringActivity from '../VolunteeringActivity/VolunteeringActivity';
import {Grid} from '@material-ui/core';

const Home = () => {
    const {user, setUser} = useContext(UserContext);
    const { name, isSignedIn } = user;
    const userSignOut = () => {
        return firebase.auth().signOut().then(function () {
            const loggedOutUser = {
                displayName: '',
                email: '',
                isLoggedIn: false
            }
            return loggedOutUser;
    
        }).catch(function (error) {
            // An error happened.
        })
        .then(res => {
            setUser(res);
        })
    }

    const [volunteer, setVolunteer] = useState([]);
    useEffect(() => {
        
    }, [])

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
                <Link to="/home">
                    <Navbar.Brand>
                        <img className="w-25" src="https://i.ibb.co/0DwF3w5/main-logo.png" alt="" />
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav-links">
                        <Link className="single-nav-link" to="/home">Home</Link>
                        <Link className="single-nav-link" to="/comingSoon">Donation</Link>
                        <Link className="single-nav-link" to="/comingSoon">Events</Link>
                        {isSignedIn ? <Link to="/"> <Button className="mr-3" variant="success" onClick={userSignOut}>Logout</Button></Link>
                            : <Link to="/login"><Button className="mr-3" variant="success">Login</Button></Link>}
                        <Link to="/registerList"><Button className="mr-3" variant="primary">Register</Button></Link>
                        <Link to="/admin"><Button className="mr-3" variant="dark">Admin</Button></Link>
                        {isSignedIn && <h6 className="user-name-size">{name}</h6>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="text-center mt-5 mb-5">
                <h1>I GROW BY HELPING PEOPLE IN NEED.</h1>
                <div className="d-flex justify-content-center">
                    <FormControl type="text" placeholder="Search" className="mr-sm-6 w-25" />
                    <Button className="ml-2" variant="primary">Search</Button>
                </div>
            </div>

            <Grid container direction="row" justify="center">
                {
                    volunteer.map(volunteer => <VolunteeringActivity volunteer={volunteer} key={volunteer.id}></VolunteeringActivity>)
                }
            </Grid>
        </div>
    );
};

export default Home;