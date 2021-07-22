import React, { Component } from 'react';
import axios from "axios"
import Cookie from "js-cookie"

class  ElectricalinfrastructureForm  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category:"",
            subcategory:"",
            description:"",
            rate:"",
            messagebox:"",
            messageboxclass:"d-none"
         }
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    submit=()=>{
        const data ={
            category:this.state.category,
            sub_category:this.state.subcategory,
            description:this.state.description,
            rate:this.state.rate
        }
        const token = Cookie.get("cyxpzz")
        const config ={
            headers:{Authorization: `Bearer ${token}`}
        }
        axios.post("https://niqsdatabank.herokuapp.com/api/v1/electricalinfrastructure",data,config)
        .then(res => {
            if(res.data.message && res.data.data){
            this.setState({messageboxclass:"alert-success",messagebox:res.data.message},()=>{
            this.setState({category:"",subcategory:"",description:"",rate:""})
            setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
        })
            }else{
                this.setState({messageboxclass:"alert-danger",messagebox:"Upload Failed"},()=>{
                    setTimeout(()=>this.setState({messagebox:"Upload Failed",messageboxclass:"d-none"}),5000)
                })
            }
    })
        .catch(err => this.setState({messageboxclass:"alert-danger",messagebox:err.message},()=>{
            setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
        }))
    }
    render() { 
        return (
            <div className="container">
                <div className="row">
                 <div className="col-12 mt-5">
                 <h2 className="text-primary">ELECTRICAL INFRASTRUCTURE</h2>
                 </div>
              </div>
              <div className="row">
              <div className="row mt-2">
             <div className={`col-12 mb-3 alert ${this.state.messageboxclass}`}>
                   <center>
                       <small style={{fontWeight:"bolder"}}>{this.state.messagebox}</small>
                   </center>
               </div>
             <div className="col-sm-12 col-md-6 mb-3">
                        Category : 
                        <input type="text" value={this.state.category} name="category" className="form-control" onChange={this.change}/>
                    </div>
                    <br/>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Sub-Category : 
                        <input type="text" value={this.state.subcategory} name="subcategory" className="form-control" onChange={this.change}/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                       description : 
                        <textarea name="description" value={this.state.description} cols="3" rows="3" className="form-control" onChange={this.change}></textarea>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Rate : 
                        <input type="text" value={this.state.rate} name="rate" onChange={this.change} className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3 mt-5">
                        <button onClick={this.submit} style={{float:"right"}} className="btn btn-primary">
                            Upload
                        </button>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        <button onClick={()=>alert("uploading csv")} style={{float:"right"}} className="btn btn-primary">
                            Upload CSV
                        </button>
                    </div>
             </div>
              </div>
            </div>
          );
    }
}
 
export default ElectricalinfrastructureForm ;