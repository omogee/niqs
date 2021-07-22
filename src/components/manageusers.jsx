import React, { Component } from 'react';
import axios from "axios"
import Cookie from "js-cookie"
import {Link, Redirect} from "react-router-dom"

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users:[],
            namesearch:"",
            newusers:[],
            shownewusers:false,
            token:"",
            redirect:false,
            showdeletemsg:"none",
            deletinguser:"",
            deletinguserId:""
         }
    }
    componentDidMount=()=>{
        const token = Cookie.get("cyxpzz")
        if(!token && Cookie.get("cyxpax")){
  this.setState({redirect:true})
        }
    this.setState({token:Cookie.get("cyxpzz")})
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/auth/users`, config)
        .then(res => {
            if(res.data.data){
            this.setState({users:res.data.data})
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
        const users=[]
      this.setState({namesearch:e.target.value},()=>{
          this.state.users.map(user =>{
              if(user.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 || user.last_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1){
               users.push(user)
              }
        
          })
            this.setState({newusers:users})
            if(e.target.value.length === 0 || users.length === 0){
                this.setState({shownewusers:false})
            }else{
                this.setState({shownewusers:true})
            }
        
      })
    }
    deleteuser=(id)=>{
        const token = Cookie.get("cyxpzz")
        if(!token && Cookie.get("cyxpax")){
  this.setState({redirect:true})
        }
    this.setState({token:Cookie.get("cyxpzz")})
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    axios.delete(`https://niqsdatabank.herokuapp.com/api/v1/auth/delete/${id}`,config)
    .then(res => {
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/auth/users`, config)
        .then(res => {
            if(res.data.data){
            this.setState({users:res.data.data})
            }else{
                console.log(res.data)
                this.setState({redirect:true})
            }
        })
    .catch(err => {
        this.setState({redirect:true})
        console.log("error",err,err.message)}
        )
    })
    .catch(err => console.log(err))
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        const headers =["Name","State","Actors"]
        return ( 
            <div className="container-fluid  mt-2">
                <div style={{zIndex:"4",display:`${this.state.showdeletemsg}`,border:"1px solid grey",padding:"20px",position:"fixed",top:"30%",left:"50%",backgroundColor:"white"}}>
                <small>
                    <span className="fa fa-warning text-danger"></span>
                    This action cannot be undone!
                </small>
                <p className="mt-4"><span style={{fontWeight:"bold",color:"red"}}>Delete </span> {this.state.deletinguser}</p>
                <button className="btn btn-primary" onClick={()=>this.setState({showdeletemsg:"none"})} style={{float:"left"}}>Cancel</button>
                <button className="btn btn-danger" onClick={()=>this.deleteuser(this.state.deletinguserId)} style={{float:"right"}}>Proceed</button>
                
                </div>
            <div className="row" atyle={{padding:"0px"}}>
                <div className="d-none d-md-block col-md-4"></div>
                <div className="col-12 col-md-7">
                    <center>
                <div style={{width:"60%",float:"right",padding:"5px"}}>
<input type="text" name="namesearch" placeholder="search users..." onChange={(e)=>this.change(e)} value={this.state.namesearch} className="form-control" />
                     </div>
                     </center>
                </div>
               <div className="col-12 mt-4">
                   <div className="row" style={{backgroundColor:"orange",padding:"0",color:"white",width:"100%"}}>
                   <div className="col-5">
<p style={{paddingTop:"5px"}}>Name</p>
</div>
<div className="col-2 col-md-3" style={{borderLeft:"1px solid lightgrey"}}>
<p style={{paddingTop:"5px"}}>
    <small>state</small>
</p>
</div>
<div className="col-5 col-md-4" style={{borderLeft:"1px solid lightgrey"}}>
 <p style={{paddingTop:"5px"}}>Actors</p>
</div>
                   </div>
 {(this.state.namesearch.length > 0) || (this.state.newusers.length > 0  && this.state.shownewusers )? 
                     this.state.newusers.map(user =>
<div className="row" key={user.id} style={{width:"100%",borderBottom:"1px solid lightgrey"}}>
<div className="col-5"  style={{borderLeft:"1px solid lightgrey"}}>
<p>{user.first_name+" "+user.last_name}</p>
</div>
<div className="col-2 col-md-3" style={{borderLeft:"1px solid lightgrey"}}>
<small>state</small>
</div>
<div className="col-5 col-md-4" style={{borderLeft:"1px solid lightgrey", borderRight:"1px solid lightgrey"}}>
<span className="fa fa-eye mr-2"></span>
    <span className="fa fa-pencil-square ml-2"></span>
    <span className="fa fa-trash ml-4 text-danger"></span>
</div>
                     </div>
                     ) : 
                     this.state.users.map(user =>
                        <div className="row" key={user.id} style={{width:"100%",borderBottom:"1px solid lightgrey"}}>
   <div className="col-5" style={{borderLeft:"1px solid lightgrey"}}>
   <p>{user.first_name+" "+user.last_name}</p>
   </div>
   <div className="col-2 col-md-3" style={{borderLeft:"1px solid lightgrey"}}>
      <small> {"state"}</small>
   </div>
   <div className="col-5 col-md-4" style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey"}}>
  <a href={`/admin/manageuser/${user.id}`} style={{color:"orange"}} >
  <span className="fa fa-eye mr-2" ></span>
  </a>
  <a href={`/admin/manageuser/update/${user.id}`} style={{color:"grey"}}>
 <span className="fa fa-pencil-square ml-2"></span>
  </a>
     <span onClick={()=>{this.setState({showdeletemsg:"block",deletinguserId:user.id,deletinguser:user.first_name+" "+user.last_name})}} className="fa fa-trash ml-4 text-danger"></span>
   </div>
   </div>
     )}
               </div>
                <div className="col-12" >
                <center>
                <div  style={{width:"100%",padding:"10px"}}>
              
                         <div style={{display:"flex",flexWrap:"nowrap"}}>
        <div>
           <Link to={"/register"}>
           <button className="btn btn-primary mr-5">
                Create Admin
            </button>
            </Link>
        </div>
        <div>
           <Link to={"/admin/createuser"}>
           <button className="btn btn-primary ml-5">
                Create User
            </button>
           </Link>
        </div>
                         </div>
                     </div>
             </center>
                </div>
        
                </div>
            </div>
         
         );
    }
}
 
export default ManageUsers;