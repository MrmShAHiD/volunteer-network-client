import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [toggleSelection, setToggleSelection] = useState(true);

    // add event form
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = eventData => {
        fetch('http://peaceful-scrubland-04513.herokuapp.com/addRegister', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Event added successfully');
                }
            })
    }

    // get all user registrations data
    const [usersRegistrationList, setUsersRegistrationList] = useState([])
    useEffect(() => {
        fetch(`http://peaceful-scrubland-04513.herokuapp.com/allRegisterList`)
            .then(response => response.json())
            .then(data => {
                setUsersRegistrationList(data)
            })
    }, [usersRegistrationList])

    // delete user task or event from admin
    const deleteRegistrationOfUser = (id) => {
        console.log('register deleted',id);
        fetch(`http://peaceful-scrubland-04513.herokuapp.com/deleteUserReg/${id}`,{
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if(data){
                alert('User registration deleted successfully')
            }
        })
    }
    let count = 1;

    return (
        <div style={{textAlign: 'center'}}>
            <div>
                <Link to="/home"><img style={{height:'100px'}} src="https://i.ibb.co/0DwF3w5/main-logo.png" alt="" /></Link>
                {toggleSelection ? <p><strong>Volunteer register list</strong></p> : <p><strong>Add event</strong></p>}
            </div>

            <div>
                <div>
                    <p onClick={() => setToggleSelection(true)}> <img className="volunteer-list-image" src="https://i.ibb.co/WxVCXFf/users-alt-1.png" alt="" /> Volunteer register list</p>

                    <p onClick={() => setToggleSelection(false)}> <img className="add-event-image" src="https://i.ibb.co/hK9Kdpw/plus-1.png" alt="" />Add event</p>
                </div>

                <div>
                    {toggleSelection ? <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email address</th>
                                    <th>Registration date</th>
                                    <th>Volunteer list</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        {
                                usersRegistrationList.map(usersRegistration =><tbody key={usersRegistration._id}>
                                    <tr>
                                        <td>{count++}</td>
                                        <td>{usersRegistration.fullName}</td>
                                        <td>{usersRegistration.email}</td>
                                        <td>{usersRegistration.date}</td>
                                        <td>{usersRegistration.volunteeringName}</td>
                                        <td className="text-center"><Button onClick={()=>deleteRegistrationOfUser(usersRegistration._id)}>Delete</Button></td>
                                    </tr>
                                </tbody> )
                            }
                        </Table>
                    </div> :
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="name">Event Title</label> <br />
                                    <input name="name" id="name" placeholder="Enter Title" ref={register({ required: true })} /><br />
                                    {errors.name && <span style={{ color: 'red' }}>Event title is required</span>}<br />

                                    <label htmlFor="description">description</label> <br />
                                    <textarea rows="4" name="description" id="description" placeholder="Enter Description" ref={register({ required: true })} /> <br />
                                    {errors.description && <span style={{ color: 'red' }}>Description is required</span>} <br />
                                </div>

                                <div className="event-form-2">
                                    <label htmlFor="eventDate">Event Date</label><br />
                                    <input name="eventDate" type="date" id="eventDate" ref={register({ required: true })} /> <br />
                                    {errors.eventDate && <span style={{ color: 'red' }}>Date is required</span>} <br />

                                    <label htmlFor="photo">Event image link</label><br />
                                    <input name="photo" id="photo" placeholder="Enter valid image link" ref={register({ required: true })} /> <br />
                                    {errors.photo && <span style={{ color: 'red' }}>Event image link</span>} <br />
                                    <Button variant="primary" type="submit">Add new event</Button>
                                </div>
                            </form>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default Admin;