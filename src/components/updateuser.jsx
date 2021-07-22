import React, { Component } from 'react';
import axios from "axios"
import {Redirect} from "react-router-dom"
import Cookie from "js-cookie"


class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            gender:"",
            location:"",
            isAdmin:"",
            redirect:false,
            showButton:false
         }
    }

    componentDidMount=()=>{
        const userId = this.props.match.params.id
        const token = Cookie.get("cyxpzz")
        if(!token || !Cookie.get("cyxpax")){
  this.setState({redirect:true})
        }
    this.setState({token:Cookie.get("cyxpzz")})
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/auth/user/${userId}`, config)
        .then(res => {
            if(res.data.Data){
            this.setState({firstname:res.data.Data.first_name,
            lastname:res.data.Data.last_name,
        email:res.data.Data.email,
        phone:res.data.Data.phone,
      gender:res.data.Data.gender,
      isAdmin:res.data.Data.isAdmin,
    location:res.data.Data.location})
            }else{
                console.log(res.data)
                this.setState({redirect:true})
            }
        })
    .catch(err => {
        this.setState({redirect:true})
        console.log("error",err,err.message)}
        )
    }
 change=(e)=>{
   this.setState({showButton:true,[e.target.name]:e.target.value})
 }
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        let privilegdes =["Admin","Officer"]
        return ( 
            <div className="container">
              <div className="row">
                  <div className="col-12 col-md-6">
                  <div style={{padding:"10px 50px"}}>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>First Name :</p>
               <input  type="text" className="form-control" value={this.state.firstname} onChange={this.change} name="firstname"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Last Name :</p>
               <input  type="text" className="form-control" value={this.state.lastname} onChange={this.change} name="lastname"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Email :</p>
               <input  type="text" className="form-control" value={this.state.email} onChange={this.change} name="email"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Contact :</p>
               <input  type="number" className="form-control" value={parseInt(this.state.phone)} onChange={this.change} name="phone"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Gender :</p>
               <input  type="text" className="form-control" value={this.state.gender} onChange={this.change} name="gender"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Location :</p>
               <input  type="text" className="form-control" value={this.state.location} onChange={this.change} name="location"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Priviledge :</p>
               <select name="location" className="form-control" onChange={this.change} value={this.state.location}>
               <option value={`${this.state.isAdmin ? "Admin" : "Officer"}`}>{`${this.state.isAdmin ? "Admin" : "Officer"}`}</option>
              {privilegdes.map(state =>                 
               <option value={state}>{state}</option>
               )}
             </select><br/>
             <div style={{float:"right",display:`${this.state.showButton ? "block" : "none"}`}}>
                 <button className="btn btn-primary">Update</button>
             </div>
               </div>
                  </div>
              </div>
            </div>
         );
    }
}
 
export default UpdateUser;