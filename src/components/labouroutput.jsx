import React, { Component } from 'react';
import axios from "axios"
import deep14 from "./images/deep14.jpg"
import jsPDF from "jspdf"
import "jspdf-autotable"
import logo from "./images/laaga.png"
import Cookie from "js-cookie"

class LabourOutput extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            labouroutput:[],
            newlabouroutput:[],
            category:"",
            subcat:"",
            location:"",
            downloaddisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | LABOUR OUTPUT';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/labouroutput`)
        .then(res => this.setState({labouroutput:res.data.data}),()=>{
            console.log(this.state.labouroutput)
        })
        .catch(err=> console.log(err))
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            const newlabouroutput=[]
            this.state.labouroutput.map(cat=>{
if((this.state.subcat !== null && this.state.subcat.length === 0 && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat !== null && this.state.subcat.length === 0 && this.state.category.length === 0 && this.state.location.length > 0 && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat.length > 0 && this.state.subcat !== null && cat.subcat !== null && cat.sub_category.toLowerCase() === this.state.subcat.toLowerCase() && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase())){
                    newlabouroutput.push(cat)
                }
            })
            this.setState({newlabouroutput})
        })
    }
    clearfilter=()=>{
        this.setState({category:"",location:"",subcat:"",newlabouroutput:[]})
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        const d = new Date()
        var image = new Image();
              image.src = logo;
            doc.addImage(image, 'PNG',20, 0, 40, 30); 
                doc.setFontSize(20);
                doc.text("Labour Output",70,30)
        doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
        doc.setFontSize(8);
        doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
        doc.save("labouroutput.pdf")
        this.setState({downloaddisplay:"none"})
      }  
    render() { 
        const headers =["S/No","Location", "Description","Output(8Hrs)"]
         const states=[]
         const category=[]
         const subcategory =[]
         this.state.labouroutput.map(cat =>{
        if(!states.includes(cat.location)){
            states.push(cat.location)
           }       
           
         if(!category.includes(cat.category) && cat.location === this.state.location){
        category.push(cat.category)
         } 
         if(!subcategory.includes(cat.sub_category) && cat.location === this.state.location && cat.category === this.state.category){
            subcategory.push(cat.sub_category)
             }  
        })
        return ( 
            <div className="container">
                   <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",height:"100%",padding:"0px", margin:"0px"}} src={`${deep14}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>LABOUR OUTPUTS</small><br/>
                    <div className="mb-1" style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px",width:"100%"}}><small>This is an estimate of workers rate of productivity for various construction activities and operations.</small> </div>
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
                     <select name="subcat" className="form-control" id="subcat" onChange={this.change} value={this.state.subcat}>
               <option value="">Select Sub-Category</option>
              {subcategory.map(subcat =>                 
               <option value={`${subcat}`}>{subcat}</option>
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
                        {this.state.newlabouroutput.length > 0 ?
                       this.state.newlabouroutput.map((basic,index) => 
                            basic.isApproved ?
                        <tr>
                      <td >{index + 1}</td>
                      <td >{basic.location}</td> 
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                         <td >{basic.output}</td>
                         </tr> 
                         : null                                                             
                            )  :
                            this.state.labouroutput.map((basic,index) => 
                               basic.isApproved ?
                                    <tr>
                               <td >{index + 1}</td>
                      <td >{basic.location}</td> 
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                         <td >{basic.output}</td>
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
                    <a href="/forms/labouroutput">
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
 
export default LabourOutput;