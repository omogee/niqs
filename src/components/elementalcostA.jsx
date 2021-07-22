import React, { Component } from 'react';
import deep17 from "./images/deep17.jpg"
import axios from "axios"
import logo from "./images/ligi.jpg"
import "../main.css"  
import jsPDF from "jspdf"
import "jspdf-autotable"


class Elementalcost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            elemcost:[],
            category:"",
            subcat:"",
            location:"",
            elemcost:{},
            allelemcost:[],
            downloaddisplay:"none"
         }
    }
    /**
     *  let maindata =[]
            res.data.data.map(d =>{
                if(d.location === id){
                  maindata.push(d)
                }
            })
     */
    componentDidMount =()=>{
        const id= this.props.match.params.id
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/elementalcost/${id}`)
        .then(res => {
            this.setState({elemcost:res.data.data},()=>{
                axios.get(`https://niqsdatabank.herokuapp.com/api/v1/elementalcost`)
                .then(res=> this.setState({allelemcost:res.data.data}))
                .catch(err =>console.log(err))
            })
    console.log("res.data",res.data.data)})
        .catch(err=> console.log(err))
    }
    change =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    showdata =()=>{
        const filteredelemcost =[]
        this.state.elemcost.map( cost =>{
            if(this.state.location === cost.location && this.state.category === cost.project_category && this.state.subcat === cost.project_type){
                filteredelemcost.push(cost)
            }
        })
        this.setState({filteredelemcost})
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        doc.text("Elemental Cost Analysis-C",14,30)
doc.autoTable({startY:35, html: '#table',margin: { top: 10 }, })
doc.save("elementalcost_c.pdf")
this.setState({downloaddisplay:"none"})
      }  
    render() { 
        let id = 0
        let indexer = 0
        const resetindexer=()=>{
           return indexer = 0
        }
        const location =[]
        const category =[]
        const subcategory =[]
      /*  this.state.elemcost.map(cat =>{
            if(!location.includes(cat.location)){
                location.push(cat.location)
            }
            if(!category.includes(cat.project_category) && cat.location === this.state.location){
                category.push(cat.project_category)
            }
            if(!subcategory.includes(cat.project_type) && cat.location === this.state.location && cat.project_category === this.state.category){
                subcategory.push(cat.project_type)
            }
        })
        */
        console.log(this.state)
       const headers =["S/N", "ELEMENT","ELEMENTAL COST","COST PER M2 of GFA"]
        return (
            <div className="container" style={{width:"100%"}}>
             <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} className="img-responsive" src={`${deep17}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center>
                    <small style={{fontSize:"20px",fontWeight:"bold"}}>ELEMENTAL COST ANALYSIS-C</small>
                    <div className="mb-1" style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small style={{padding:'10px'}}>This is used for budgeting, cost planning and cost control of projects from inception to completion. It can also be used as a basis for advising Clients on future projects. This section covers different types of projects: Residential, Commercial, Educational, Religious, etc. Each Analysis page comprises a brief description of the project, its location, year of execution, gross floor area and elemental costs.</small> </div>
                    </center>
                    </div>                  
                 </div>
                 <br/>
                 <div className="row mt-3" style={{borderBottom:"2px solid grey"}}>
                <div className="col-12 col-md-3"> 
                     <select name="location" className="form-control" id="location" onChange={this.change} value={this.state.location}>
               <option value="">Select Location</option>
              {location.map(state =>                 
               <option value={`${state}`}>{state}</option>
               )}
             </select><br/>
                     </div>    
                     <div className="col-12 col-md-3"> 
                     <select name="category" className="form-control" id="category" onChange={this.change} value={this.state.category}>
               <option value="">Select Project_Category</option>
              {category.map(cat =>                 
               <option value={`${cat}`}>{cat}</option>
               )}
             </select><br/>
                     </div>    
                   
                     <div className="col-12 col-md-3"> 
                     <select name="subcat" className="form-control" id="subcat" onChange={this.change} value={this.state.subcat}>
               <option value="">Select Project_Type</option>
              {subcategory.map(subcat =>                 
               <option value={`${subcat}`}>{subcat}</option>
               )}
             </select><br/>
              </div>    

                     <div className="col-12 col-md-3">
                         <button onClick={this.showdata} className="btn btn-primary " style={{float:"right"}}>
                             <small>
                                 show analysis
                             </small>
                         </button>
                     </div>
                 </div>
                
                 <div className="row mt-3 bg-primary" style={{color:"white"}}>
                     <div className="col-12" style={{padding:"10px"}}>
                         <center>
                             <h2>ELEMENTAL COST ANALYSIS</h2>
                         </center>
                     </div>
                 </div>
                <div className="flexer">
                    <div className="widthtwentyfive">
                    <small style={{color:"rgba(41, 82, 163,0.3)",fontWeight:"bold",fontSize:"14px"}}>Category :</small>                  
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className="text-primary ml-2">{this.state.elemcost.project_category}</small>
                    </div>
                    <div className="widthfifty" style={{display:"flex"}}>
                    <div style={{width:"20%"}}>
                    <small style={{color:"rgba(41, 82, 163,0.3)",fontWeight:"bold",fontSize:"14px"}}>Building Type :</small>                  
                    </div>
                    <div style={{width:"80%"}}>
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className="text-primary ml-2">{this.state.elemcost.project_type}</small>
                    </div>
                    </div>
                    <div className="widthtwentyfive">
                    <small style={{fontSize:"14px",color:"rgba(41, 82, 163,0.3)",fontWeight:"bold"}}>Gross Floor Area (GFA/m2):</small>                  
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className="text-primary ml-2"> {this.state.elemcost.gfa} </small>
                    </div>
                </div>
                <div className="flexer">
                    <div style={{width:"100%",display:"flex"}}> 
                        <div className="prodes">
                        <small style={{fontSize:"15px",fontWeight:"bold",color:"rgba(41, 82, 163,0.3)",fontWeight:"bold"}}>Brief Project Description :</small>
                        </div>
                       <div className="prodesdes">
                       <small className="ml-2 text-primary" style={{fontWeight:"bold",textAlign:"left",fontSize:"17px"}}>{this.state.elemcost.project_description}</small>
                       </div>
                    </div>
                </div>
                <div className="flexer">
                    <div className="widththirty">
                    <small style={{fontSize:"14px",color:"rgba(41, 82, 163,0.3)",fontWeight:"bold"}}>Type Of Client :</small>                  
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className="text-primary ml-2">{this.state.elemcost.client_type}</small>
                    </div>
                    <div className="widththirty">
                    <small style={{fontSize:"14px",color:"rgba(41, 82, 163,0.3)",fontWeight:"bold"}}>Location :</small>                  
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className="text-primary ml-2">{this.state.elemcost.location}</small>
                    </div>
                    <div className="widththirty">
                    <small  style={{color:"rgba(41, 82, 163,0.3)",fontWeight:"bold",fontSize:"14px"}}>Duration (Weeks):</small>                  
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className="text-primary ml-2"> {this.state.elemcost.duration} </small>
                    </div>
                </div>
                <div className="flexer mb-5">
                    <div className="widththirty">
                    <small  style={{color:"rgba(41, 82, 163,0.3)",fontWeight:"bold",fontSize:"14px"}}>Year Completed/Ongoing :</small>                  
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className="ml-2 text-primary">{this.state.elemcost.year_completed}</small>
                    </div>
                   
                    <div className="widthfifty">
                    <small  style={{color:"rgba(41, 82, 163,0.3)",fontWeight:"bold",fontSize:"14px"}}>Exchange Rate AT Award/Competition:</small>                  
                    <small style={{fontWeight:"bold",fontSize:"16px"}} className=" ml-2 text-primary"> {this.state.elemcost.rate} </small>
                    </div>
                </div>
                <div  style={{overflow:"auto"}}>
                <table className="table table-striped table-bordered elemcostdiv" id="table">
                <thead>
                <tr style={{color:"white"}} className="bg-primary">
                   {headers.map(header=>
                    <th style={{fontSize:"13px",fontWeight:"normal"}}>{header}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                 {this.state.allelemcost.map((cost,index) =>
               cost.elemental_cost === null ?
                            <tr>                                                         
         <td  style={{fontWeight:`${cost.elemental_cost === null ? "bolder": "normal"}`}}>{index !== 0 ? id = id + 1 : 0}{`,${indexer = 0}`}</td>
               <td style={{fontWeight:`${cost.elemental_cost === null ? "bolder": "normal"}`}}>{cost.element}</td> 
                 <td></td>
                  <td> </td>
                  
                 </tr>
                
                  :
                  <tr>
 <td >{`${id},${cost.elemental_cost !== null ? indexer=indexer + 1 : 0}`}</td>
                 <td style={{fontWeight:`${cost.elemental_cost === null ? "bolder": "normal"}`}}>{cost.element}</td> 
                   <td style={{fontSize:"14px"}}>{cost.elemental_cost}</td>
                    <td >{cost.gfa}</td>
                 </tr>
                    )}         
                   
                </tbody>
                </table>
                </div>
                 <br/><br/><br/><br/>
                 <div className="row">
                    <div className="col-12">                    
                    <button className="btn btn-primary" onClick={this.downloadtable} style={{float:"right",clear:"both"}}>
                        Download pdf <small><span className="fa fa-chevron-down ml-1"></span></small>
                    </button><br/><br/>
                    <span style={{display:`${this.state.downloaddisplay}`,float:"right"}}><small>downloading pdf...</small></span>
                </div>
                </div>
                <br/><br/>
                <div>
                    <a href="/forms/elementalcost">
                    <button className="btn btn-primary" style={{float:"right"}}>
                       + Add Item
                    </button>
                    </a>
                </div>
             </div>
         ); 
    }
}
 
export default Elementalcost;