import React from 'react';
import { Button } from 'react-bootstrap';

const RegisterInfo = (props) => {
    const {name, date, photo, _id} = props.registerList;

    const deleteRegister = () => {
        fetch(`http://peaceful-scrubland-04513.herokuapp.com/delete/${_id}`, {method: 'DELETE'})
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('volunteer activity deleted successfully')
            }
        })
    }

    return (
        <div className="registration-list-container">
            <div className="reg-card-image">
                <img src={photo} alt="" />
            </div>
            <div className="registration-details">
                <h5>{name}</h5>
                <h6>{date}</h6>
                <Button variant="danger" className="registration-delete-btn" onClick={deleteRegister}>Cancel</Button>
            </div>
        </div>
    );
};

export default RegisterInfo;