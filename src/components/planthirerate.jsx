import React, { Component } from 'react';
import axios from "axios"
import deep13 from "./images/deep13.jpg"
import jsPDF from "jspdf"
import "jspdf-autotable"
import logo from "./images/laaga.png"
import Cookie from "js-cookie"

class PlantHire extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            planthire:[],
            newplanthire:[],
            category:"",
            location:"",
            downloaddisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | PLANT HIRE RATES';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/planthirerate`)
        .then(res => this.setState({planthire:res.data.data}),()=>{
            console.log(this.state.planthire)
        })
        .catch(err=> console.log(err))
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            const newplanthire=[]
            this.state.planthire.map(cat=>{
                if((this.state.category.length === 0 && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (cat.location.toLowerCase() === this.state.location.toLowerCase() && cat.category !== null && cat.category.toLowerCase() === this.state.category.toLowerCase())){
                    newplanthire.push(cat)
                }
            })
            this.setState({newplanthire})
        })
    }
    clearfilter=()=>{
        this.setState({location:"",category:"",newplanthire:[]})
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        const d = new Date()
        var image = new Image();
              image.src = logo;
            doc.addImage(image, 'PNG',20, 0, 40, 30); 
                doc.setFontSize(20);
                doc.text("Plant Hire Rates",70,30)
        doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
        doc.setFontSize(8);
        doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
        doc.save("planthirerates.pdf")
        this.setState({downloaddisplay:"none"})
      }  
    render() { 
        const headers =["S/No","Location", "Description","Rate|8Hr|Day"]
         const states=[]
         const category=[]
         this.state.planthire.map(cat =>{
        if(!states.includes(cat.location)){
            states.push(cat.location)
           }         
           
         if(!category.includes(cat.category) && cat.location === this.state.location){
        category.push(cat.category)
         }  
        })
        return ( 
            <div className="container">
                             <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} src={`${deep13}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>PLANT HIRE RATES</small><br/>
                    <div style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small>This covers the cost of hiring heavy plant for civil works, mixers, compressors, dumpers, cranes, etc.</small> </div>
                    <small style={{fontSize:"11px"}}>Click the filter button to display more advanced option parameters</small>
                    </div>
                    </center>
                    </div>                  
                 </div>
                <div className="row mt-3">
                <div className="col-12 col-md-3">
                     <select name="location" className="form-control" id="location" onChange={this.change} value={this.state.location}>
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
                     <br/><br/>
                     <div className="col-12 col-md-3">
                     <button onClick={this.clearfilter} className="btn btn-primary">
                         Clear filter
                         </button>
                     </div><br/><br/>
                </div>
                 <table className="table table-striped table-bordered" id="table">
                <thead>
                <tr style={{backgroundColor:"orange",color:"white"}}>
                   {headers.map(header=>
                    <th style={{fontSize:"13px",fontWeight:"normal"}}>{header}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                        {this.state.newplanthire.length > 0 ?
                       this.state.newplanthire.map((basic,index) => 
                            basic.isApproved ?  
                                 <tr>
                        <td>{index + 1}</td>                    
                      <td >{basic.location}</td> 
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                         <td >{basic.rate}</td>    
                         </tr>    
                         : null                           
                            )  :
                            this.state.planthire.map((basic,index) => 
                                basic.isApproved ?  
                                 <tr>
                        <td>{index + 1}</td>                    
                           <td >{basic.location}</td> 
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                         <td >{basic.rate}</td>   
                         </tr>
                         : null                     
                               ) 
                            }
                   
                </tbody>
                </table>
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
                    <a href="/forms/planthirerate">
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
 
export default PlantHire;