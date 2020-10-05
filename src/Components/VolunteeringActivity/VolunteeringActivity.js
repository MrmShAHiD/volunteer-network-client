import { Card, Link } from '@material-ui/core';
import React from 'react';

const VolunteeringActivity = (props) => {
    const {name, photo, _id} = props.volunteer;
    return (
        <Link to={`/volunteer/${_id}`} className="single-volunteer-card">
            <Card style={{ width: '12rem', height: '20rem' }}>
                <Card.Img variant="top" style={{ height: '14rem'}} src={photo} />
                <Card.Body className="text-center" style={{ backgroundColor: 'lightblue' }}>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    );
};

export default VolunteeringActivity;