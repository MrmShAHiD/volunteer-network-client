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

    const [volunteer, setVolunteer] = useState([]);
    useEffect(() => {
        fetch('http://peaceful-scrubland-04513.herokuapp.com/volunteerActivity')
        .then(res => res.json())
        .then(data => setVolunteer(data))
    }, [])

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

            <div style={{padding:'40px'}} className="text-center mt-5 mb-5">
                <h1 style={{textAlign:'center'}}>I GROW BY HELPING PEOPLE IN NEED.</h1>
                <div  style={{textAlign:'center'}}>
                    <FormControl style={{padding:'10px'}} type="text" placeholder="Search" className="mr-sm-6 w-25" />
                    <Button style={{padding:'10px', marginLeft:'10px', borderRadius:'5px'}}>Search</Button>
                </div>
            </div>

            <Grid style={{padding:'20px'}} container direction="row" justify="center">
                {
                    volunteer.map(volunteer => <VolunteeringActivity volunteer={volunteer} key={volunteer._id}></VolunteeringActivity>)
                }
            </Grid>
        </div>
    );
};

export default Home;