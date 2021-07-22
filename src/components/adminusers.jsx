import React, { Component } from 'react';
import axios from "axios"

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let users =["tunde","bode","niqs director 1","gerrald","simpson","samson","jumo"]
        return (
            <div className="container-fluid">
                <p>Manage Users</p>
                <div className="row">
                    {users.map(user=>
                        <div className="col-4 col-md-3">
                            <p>{user}</p>
                            <button className="btn-sm btn btn-primary">Delete</button><br/>
                            <button className="mt-1 btn-sm btn btn-primary">Suspend</button>
                            <hr/>
                        </div>
                        )}
                </div>
            </div>
         );
    }
}
 
export default Users;