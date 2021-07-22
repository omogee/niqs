import React, { Component } from 'react';
import Users from './adminusers';
import logo from "./images/logo.jpg"
import {Link, Redirect} from "react-router-dom"
import Cookie from "js-cookie"

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:false
          }
    }
    componentDidMount=()=>{
      
        if(!Cookie.get("cyxpax") || Cookie.get("cyxpax") !== "true"){
            this.setState({redirect:true})
        }  
    }
    logout =()=>{
        Cookie.remove("cyxpax")
        Cookie.remove("cyxpzz")
        this.setState({redirect:true})
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        return ( 
            <div>
               <div className="row">
                   
                   <div className="col-12 col-md-9">
                       <center>
                   <div style={{float:"right",padding:"5px"}}>
                                <p style={{fontWeight:"bold",color:"orange"}}>Welcome User</p>
                        </div>
                        </center>
                   </div>
                   <div className="col-6 col-md-4" style={{padding:"30px"}}>
                   <center>
                   <div style={{padding:"10px"}}>
                             <Link to={`/admin/manageusers`}>
                             <span  className="fa fa-user" style={{fontSize:"80px",color:"black"}}></span>
                                <p style={{fontWeight:"bold",color:"black"}}>Manage User</p>
                             </Link>
                        </div>
                </center>
                   </div>
                   <div className="col-6 col-md-4" style={{padding:"30px"}}>
                   <center>
                   <div style={{padding:"10px"}}>
                   <Link to={`/admin/createuser`}>
                                <span  className="fa fa-user-plus" style={{fontSize:"80px",color:"black"}}></span>
                                <p style={{fontWeight:"bold",color:"black"}}>Create Users</p>
                                </Link>
                        </div>
                        </center>
                   </div>
                   
                   <div className="col-6 col-md-4" style={{padding:"30px"}}>
                   <center>
                  <Link to={`/admin/home/createuser`} style={{color:"black"}}>
                  <div style={{padding:"10px"}}>
                  <Link to={`/explore`}>
                                <span  className="fa fa-cloud" style={{fontSize:"80px",color:"black"}}></span>
                                <p style={{fontWeight:"bold",color:"black"}}>Upload Data</p>
                                </Link>
                        </div>
                  </Link>
                        </center>
                   </div>
                   <div className="col-6 col-md-4" style={{padding:"30px"}}>
                   <center>
                   <div >
                                <span className="fa fa-download" style={{fontSize:"80px",marginBottom:"0px"}}>
                                    
                                </span><br/>
                                <small style={{fontWeight:"bold"}}>Downloaded PDF's</small>
                        </div>
                        </center>
                   </div>
                   <div className="col-6 col-md-4" style={{padding:"30px"}}>
                   <center>
                   <div onClick={this.logout}>
                                <span className="fa fa-sign-out-alt" style={{fontSize:"80px",marginBottom:"0px"}}>
                                    
                                </span><br/>
                                <small style={{fontWeight:"bold"}}>Log Out</small>
                        </div>
                        </center>
                   </div>
                   </div>
               </div>
            
         );
    }
}
 
export default Admin;