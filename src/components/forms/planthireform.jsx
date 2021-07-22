import axios from 'axios';
import React, { Component } from 'react';
import deep4 from "../images/deep4.jpg"
import {states} from "../state"
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom"

class PlantHireForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category:"",
            location:"",
            description:"",
            rate:"",
            messagebox:"",
            messageboxclass:"d-none",
            uploadcsv:false,
            csv:null
         }
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            console.log(this.state)
        })
    }
    uploadcsv=()=>{
        this.setState({uploadcsv:true})
    }
    filechange=(e)=>{
        this.setState({csv:e.target.files[0]})
    }
    submitcsv=()=>{
        if(this.state.csv === null){
            alert("Please Select a file for Upload")
         }else{
        console.log("sending")
        const token = Cookie.get("cyxpzz")
        if(!token){
            this.setState({redirect:true})
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var formData = new FormData();
formData.append("file",this.state.csv);
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/planthirerate/import`,formData,config)
        .then(res => {
            if(res.data.message && res.data.data){
                this.setState({messagebox:res.data.message,messageboxclass:"alert-success"},()=>{
                    window.scrollTo(0,  0)
            this.setState({csv:null})
       setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)               
})
            }else{
             this.setState({redirect:true})
            }
        })
        .catch(err=> {
            this.setState({messagebox:"Upload Failed",messageboxclass:"alert-danger"},()=>{
                 window.scrollTo(0,  0)
                setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
            })
        })
        console.log("sent")
    }
    }
    submit=()=>{
        const data={
            category:this.state.category,
            location:this.state.location,
            description:this.state.description,
            rate:this.state.rate
        }
        const token = Cookie.get("cyxpzz")
        if(!token){
            this.setState({redirect:true})
        }
        const config={
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.post("https://niqsdatabank.herokuapp.com/api/v1/planthirerate",data,config)
        .then(res=> { 
            if(res.data.message && res.data.data){ 
                this.setState({messagebox:res.data.message,messageboxclass:"alert-success"},()=>{
            this.setState({item:"",category:"",subcategory:"",unit:"",rate:""})
            setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
        })}else{
       this.setState({redirect:true})
        }
     })
        .catch(err => this.setState({messagebox:err.message,messageboxclass:"alert-danger"},()=>{
            setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
        }))
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        return ( 
            <div className="container">
                 <div className="row">
                 <div className="col-12 mt-5">
                 <h2 className="text-primary">PLANT HIRE RATE</h2>
                 </div>               
                 </div>
                 <div className="row" style={{display:`${this.state.uploadcsv ? "none" : ""}`}}>
                 <div className={`col-12 mb-3 alert ${this.state.messageboxclass}`}>
                   <center>
                       <small style={{fontWeight:"bolder"}}>{this.state.messagebox}</small>
                   </center>
               </div>
                 <div className="col-sm-12 col-md-6 mb-3">
                        Category : 
                        <input type="text" onChange={this.change} value={this.state.category} name="category" className="form-control"/>
                    </div>
                    <br/>
                    <div className="col-sm-12 col-md-6 mb-3">
                       Location : 
     <select name="location" className="form-control"  onChange={this.change} value={this.state.location}>
               <option value="">Select Location</option>
              {states.map(state =>                 
               <option value={`${state.state.name}`}>{state.state.name}</option>
               )}
             </select><br/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                       description : 
                        <input type="text" onChange={this.change} name="description" value={this.state.description} className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Rate|8 hrs|day: 
                        <input type="text" name="rate" value={this.state.rate} onChange={this.change} className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3 mt-5">
                        <button style={{float:"right"}} onClick={this.submit} className="btn btn-primary">
                            Upload
                        </button>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        <button onClick={this.uploadcsv} style={{float:"right"}} className="btn btn-primary">
                            Upload CSV
                        </button>
                    </div>
                 </div>
                 <div className="row" style={{display:`${this.state.uploadcsv ? "" : "none"}`}}>
                 <div className="col-1 mt-4">
                  <span className="fa fa-chevron-left" style={{color:"grey",fontSize:"20px",fontWeight:"bold"}} onClick={()=>this.setState({uploadcsv:false})}></span>
              </div>     
              <div className="col-11 mt-3">
                  <input type="file" name="csv" onChange={this.filechange} className="form-control"/><br/><br/>
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                  <button onClick={this.submitcsv} style={{float:"right"}}  className="btn btn-primary">
                      Upload CSV
                  </button>
              </div>
          </div>
            </div>
         );
    }
}
 
export default PlantHireForm;