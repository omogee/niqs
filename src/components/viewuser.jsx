import React, { Component } from 'react';
import axios from "axios"
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom"

class Viewuser extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            user:{},
            redirect:false
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
            this.setState({user:res.data.Data})
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
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        console.log(this.state.user)
        return ( 
            <div className="container">
          <div style={{padding:"40px 50px"}}>
          <h1 style={{textDecoration:"underline"}}>User Profile</h1>
            <div style={{textAlign:'left'}}>
                  <p><span className="fa fa-user" style={{color:"orange"}}></span> : {this.state.user.first_name + " " + this.state.user.last_name} </p>
                  <p><span className="fa fa-envelope" style={{color:"orange"}}></span> : {this.state.user.email}</p>
                  <p><span className="fa fa-phone" style={{color:"orange"}}></span> : {this.state.user.phone || "Not Specified"}</p>
                  <p><span style={{color:"orange",fontWeight:"bold"}}>Gender</span> : {this.state.user.gender || "Not Specified"}</p>
                 <p> <span className="fa fa-map-marker-alt" style={{color:"orange"}}></span> : {this.state.user.location || "Not Specified"}</p>
                 {this.state.user.first_name ?
        <p><span style={{color:"orange",fontWeight:"bold"}}>Priviledge</span> : <span style={{fontWeight:"bold"}}>{this.state.user.isAdmin ? "Admin" : "Officer"}</span></p>
        : null}
        </div>
        </div>           
            </div>
         );
    }
}
 
export default Viewuser;