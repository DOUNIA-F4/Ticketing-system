import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AdminNavBar from './layout/AdminNavBar'

// import { Link } from 'react-router-dom';
const NewAssign = (props) => {
    //Get ticket id from params
    const { idTicket, idUser } = useParams();

    //initiate state values of Ticket
    const initialState = {idTicket: idTicket,
                            idUser: idUser, 
                            idTech: '', 
                            moreInfo: ''
                        };

    //Create a new state 
    const [assign, setAssign] = useState(initialState);
    
    //Create Error state
    const [ errorMessage, setErrorMessage ] = useState('');

    //Array of existing users with role of technicien
    const [ tech, setTech ] = useState([]);

    //Call getTecks one time in the component display
    useEffect( () => {
        getTecks();
    }, []);

    //Get all technicien data,will be used to fill a select input in jsx code(return)
    const getTecks = () => {
        axios.get('http://localhost:5000/api/users/tech' ,{ withCredentials: true })
        .then(res => {
            setTech(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    //Hundle inputs changes
    const onChange = (e) =>{
        setAssign({
            ...assign,
            [e.target.name] : e.target.value
        });
    }
      //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Call api endpoint
            const id = await axios.post('http://localhost:5000/api/assign/new', assign, { withCredentials: true });
            
            //Redirect to list of all users
            if (id) props.history.push('/listtickets');
        } catch (error) {
            //Set error message
            setErrorMessage(error.response.data.message);
        }
    }

    return <div>
        <AdminNavBar />
        <section className="testimonial py-5" id="testimonial">
                <div className="container">
                    <div className="row ">
                    <div className="col-md-4 py-5 bg-white text-dark text-center ">
                            <div className=" ">
                                <div className="card-body">
                                    <img src="data:image/png;base64,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" alt="" />
                                    <p>Add new ticket</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 py-5 border">
                            <h4 className="pb-4">Assign a ticket</h4>
                            <form id="addNewUser" name="addNewUser" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <select id="idTech" name="idTech" className="form-control"  onChange={onChange}>
                                            <option value="">--Please choose a technicien--</option>
                                            {tech.map(tc =>{
                                                return <option value={tc._id}>{tc.fname + ' ' + tc.lname} </option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                    <textarea id="moreInfo" name="moreInfo" placeholder="More informations" className="form-control" type="text" onChange={onChange}  rows="5" cols="33">
                                    </textarea>
                                    </div>
                                </div>
                                
                                {errorMessage && <p className="alert alert-danger" role="alert">{errorMessage}</p>}
                                <div className="form-row">
                                    <input type="submit" className="btn btn-success" value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </section>
</div>
}
 
export default NewAssign;