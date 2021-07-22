import React, { Component } from 'react';
import {states} from "../state"
import axios from "axios"
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom"

class CostIndicesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messagebox:"",
            uploadcsv:false,
            csv:null,
            redirect:false,
            messageboxclass:"d-none alert-primary",
            city:null,
            cement:null,
            sharp_sand:null,
            granite:null,
            laterite:null,
            hardcore:null,
            ht_rods:null,
            brc_mesh:null,
            blocks:null,
            alum_roofing:null,
            flush_door:null,alum_window:null,floor_tiles:null,wall_tiles:null,pop_ceiling:null,emul_paint:null,average:null
          }
    }
    uploadcsv=()=>{
        this.setState({uploadcsv:true})
    }
    change=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>{
        console.log(this.state)
    })
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
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/costindices/import`,formData,config)
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
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        //state=kaduna& description=air absorbers&measurement=unit&unit=FM2&month=june&year=2006&price=7600& sub_category=organic stone&category=air absorbers&id=12
        const data ={
            location:this.state.city,
            cement:this.state.cement,
            sharp_sand:this.state.sharp_sand,
            granite:this.state.granite,
            laterite:this.state.laterite,
            hardcore:this.state.hardcore,
            ht_rods:this.state.ht_rods,           
            brc_mesh:this.state.brc_mesh,
            blocks:this.state.blocks,
            alum_roofing:this.state.alum_roofing,
            flush_door:this.state.flush_door,
            alum_window:this.state.alum_window,
            floor_tiles:this.state.floor_tiles,
            wall_tiles:this.state.wall_tiles,
            pop_ceiling:this.state.pop_ceiling,           
            emul_paint:this.state.emul_paint,
          average:2
     }
        axios.post(`https://niqsdatabank.herokuapp.com/api/v1/costindices`,data,config)
        .then(res => {
           if(res.data.message && res.data.data){
            this.setState({messagebox:res.data.message,messageboxclass:"alert-success"},()=>{
            this.setState({city:"",cement:"",sharp_sand:"",granite:"", laterite:"", hardcore:"", ht_rods:"", brc_mesh:"", blocks:"", alum_roofing:"",
 flush_door:"", alum_window:"", floor_tiles:"", wall_tiles:"", pop_ceiling:"",emul_paint:"",average:""})
    setTimeout(()=>this.setState({messageboxclass:"d-none"}),5000)
        })   
    } else{
     this.setState({redirect:true})
    }
})
        .catch(err=> this.setState({messagebox:err.message,messageboxclass:"alert-danger"},()=>{
            setTimeout(()=>this.setState({messageboxclass:"d-none"}),5000)
        }))
        console.log("sent")
    }
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        return ( 
        <div className="container">
            <br/>
           <div className="row">
           <div className="col-12 mt-5">
                 <h2 className="text-primary">COST INDICES</h2>
                 </div>
               <br/>
               <div className={`col-12 alert ${this.state.messageboxclass}`}>
                   <center>
                       <small style={{fontWeight:"bolder"}}>{this.state.messagebox}</small>
                   </center>
               </div>
               </div>
               <div className="row" style={{display:`${this.state.uploadcsv ? "none" :""}`}}>
               <div className="col-12 col-md-4 col-lg-3">
                   <br/>
               <select name="city" className="form-control" id="city" onChange={this.change} value={this.state.city}>
               <option value="">Select City</option>
              {states.map(state =>                 
               <option value={`${state.state.name}`}>{state.state.name}</option>
               )}
             </select><br/>
               </div><br/>
               <div className="col-12 col-md-4 col-lg-3">
                   <p style={{margin:"0px",margin:"0px"}}>Cement Cost <small> (per bag)</small> :</p>
                   <input type="number" className="form-control"  onChange={this.change} name="cement" value={this.state.cement}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Sharp Sand Cost <small>(per m3)</small> :</p>
                   <input type="number" className="form-control"  onChange={this.change} name="sharp_sand" value={this.state.sharp_sand}/>
              <br/> </div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Granite Cost <small>(per m3)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="granite" value={this.state.granite}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Laterite Cost <small>(per m3)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="laterite" value={this.state.laterite}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Hardcore Cost <small>(per m3)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="hardcore" value={this.state.hardcore}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>HT Rods Cost <small>(per Tonne)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="ht_rods" value={this.state.ht_rods}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>BRC MESH <small>(per roll of 30m2)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="brc_mesh" value={this.state.brc_mesh}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>230mm Blocks <small>(per No)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="blocks" value={this.state.blocks}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>ALUM Roofing<small>(per m2)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="alum_roofing" value={this.state.alum_roofing}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Flush Door <small>(per No)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="flush_door" value={this.state.flush_door}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Alum Window <small>(600 x 600mm)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="alum_window" value={this.state.alum_window}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Floor Tiles <small>(per m2)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="floor_tiles" value={this.state.floor_tiles}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Wall Tiles <small>(per m2)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="wall_tiles" value={this.state.wall_tiles}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>POP Ceiling <small>(per No)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="pop_ceiling" value={this.state.pop_ceiling}/>
               <br/></div>
               <div className="col-12 col-md-4 col-lg-3">
               <p style={{margin:"0px",margin:"0px"}}>Emul Paint <small>(per 20 litre drum)</small> :</p>
                   <input type="number" className="form-control" onChange={this.change} name="emul_paint" value={this.state.emul_paint}/>
               <br/></div>
               
               <div className="col-12 col-md-4 col-lg-3">
                   <center>
                <button onClick={this.submit} className="btn btn-primary">
                    Upload
                </button>
                </center>
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
 
export default CostIndicesForm;