import React, { Component } from 'react';
import {states} from "../state"
import axios from "axios"
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom"

class ConstantForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category:"",
            code:"",
            description:"",
            output:"",
            slow:"",
            fast:"",
            average:"",
            messagebox:"",
            messageboxclass:"d-none",
            redirect:false,
            uploadcsv:false,
            csv:null,
            otheroutputdisplay:"none"
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
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/constant/import`,formData,config)
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
            description:this.state.description,
            code:this.state.code,
            output:this.state.output,           
            category:this.state.category,
            slow:this.state.slow,
            fast:this.state.fast,
            average:this.state.average
        }
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/constant`,data,config)
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
                 <h2 className="text-primary">Constants</h2>
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
                        Category : 
                        <input type="text" value={this.state.category}  onChange={this.change} name="category" className="form-control"/>
                    </div>
                    <br/>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Code : 
                        <input type="text" name="code" value={this.state.code} onChange={this.change} className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Description : 
                        <textarea name="description" cols="5" rows="3" value={this.state.description} onChange={this.change} className="form-control"></textarea>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3">
                        Output: 
                        <input type="text"  onChange={this.change} value={this.state.output} name="output" className="form-control"/>
                    </div>
                    <div className="col-12">
                       <p style={{cursor:"pointer"}} onClick={()=>this.state.otheroutputdisplay === "none" ?this.setState({otheroutputdisplay:"block"}) : this.setState({otheroutputdisplay:"none"})}>Other Outputs <span className="ml-3 fa fa-chevron-down"></span></p>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3" style={{display:`${this.state.otheroutputdisplay}`}}>
                        slow : 
                        <input type="number" name="slow" value={this.state.slow} onChange={this.change} className="form-control"/>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3" style={{display:`${this.state.otheroutputdisplay}`}}>
                        average : 
                        <input name="average" type="number" value={this.state.average} onChange={this.change} className="form-control"></input>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-3" style={{display:`${this.state.otheroutputdisplay}`}}>
                        fast: 
                        <input type="number"  onChange={this.change} value={this.state.fast} name="fast" className="form-control"/>
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
 
export default ConstantForm;
