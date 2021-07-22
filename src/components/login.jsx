import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App';
import background from "./images/background.jpeg"
import {Link, Redirect} from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

class Login  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         email:"",
         password:"",
         passwordType:"password",
         passwordclass:"fa fa-eye",
         errormsg:"",
         msgdisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK LOGIN';
    }
    changePasswordType=()=>{
        if(this.state.passwordType === "password"){
            this.setState({passwordType:"text",passwordclass:"fa fa-eye"})
        }
        else{
            this.setState({passwordType:"password",passwordclass:"fas fa-eye-slash"})
        }
    }
    openRegister=()=>{     
   this.props.history.push("/register")
    }
    change =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    submit=(e)=>{
        e.preventDefault()
        const data ={
            email:this.state.email,
            password:this.state.password
        }
        axios.post("https://niqsdatabank.herokuapp.com/api/v1/auth/login",data)
        .then(res => {console.log(res.data)
           if(res.data.access_token){
            Cookies.set("cyxpzz", `${res.data.access_token}`, { expires: 0.0155 })
            const { from } = this.props.location.state || "/";
            if(res.data.user.isAdmin){
                Cookies.set("cyxpax", true, { expires: 0.0155 })                
            if(from){
                this.props.history.push(from)
               } else{
                this.props.history.push("/admin/home")
               }
            }else{
                Cookies.set("cyxpax", false, { expires: 0.0155 })                
            if(from){
                this.props.history.push(from)
               } else{
                this.props.history.push("/")
               }
            }
          
       console.log(res.data.user.isAdmin)
        }else{
            this.setState({errormsg:res.data})
        }
          
        })
        .catch(err => {this.setState({errormsg:err.response.statusText+" : " + JSON.stringify(err.response.data.error),msgdisplay:"block"})
        console.log(err.response)
     setTimeout(()=> this.setState({msgdisplay:"none",errormsg:""}), 3000)
    })
    }
    render() { 
        return (
             <div >
            <div style={{backgroundImage:`url(${background})`,backgroundSize:"cover",position:"absolute",width:"100%",height:"100%"}}>
                <center className="loginbox">
                
 <small className="text-danger" style={{display:`${this.state.msgdisplay}`,fontWeight:"bold",padding:"5px"}}>{this.state.errormsg}</small>
               
                  <div className="row" style={{width:"100%"}}>
                      <div className="col-6 text-primary" style={{padding:"0px",margin:"0px",border:"1px solid lightblue"}}>
                     <center style={{padding:"8px"}}>
                           Login
                           </center>
                      </div>
                      <div className="col-6 bg-primary" onClick={this.openRegister} style={{cursor:"pointer",padding:"0px",margin:"0px"}}>
                     <center style={{padding:"8px",color:"white",textDecoration:"none"}}>Register</center>
                      </div>
                  </div>
                  <form method="get">
                  <div className="col-12" style={{padding:"20px"}}>
                       <small className="text-primary" style={{fontWeight:"bold",float:"left"}}>EMAIL ADDRESS </small><br/>
                       <input type="text" onChange={this.change} name="email" value={this.state.email} style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}} className="form-control"/>
                
                     <small  className="text-primary mt-1" style={{fontWeight:"bold",float:"left"}}>PASSWORD</small><br/>
                     <div class="input-group mb-3">
                  <input type={this.state.passwordType} name="password" onChange={this.change} value={this.state.password} className="form-control" style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}}></input>
                <div class="input-group-append" style={{borderBottom:"1px solid grey"}} className="text-primary">
                      <span onClick={this.changePasswordType} className={this.state.passwordclass}></span>
                  </div>
                 </div>
                  </div>
               
                  <div className="col-12">
                     <center>
                     <button type="submit" onSubmit={this.submit} onClick={this.submit} className="btn btn-primary">
                          Login
                      </button><br/>
                     <small  className="text-primary" style={{fontWeight:"bold",fontSize:"11px"}}> FORGOT PASSWORD?</small>
                     </center>
                  </div>
                  </form>
              </center>
            </div>
            </div>

         );
    }
}
 
export default Login ;