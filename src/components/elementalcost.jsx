import React, { Component } from 'react';
import deep17 from "./images/deep17.jpg"
import axios from "axios"
import logo from "./images/ligi.jpg"
import "../main.css"  
import {Link} from "react-router-dom"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import Cookie from "js-cookie"

class Elementalcost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            elemcost:[],
            category:"",
            subcat:"",
            location:"",
            filteredelemcost:[],
            downloaddisplay:"none"
         }
    }
    componentDidMount =()=>{
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/elementalcost`)
        .then(res => {
            let realdata = res.data.data
            let maindata = []
            realdata.map(d=>{
                if(maindata.length === 0){
                    maindata.push(d)
                              }
                     else if( maindata.find(p => p.month === d.month && p.project_category === d.project_category && p.project_type === d.project_type)){
                              return false;
                                   }else{
                      maindata.push(d)     
                                    }

            })
            this.setState({elemcost:maindata})
    console.log("res.data",res.data)})
        .catch(err=> console.log(err))
    }
    change =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const input = document.getElementById('table');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("elemcost.pdf");
          })
        ;
this.setState({downloaddisplay:"none"})
      }  
    showdata =()=>{
        const filteredelemcost =[]
        this.state.elemcost.map( cost =>{
if(this.state.location.toLowerCase() === cost.location.toLowerCase() && this.state.category.toLowerCase() === cost.project_category.toLowerCase() && this.state.subcat.toLowerCase() === cost.project_type.toLowerCase()){
                filteredelemcost.push(cost)
            }
        })
        this.setState({filteredelemcost})
    }
    render() { 
        const location =[]
        const category =[]
        const subcategory =[]
        this.state.elemcost.map(cat =>{
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
        console.log(this.state)
        /**
         *    <div className="row mt-3" style={{backgroundColor:"lightblue",color:"black"}}>
                     <div className="col-12 text-primary" style={{padding:"15px"}}>
                         <center>
                             <h2>ELEMENTAL COST ANALYSIS</h2>
                         </center>
                     </div>
                 </div>
         */
        return (
            <div>
            <div className="container" style={{width:"100%",height:"100%",overflow:"hidden"}}>
             <div className="row" style={{zIndex:"2",backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} className="img-responsive" src={`${deep17}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center>
                    <small style={{fontSize:"20px",fontWeight:"bold"}}>ELEMENTAL COST ANALYSIS-B</small>
                    <div className="mb-1" style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small style={{padding:'10px'}}>This is used for budgeting, cost planning and cost control of projects from inception to completion. It can also be used as a basis for advising Clients on future projects. This section covers different types of projects: Residential, Commercial, Educational, Religious, etc. Each Analysis page comprises a brief description of the project, its location, year of execution, gross floor area and elemental costs.</small> </div>
                    </center>
                    </div>                  
                 </div>
                 <br/>
                 <div  style={{padding:"0px 20px"}}>
                 <div className="row mt-3" style={{borderBottom:"2px solid lightgrey"}}>
                <div className="col-12 col-md-3"> 
                     <select name="location" className="form-control" id="location" onChange={this.change} value={this.state.location}>
               <option value="">Select Location</option>
              {location.map(state =>                 
               <option value={`${state}`}>{state}</option>
               )}
             </select><br/>
                     </div>    
                     <br/>
                     
                     <div className="col-12 col-md-3"> 
                     <select name="category" className="form-control" id="category" onChange={this.change} value={this.state.category}>
               <option value="">Select Project_Category</option>
              {category.map(cat =>                 
               <option value={`${cat}`}>{cat}</option>
               )}
             </select><br/>
                     </div>    
                     <br/>
                     <div className="col-12 col-md-3"> 
                     <select name="subcat" className="form-control" id="subcat" onChange={this.change} value={this.state.subcat}>
               <option value="">Select Project_Type</option>
              {subcategory.map(subcat =>                 
               <option value={`${subcat}`}>{subcat}</option>
               )}
             </select><br/>
                     </div>    
                     <br/>
                    
                     <div className="col-12 col-md-3 mb-5">
                         <button onClick={this.showdata} className="btn btn-primary " style={{float:"right"}}>
                             <small>
                                 Show Result
                             </small>
                         </button>
                     </div>
                 </div>
                 </div>
    <div id="table" style={{overflow:"auto"}}>
                 {this.state.filteredelemcost.length > 0 ? 
                 <div className="mb-2 mt-1" className="elemcostdiv" style={{display:"flex",flexWrap:"nowrap",borderBottom:"2px solid blue"}}>
                     <div style={{textTransform:"uppercase",fontWeight:"bold",width:"15%"}}>
                         
                     </div>
                     <div style={{textTransform:"uppercase",fontWeight:"bold",width:"15%"}}>
                       <center>
                       <p>Location</p>
                       </center>
                     </div>
                     <div style={{textTransform:"uppercase",fontWeight:"bold",width:"55%"}}>
                         <center>
                         <p>Building Project Description</p>
                         </center>
                     </div>
                     <div style={{textTransform:"uppercase",fontWeight:"bold",width:"15%"}}>
                         <center>
                         <p>GFA</p>
                         </center>
                     </div>
                 </div>
    : null}
                 {this.state.filteredelemcost.map(cat => 
                 <Link to={`/elementalcostanalysis/${cat.id}`} style={{color:"black",textDecoration:"none"}}>
                    <div className="mb-3 elemcostdiv" style={{display:"flex",flexWrap:"nowrap",padding:"10px 10px",borderBottom:"1px solid grey"}}>
                    <div style={{width:"15%"}}>
                       <center>
                       <img src={logo} alt="" style={{width:"80%",height:"90px"}}/>
                       </center>
                    </div>
                    <div style={{width:"15%"}}>
                        <center>
                        <p>{cat.location}</p>
                        </center>
                    </div>
                    <div style={{width:"55%"}}>
                        <p><center>
                        {cat.project_description}
                        </center>
                        </p>
                    </div>
                    <div style={{width:"15%"}}>
                       <center>
                       <p>{cat.gfa}</p>
                       </center>
                    </div>
                </div>
                </Link>
                    )}
                  
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
                {Cookie.get("cyxpzz") ?
                    <a href="/forms/elementalcost">
                    <button className="btn btn-primary" style={{float:"right"}}>
                       + Add Item
                    </button>
                    </a>
                    : null}
                </div>
             </div>
             </div>
         ); 
    }
}
 
export default Elementalcost;