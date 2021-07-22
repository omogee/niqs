import React, { Component } from 'react';
import {states} from "../state"
import axios from "axios"
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom"

class BasicPriceForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            state:"",
            category:"",
            subcategory:"",
            description:"",
            measurement:"",
            unit:"",
            month:"",
            year:"",
            price:null,
            messagebox:"",
            messageboxclass:"d-none",
            redirect:false,
            uploadcsv:false,
            csv:null
         }
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            console.log(this.state)
        })
    }
    uploadcsv =()=>{
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
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/basicpricelist/import`,formData,config)
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
        console.log("sending")
        const token = Cookie.get("cyxpzz")
        if(!token){
            this.setState({redirect:true})
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const data ={
            location:this.state.state,
            description:this.state.description,
            measurement:this.state.measurement,
            unit:this.state.unit,
            month:this.state.month,
            year:this.state.year,
            price:this.state.price,           
            sub_category:this.state.subcategory,
            category:this.state.category
        }
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/basicpricelist`,data,config)
        .then(res => {
            if(res.data.message && res.data.data){
                this.setState({messagebox:res.data.message,messageboxclass:"alert-success"},()=>{
                    window.scrollTo(0,  0)
 this.setState({state:"",description:"",measurement:"",unit:"",month:"",year:"",price:"",sub_category:"",category:""})
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
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        let year = 1970
        let years = []
        let dummyArray = new Array(52).fill(undefined)
        dummyArray.map((array,i)=>{
                years.push(year+i)
        })
        const months =["january","february","march","april","may","june","july","august","september","october","november","december"]
        return ( 
            <div className="container">
                 <div className="row">
                 <div className="col-12 mt-5">
                 <h2 className="text-primary">BASIC PRICE LIST</h2>
                 </div>               
                 </div>
                <div className="row">
                <div className={`col-12 mb-2 alert ${this.state.messageboxclass}`}>
                   <center>
                       <small style={{fontWeight:"bolder"}}>{this.state.messagebox}</small>
                   </center>
               </div>
                </div>
                 <div className="row mt-3" style={{display:`${this.state.uploadcsv ? "none" : ""}`}}>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Location : <br/>
                        <select name="state" className="form-control" onChange={this.change} value={this.state.state}>
               <option value="">Select location</option>
              {states.map(state =>                 
               <option value={`${state.state.name}`}>{state.state.name}</option>
               )}
             </select><br/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Category : 
                        <input type="text"  onChange={this.change} name="category" className="form-control"/>
                    </div>
                    <br/>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Sub-Category : 
                        <input type="text" name="subcategory"  onChange={this.change} className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Description : 
                        <textarea name="description" cols="5" rows="3"  onChange={this.change} className="form-control"></textarea>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Measurement: 
                        <input type="number"  onChange={this.change} name="measurement" className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Unit: 
                        <input type="text"  onChange={this.change} name="unit" className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Price: 
                        <input type="number"  onChange={this.change} name="price" className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Month : 
                        <select name="month" className="form-control"  onChange={this.change} value={this.state.month}>
               <option value="">Select year of Completion</option>
              {months.map(month =>                 
               <option value={`${month}`}>{month}</option>
               )}
             </select>
                  <br/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Year : 
                  <select name="year" className="form-control"  onChange={this.change} value={this.state.year}>
               <option value="">Select year of Completion</option>
              {years.map(year =>                 
               <option value={`${year}`}>{year}</option>
               )}
             </select>
                  <br/>
                    </div>
                        <div className="col-sm-12 col-md-6 mb-3">
                        <button onClick={this.submit} style={{float:"right"}} className="btn btn-primary">
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
                        <input type="file" name="csv" className="form-control" onChange={this.filechange}/><br/><br/>
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
 
export default BasicPriceForm;