import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { useForm } from "react-hook-form";

const Register = () => {
    const {volunteerKey} = useParams();
    const [newVolunteer, setNewVolunteer] = useState([])
    useEffect(() => {
        fetch('http://peaceful-scrubland-04513.herokuapp.com/volunteerActivity')
        .then(res => res.json())
        .then(data => {
            const selectedVolunteer = data.find(activity => activity._id === volunteerKey);
            setNewVolunteer(selectedVolunteer)
        })
    }, [volunteerKey])

    const {name, photo} = newVolunteer;

    const {user, setUser} = useContext(UserContext);
    const {displayName, email} = user;
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = registerData => {
        const newRegisterData = { ...registerData, photo }
        fetch('http://peaceful-scrubland-04513.herokuapp.com/addRegister', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRegisterData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push("/registerList");
                }
            })
    }

    return (
        <div className="container text-center mt-5">
            <div className="mb-2">
                <Link to="/home">
                    <img style={{ width: '180px' }} src="https://i.ibb.co/0DwF3w5/main-logo.png" alt="logo" />
                </Link>
            </div>
            <div className="registration-form">
                <h3>Register as a Volunteer</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="fullName" defaultValue={displayName} ref={register({ required: true })} placeholder="Full Name" /> <br />
                    {errors.fullName && <span style={{ color: 'red' }}>Full Name is required</span>} <br />

                    <input name="email" defaultValue={email} ref={register({ required: true })} placeholder="Email or Username" /> <br />
                    {errors.email && <span style={{ color: 'red' }}>Email or user name is required</span>} <br />

                    <input name="date" type="date" ref={register({ required: true })} placeholder="Date" /> <br />
                    {errors.date && <span style={{ color: 'red' }}>Date is required</span>} <br />

                    <input name="description" ref={register({ required: true })} placeholder="Description" /> <br />
                    {errors.description && <span style={{ color: 'red' }}>Description is required</span>} <br />

                    <input name="Name" defaultValue={name} ref={register({ required: true })} placeholder="volunteering name" /> <br />
                    {errors.volunteeringName && <span style={{ color: 'red' }}>Volunteer name is required</span>} <br />
                    
                    <input className="bg-primary text-white" type="submit" value="Registration" />
                    
                </form>
            </div>
        </div>
    );
};

export default Register;  