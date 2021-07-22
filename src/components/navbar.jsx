import React, { Component } from 'react';
import logo from "./images/laaga.png"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          navheight:"0px"
         }
    }

    toggle=()=>{
      if(this.state.navheight === "0px"){
        this.setState({navheight:"150px"})
      }else{
        this.setState({navheight:"0px"})
      }
    }
    render() { 
const uri = window.location.href;
        return ( 
            <div style={{width:"100%",position:"sticky",top:"0px",zIndex:"3"}}>
 <nav className="navbar navbar-expand-md bg-primary" style={{color:"white",paddingTop:"0",paddingBottom:"0",margin:"0"}}>
 <div style={{display:"flex",paddingBottom:"0",marginBottom:"0"}}>
 <a  className=" mb-2" href="/" style={{margin:"0",padding:"0px",marginBottom:"0"}}>
   <img  src={logo} className="logo" style={{margin:"0px",padding:"0px"}}></img>
 </a>
  <button style={{color:"white",float:"right"}} onClick={this.toggle} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar"     aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="fa fa-bars" ></span>
  </button>
 </div>
  <div className="mt-1 nosmheight" style={{height:`${this.state.navheight}`,transition:"height 2s",overflow:"hidden",width:"100%"}}>
  <div style={{marginTop:"20px"}}>
  <small className="nosm " onClick={()=>this.setState({navheight:"0px"})}><a className="nav-item nav-link"  style={{padding:"2px",color:`${uri.indexOf("landing") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("landing") > -1 ? "bolder" : "normal" }`}} href="/">Home</a>     </small>
 <small className="nosm" onClick={()=>this.setState({navheight:"0px"})}><a className="nav-item nav-link" style={{padding:"2px",color:`${uri.indexOf("explore") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("explore") > -1 ? "bolder" : "normal" }`}} href="/explore">Explore Databank</a></small>
 <small className="nosm" onClick={()=>this.setState({navheight:"0px"})}><a className="nav-item nav-link" style={{padding:"2px",color:`${uri.indexOf("about") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("about") > -1 ? "bolder" : "normal" }`}} href="/#about">About</a></small>
 <small className="nosm" onClick={()=>this.setState({navheight:"0px"})}><a className="nav-item nav-link"  style={{padding:"2px",color:`${uri.indexOf("contact") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("contact") > -1 ? "bolder" : "normal" }`}} href="/#contact">Contact</a> </small>
 <small className="nosm" onClick={()=>this.setState({navheight:"0px"})}><a className="nav-item nav-link" style={{padding:"2px",color:`${uri.indexOf("login") > -1 || uri.indexOf("register") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("login") > -1 || uri.indexOf("register") > -1 ? "bolder" : "normal" }`}}  href="/login">Login/ Register</a> </small>
  </div>
 </div>
  <div className="collapse navbar-collapse" id="navbar">
    <div className="navbar-nav">
      <a className="nav-item nav-link"  style={{width:"100px",color:`${uri.indexOf("landing") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("landing") > -1 ? "bolder" : "normal" }`}} href="/"><small>Home</small></a>     
    
    <a className="nav-item nav-link mr-1" style={{width:"150px",color:`${uri.indexOf("explore") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("explore") > -1 ? "bolder" : "normal" }`}} href="/explore"><small>Explore Databank</small></a>
      <a className="nav-item nav-link mr-2" style={{width:"100px",color:`${uri.indexOf("about") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("about") > -1 ? "bolder" : "normal" }`}} href="/#about"><small>About</small></a>
      <a className="nav-item nav-link mr-5"  style={{width:"60px",color:`${uri.indexOf("contact") > -1 ? "orange" : "white" }`,fontWeight:`${uri.indexOf("contact") > -1 ? "bolder" : "normal" }`}} href="/#contact"><small>Contact</small></a>
      <a className="nav-item nav-link"  href="/login" style={{width:"30px",color:"white",float:'left'}}><span className="fas fa-user"></span></a>
    </div>
   
  </div>
</nav>
     </div>
         );
    }
}
 
export default Navbar;