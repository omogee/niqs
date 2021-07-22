import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom"
import Cookie from "js-cookie"
import {states} from "./state"

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            firstname:"",
            lastname:"",
            email:"",
            contact:"",
            gender:"",
            location:"",
            redirect:false,
            messageboxclass:"d-none",
            messagebox:""
        }
    }
    componentDidMount=()=>{
      
        if(!Cookie.get("cyxpax") || Cookie.get("cyxpax") !== "true"){
            this.setState({redirect:true})
        }  
    }
    change =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    submit=(e)=>{
        e.preventDefault()
        if(!Cookie.get("cyxpax") || Cookie.get("cyxpax") !== "true"){
            this.setState({redirect:true})
        }
        const data={
            first_name:this.state.firstname,
            last_name:this.state.lastname,
            email:this.state.email,
           contact:this.state.contact,
            password:this.state.password,
            gender:this.state.gender,
           password_confirmation:this.state.compass,
           location:this.state.location,
            isAdmin:"false"
          
        }
        console.log("data",data)
        const token = Cookie.get("cyxpzz")
        if(!Cookie.get("cyxpax") || Cookie.get("cyxpax") !== "true"){
            this.setState({redirect:true})
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        if(this.state.password !== this.state.compass){
            alert("Warning!!! Password does not Match")
        }else{
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/auth/register`,data,config)
        .then(res=> {
            if(res.data){
                window.scrollTo(0,  0)
                 this.setState({messageboxclass:"alert-success", firstname:"",lastname:"",email:"",
                 contact:"",gender:"",location:"",img:{},imgreader:"",password:"", compass:"",messagebox:"Message : User added successfully!"})
                 setTimeout(()=>this.setState({messageboxclass:"d-none",messagebox:""}),2000)
                 setTimeout(()=>alert("Message : User added successfully!"),3000)
            //window.location.href="/explore"
                }else{
                    this.setState({messagebox:"Registration Failed",messageboxclass:"alert-danger"},()=>{
                        window.scrollTo(0,  0)
                        setTimeout(()=>this.setState({messagebox:"",redirect:true,messageboxclass:"d-none"}),2000)
                    })
                }
           })
        .catch(err =>{
            this.setState({messagebox:`Upload Failed : ${err.response.statusText}`,messageboxclass:"alert-danger"},()=>{
                 window.scrollTo(0,  0)
                setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
            })
        })
    }
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        const gender = ["male", "female"]
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">   
             <form  onSubmit={this.submit}>
                <div  style={{border:"1px solid lightgrey",backgroundColor:"white",height:"100%",padding:"20px"}}>
                <div className={`alert ${this.state.messageboxclass}`}>
               <center>
               <small>{this.state.messagebox}</small>
               </center>
                 </div>
                <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>First Name :</p>
               <input  type="text" className="form-control" value={this.state.firstname} onChange={this.change} name="firstname"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Last Name :</p>
               <input  type="text" className="form-control" value={this.state.lastname} onChange={this.change} name="lastname"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Email :</p>
               <input  type="text" className="form-control" value={this.state.email} onChange={this.change} name="email"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Contact :</p>
               <input  type="number" className="form-control" value={this.state.contact} onChange={this.change} name="contact"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Gender :</p>
               <select name="gender" className="form-control" onChange={this.change} value={this.state.gender}>
               <option >Select Gender</option>
              {gender.map(state =>                 
               <option value={state}>{state}</option>
               )}
             </select><br/>

               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Location :</p>
               <select name="location" className="form-control"  onChange={this.change} value={this.state.location}>
<option value="">Select Location</option>
{states.map(state =>                 
<option value={`${state.state.name}`}>{state.state.name}</option>
)}
</select><br/>
                  <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Password :</p>
                  <input  type="password" className="form-control" value={this.state.password} onChange={this.change} name="password"/><br/>
               <p style={{fontWeight:"bold",padding:"0px",margin:"0px"}}>Confirm Password :</p>
               <input  type="password" className="form-control" value={this.state.compass} onChange={this.change} name="compass"/><br/>
                <div style={{display:"flex",flexWrap:"nowrap",padding:"10px 20px"}} className="mt-5" >
                  <div style={{width:"30%"}}></div>
                   <div style={{width:"80%"}} >
                       <button type="submit" className="btn btn-primary" style={{width:"100%",padding:"2px"}}>Create User</button>
                   </div>
                </div>
                </div>
                </form>
                </div>
                      </div>
            </div>
         );
    }
}
 
export default CreateUser;