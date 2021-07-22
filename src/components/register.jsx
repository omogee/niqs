import React, { Component } from 'react';
import axios from "axios"
import { Link,Redirect } from 'react-router-dom';
import Cookie from "js-cookie"


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            firstname:"",
            lastname:"",
            email:"",
            contact:"",
            gender:"",
            img:{},
            imgreader:"",
            password:"",
            compass:"",
            messageboxclass:"none",
            redirect:false,
            passbordercolor:"grey",
            passthick:"1"
        }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK REGISTER';
        if(Cookie.get("cyxpax") && Cookie.get("cyxpax") === "true"){
            console.log("isAdmin")
        }else{
           this.setState({redirect:true})
        }
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
             console.log(this.state)
             if(this.state.compass === this.state.password && this.state.password.length >= 8 && this.state.compass >= 8){
                 this.setState({passbordercolor:"green",passthick:"2"})
             }else{
                 this.setState({passbordercolor:"grey",passthick:"1"})
             }
        })
    }
    changefile=(e)=>{
      this.setState({img:e.target.files})
      var file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({
        imgreader: reader.result
      })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    }
    }

    submit=()=>{
        if(!Cookie.get("cyxpax") || Cookie.get("cyxpax") !== "true"){
            this.setState({redirect:true})
        }
        const data={
            first_name:this.state.firstname,
            last_name:this.state.lastname,
            email:this.state.email,
           contact:this.state.contact,
            password:this.state.password,
          //  contact:this.state.contact,
            gender:this.state.gender,
           password_confirmation:this.state.compass,
            isAdmin:"true"
        }
        console.log("data",data)
        const token = Cookie.get("cyxpzz")
        if(!token){
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
                 console.log(res.data)
                 this.setState({messageboxclass:"alert-success", firstname:"",lastname:"",email:"",
                 contact:"",gender:"",img:{},imgreader:"",password:"", compass:"",messagebox:"Registration recieved successfully"})
                 setTimeout(()=>this.setState({messageboxclass:"d-none",messagebox:""}),2000)
                 setTimeout(()=>alert("Message : user added successfully!"),3000)
            //window.location.href="/explore"
                }else{
                    this.setState({messagebox:"Registration Failed",messageboxclass:"alert-danger"},()=>{
                        window.scrollTo(0,  0)
                        setTimeout(()=>this.setState({messagebox:"",redirect:true,messageboxclass:"d-none"}),2000)
                    })
                }
           })
        .catch(err =>{
            this.setState({messagebox:"Upload Failed",messageboxclass:"alert-danger"},()=>{
                 window.scrollTo(0,  0)
                console.log("error",err)
                setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
            })
        })
    }
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        return ( 
            <div className="container"> 
                <div className="row registerbox">            
                    <div className="col-12 col-md-4">
                    <center>
                    <div className="imgbox mb-5" style={{backgroundColor:"grey",borderRadius:"50%",position:"relative"}}>
                    {this.state.img.length > 0 ?
                    <img src={`${this.state.imgreader}`} style={{width:"100%",height:"100%",borderRadius:"50%"}} className="img-responsive" alt=""/>
                    :                   
                    <center><small style={{position:"absolute",left:"30%",top:"40%",color:"lightgrey",fontWeight:"bold"}}>Click To Upload Image</small><br/>
                    <span className="fa fa-camera fa-3x"></span>
                     </center>
                      }              
                    </div>
                    </center>                          
                    <div className="row">                
                    <div className="col-12 mb-4">
                        <input type="file" name="img"  onChange={this.changefile} style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}} className="form-control" />
                    </div>
                    </div>
                    </div>
                   
                    <div className="col-12 col-md-8">
                  <div className="row">
                  <div className={`col-12 mb-3 alert ${this.state.messageboxclass}`}>
                   <center>
                       <small style={{fontWeight:"bolder"}}>{this.state.messagebox}</small>
                   </center>
               </div>
                  <div className="col-6">
                   <small className="text-primary" style={{fontWeight:"bold",float:"left"}}>FIRST NAME </small><br/>
                       <input type="text" name="firstname" value={this.state.firstname} onChange={this.change} style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}} className="form-control"/>
                   </div>
                   <div className="col-6">
                   <small className="text-primary" style={{fontWeight:"bold",float:"left"}}>LAST NAME </small><br/>
                       <input type="text"  name="lastname" value={this.state.lastname} onChange={this.change} style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}} className="form-control"/>
                   </div>
                   <div className="col-12">
                   <small className="text-primary mt-4" style={{fontWeight:"bold",float:"left"}}>EMAIL ADDRESS </small><br/>
                       <input type="text"  name="email" value={this.state.email} onChange={this.change} style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}} className="form-control"/>
                   </div>
                   <div className="col-7">
                   <small className="text-primary mt-4" style={{fontWeight:"bold",float:"left"}}>TELEPHONE </small><br/>
                       <input type="number"  name="contact" value={this.state.contact} onChange={this.change} style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}} className="form-control"/>
                   </div>
                   <div className="col-5">
                   <small className="text-primary mt-4" style={{fontWeight:"bold",float:"left"}}>GENDER </small><br/>
                       <select  name="gender" className="form-control" value={this.state.gender} onChange={this.change} style={{borderRadius:"0%",border:"none",borderBottom:"1px solid grey"}} >
                       <option value="">Select Gender</option>
                           {["male","female"].map(status =>
                           <option value={status}>{status}</option> 
                            )}
                       </select>
                   </div>
                   <div className="col-6">
                   <small className="text-primary mt-4" style={{fontWeight:"bold",float:"left"}}>PASSWORD </small><br/>
                       <input type="password" name="password" value={this.state.password} onChange={this.change} style={{borderRadius:"0%",border:"none",borderBottom:`${this.state.passthick}px solid ${this.state.passbordercolor}`}} className="form-control"/>
                   </div>
                   <div className="col-6">
                   <small className="text-primary mt-4" style={{fontWeight:"bold",float:"left"}}>CONFIRM PASSWORD </small><br/>
                       <input type="password"  name="compass" value={this.state.compass} onChange={this.change} style={{borderRadius:"0%",border:"none",borderBottom:`${this.state.passthick}px solid ${this.state.passbordercolor}`}} className="form-control"/>
                   </div>
                   </div><br/>
                   <Link to={"/login"}><small className="text-primary" style={{fontWeight:"bold",fontSize:"12px"}}>ALL READY HAVE AN ACCOUNT?</small></Link>
                    
                 <div className="row">
                 <div className="col-6 mt-5">
                      <button className="btn btn-primary" onClick={this.submit} style={{width:"60%"}}>Save</button>
                  </div>
                  <div className="col-6 mt-5">
                      <button className="btn btn-warning" style={{width:"60%",color:"white"}}>Edit</button>
                  </div>
                 </div>
                  </div>
                    </div>
                </div>
            
         );
    }
}
 
export default Register;