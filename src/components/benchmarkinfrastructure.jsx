import React, { Component } from 'react';
import axios from "axios";
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import "jspdf-autotable"
import deep18 from "./images/deep18.jpg"
import logo from "./images/laaga.png"
import Cookie from "js-cookie"


class BenchmarkInfrastructure extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            infrastructure:[],
            newinfrastructure:[],
            location:"",
            category:"",
            subcat:"",
            downloaddisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | BENCHMARK FOR INFRASTRUCTURE';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/benchmarkinfrastructure`)
        .then(res => this.setState({infrastructure:res.data.data}),()=>{
            console.log(this.state.infrastructure)
        })
        .catch(err=> console.log(err))
    }
    change=(e)=>{
       this.setState({[e.target.name]:e.target.value},()=>{
           const newinfrastructure =[]
           this.state.infrastructure.map(cat =>{
            if((this.state.subcat.length === 0 && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat.length === 0 && this.state.category.length === 0 && this.state.location.length > 0 && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat.length> 0 && cat.sub_category.toLowerCase() === this.state.subcat.toLowerCase() && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase())){
                   newinfrastructure.push(cat)
               }
           })
           this.setState({newinfrastructure})
       })
    }
    clearfilter=()=>{
        this.setState({category:"",location:"",subcat:"",newinfrastructure:[]})
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        const d = new Date()
        var image = new Image();
              image.src = logo;
            doc.addImage(image, 'PNG',20, 0, 40, 30); 
                doc.setFontSize(20);
                doc.text("Benchmarks For Infrastructural Works",70,30)
        doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
        doc.setFontSize(8);
        doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
        doc.save("benchmarksforinfrastructuralworks.pdf")
        this.setState({downloaddisplay:"none"})
      } 
    render() { 
        const headers=["S/No","Location", "Item","Unit", "Rate"]
        const category =[]
        const subcategory=[]
        const states =[]
        this.state.infrastructure.map(cat=>{       
          if(!states.includes(cat.location)){
         states.push(cat.location)
          }  
          if(!category.includes(cat.category) && cat.location === this.state.location){
            category.push(cat.category)
             }         
          if(!subcategory.includes(cat.sub_category) && cat.category === this.state.category){
          subcategory.push(cat.sub_category)
          }
        })
        return ( 
            <div className="container" style={{textTransform:"capitalize"}}>
              <div className="row" >
              <div className="col-12" >
                      <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                         <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} src={`${deep18}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>BENCHMARK FOR INFRASTRUCTURAL WORKS</small><br/>
                    <div className="lgpadding mb-1" style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small >Gives cost per Km of Roads, Rail Lines, High Tension Transmission Lines, etc.</small> </div>
                    </div>
                    </center>
                    </div>   
                      </div>
                  </div>
                <div className="col-12 mt-3">
                <div className="row"> 
                     <div className="col-12 col-md-2">
                     </div>    
                     <div className="col-12 col-md-3">
                     <select name="location" className="form-control" onChange={this.change} value={this.state.location}>
               <option value="">Select Location</option>
              {states.map(state =>                 
               <option value={`${state}`}>{state}</option>
               )}
             </select><br/>
                     </div>
                    
                     <br/><br/>
                     <div className="col-12 col-md-3">
                     <select name="category" className="form-control" id="category" onChange={this.change} value={this.state.category}>
               <option value="">Select Category</option>
              {category.map(cat =>                 
               <option value={`${cat}`}>{cat}</option>
               )}
             </select><br/>
                     </div>
                     <br/>
                     <div className="col-6 col-md-3" style={{display:`${this.state.filterheight === "100%" ? "none" : "block"}`}}>
       <button onClick={this.clearfilter} className="btn btn-primary">Clear Filter</button>
         </div><br/> 
                 </div>
                 <table className="table table-striped table-bordered mt-2" id="table">
                <thead>
                <tr style={{backgroundColor:"orange",color:"white"}}>
                   {headers.map(header=>
                    <th style={{fontSize:"13px",fontWeight:"normal"}}>{header}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                        {this.state.newinfrastructure.length > 0 ?
                       this.state.newinfrastructure .map((basic,index) => 
                       basic.isApproved ?
                             <tr>                     
                      <td >{index + 1}</td>
                      <td>{basic.location}</td>
                      <td style={{fontSize:"14px"}}>{basic.item}</td> 
                         <td >{basic.unit}</td>  
                         <td >{basic.rate}</td>  
                          </tr>    
                          : null                 
                            )  :
                            this.state.infrastructure .map((basic,index) => 
                            basic.isApproved ?
                                <tr>                     
                           <td >{index + 1}</td>
                      <td>{basic.location}</td>
                      <td style={{fontSize:"14px"}}>{basic.item}</td> 
                         <td >{basic.unit}</td>  
                         <td >{basic.rate}</td>                 
                             </tr>      
                             : null               
                               ) 
                            }
                   
                </tbody>
                </table>
                </div>
                     </div>    


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
                    <a href="/forms/benchmarkinfrastructureform">
                    <button className="btn btn-primary" style={{float:"right"}}>
                       + Add Item
                    </button>
                    </a>
                    : null}
                </div>
            </div>
         );
    }
    }

 
export default BenchmarkInfrastructure;