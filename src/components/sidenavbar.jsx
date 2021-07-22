import React, { Component } from 'react';
import logo from "./images/laaga.png"
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"

class SideNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:false
          }
    }
    componentDidMount=()=>{
      
        if(!Cookies.get("cyxpax") || Cookies.get("cyxpax") !== "true"){
            this.setState({redirect:true})
        }  
    }
    logout =()=>{
        Cookies.remove("cyxpax")
        Cookies.remove("cyxpzz")
        this.setState({redirect:true})
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        const uri = window.location.href;
        return (
                <div style={{margin:"0",padding:"0",height:"100%",width:"100%",backgroundColor:"#003366",borderRadius:"10px"}}>
                    <div className="" style={{borderBottom:"1px solid lightgrey",cursor:"pointer"}}>
                                <a style={{color:`${uri.indexOf("home") > -1 ? "yellow" : "white"}`}} href="/admin/home">
                                <p style={{padding:"13px",textDecoration:"none"}}>Home <span style={{float:"right"}} className="fa fa-home"></span></p>
                                </a>
                    </div>
                    <div className="" style={{borderBottom:"1px solid lightgrey",cursor:"pointer"}}>
                                <a style={{color:`${uri.indexOf("manageusers") > -1 || uri.indexOf("manageuser") > -1 ? "yellow" : "white"}`}} href="/admin/manageusers">
                                <p style={{padding:"13px",textDecoration:"none"}}>Manage Users <span style={{float:"right"}} className="fa fa-user"></span></p>
                                </a>
                    </div>
                    <div className="" style={{borderBottom:"1px solid lightgrey",cursor:"pointer"}}>
                        <a style={{color:`${uri.indexOf("createuser") > -1 ? "yellow" : "white"}`}} href="/admin/createuser" >
           <p style={{padding:"10px",textDecoration:"none"}}>Create User <span style={{float:"right"}} className="fa fa-user-plus"></span></p>
               </a>
                 </div>
                    <div className="" style={{borderBottom:"1px solid lightgrey",cursor:"pointer"}}>
                    <a style={{color:`white`}} href="/explore" >
                                <p style={{padding:"10px",textDecoration:"none",color:"white"}}>Upload Data <span style={{float:"right"}} className="fa fa-cloud"></span></p>
                    </a>
                    </div>

                    <div className=" " style={{borderBottom:"1px solid lightgrey",cursor:"pointer"}}>
                                <a href="/admin/manageusers">
                                <p style={{padding:"10px",color:"white"}}>Download PDF <span style={{float:"right"}} className="fa fa-download"></span></p>
                                </a>
                    </div>
                    <div onClick={this.logout} style={{border:"1px solid lighgrey",cursor:"pointer"}}>
                                <p style={{padding:"20px",color:"white"}}>Log Out <span style={{float:"right"}} className="fa fa-sign-out-alt"></span></p>
                    </div>  
                </div>
          );
    }
}
 
export default SideNavbar;