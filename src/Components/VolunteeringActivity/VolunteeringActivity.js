import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VolunteeringActivity = (props) => {
    const {name, photo, _id} = props.volunteer;
    return (
        <Link to={`/volunteer/${_id}`} className="single-volunteer-card">
            <Card style={{ width: '12rem', height: '20rem', marginLeft: '20px'}}>
                <Card.Img variant="top" style={{ height: '14rem'}} src={photo} />
                <Card.Body style={{ backgroundColor: '#f08dc2', color:'white', borderRadius:'10px', textAlign:'center', padding:'10px'}}>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default VolunteeringActivity;