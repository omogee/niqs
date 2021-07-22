import React, { Component } from 'react';
import deep12 from "./images/deep12.jpg"
import axios from "axios"
import ReactHtmlParser from "react-html-parser"
import jsPDF from "jspdf"
import "jspdf-autotable"
import logo from "./images/laaga.png"
import Cookie from "js-cookie"

class LabourRates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            labourrates:[],
            category:"",
            location:"",
            newlabourrate:[],
            downloaddisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | LABOUR RATES';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/labourrate`)
        .then(res => this.setState({labourrates:res.data.data}),()=>{
            console.log(this.state.labourrates)
        })
        .catch(err=> console.log(err))
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            const newlabourrate=[]
            this.state.labourrates.map(cat=>{
                if((cat.category !== null && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowercase() === this.state.location.toLowercase()) || (this.state.category.length === 0 && cat.category !== null && cat.location.toLowerCase() === this.state.location.toLowerCase())){
                    newlabourrate.push(cat)
                }
            })
            this.setState({newlabourrate})
        })
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        const d = new Date()
        var image = new Image();
              image.src = logo;
            doc.addImage(image, 'PNG',20, 0, 40, 30); 
                doc.setFontSize(20);
                doc.text("Labour Rates",70,30)
        doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
        doc.setFontSize(8);
        doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
        doc.save("labourrates.pdf")
        this.setState({downloaddisplay:"none"})
      }  
      clearfilter=()=>{
        this.setState({location:"",category:"",newlabourrate:[]})
    }
    render() { 
        const category =[]
        const states =[]
        const headers =["S/No","Location","Description","Qualified Artisian","Labourer","Rate"]
        this.state.labourrates.map(cat=>{
          if(!states.includes(cat.location)){
                 states.push(cat.location)
                }  
              if(!category.includes(cat.category) && cat.location  === this.state.location){
             category.push(cat.category)
              }                 
            })
            console.log(this.state)
        return ( 
            <div className="container">
                     <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} src={`${deep12}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>LABOUR RATES</small><br/>
                    <div style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small>{ReactHtmlParser(`This is classified under two headings: <ul> <li><b>*</b>Informal sector which covers daily wages paid ... </li> <li><b>*</b>Formal sector covers wages paid by established construction companies which comprises the basic wage rate plus allowances. </li>The rates are based on the latest NJIC Agreement.</ul>`)} </small> </div>
                    <small style={{fontSize:"11px"}}>Click the filter button to display more advanced option parameters</small>
                    </div>
                    </center>
                    </div>                  
                 </div>
                 <div className="row mt-3">
                 <div className="col-12 col-md-4">
                   <select name="location" className="form-control" id="location" onChange={this.change} value={this.state.location}>
             <option value="">Select Location</option>
            {states.map(state =>                 
             <option value={`${state}`}>{state}</option>
             )}
           </select><br/>
                   </div>    
                   <br/><br/>
                   <div className="col-12 col-md-4">
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
                 <div className="row mt-3">
                 <table className="table table-striped table-bordered" id="table">
                <thead>
                <tr style={{backgroundColor:"orange",color:"white"}}>
                   {headers.map(header=>
                    <th style={{fontSize:"13px",fontWeight:"normal"}}>{header}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                        {this.state.newlabourrate.length > 0 ?
                       this.state.newlabourrate.map((basic,index) => 
                       basic.isApproved ?      
                       <tr>
                      <td >{index + 1}</td> 
                      <td >{basic.location}</td>
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                        <td >{basic.labourer}</td>
                        <td >{basic.qualified_artisan}</td>
                         <td >{basic.rate}</td> 
                         </tr>
                         : null              
                            )  :
                            this.state.labourrates.map((basic,index) => 
                                basic.isApproved ?      
                                <tr>
                                <td >{index + 1}</td> 
                                <td >{basic.location}</td>
                                  <td style={{fontSize:"14px"}}>{basic.description}</td>
                                  <td >{basic.labourer}</td>
                                  <td >{basic.qualified_artisan}</td>
                                   <td >{basic.rate}</td>    
                                 </tr>
                                   : null  
                                                 
                               ) 
                            }
                   
                </tbody>
                </table>
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
                    <a href="/forms/labourrates">
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
 
export default LabourRates;