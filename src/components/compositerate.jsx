import React, { Component } from 'react';
import axios from "axios"
import deep16 from "./images/deep16.jpg"
import jsPDF from "jspdf"
import "jspdf-autotable"
import logo from "./images/laaga.png"
import Cookie from "js-cookie"

class CompositeRate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comp_rate:[],
            newcomp_rate:[],
            category:"",
            subcat:"",
            location:"",
            downloaddisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | COMPOSITE RATE';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/compositerate`)
        .then(res => this.setState({comp_rate:res.data.data}),()=>{
            console.log(this.state.comp_rate)
        })
        .catch(err=> console.log(err))
    }
    change=(e)=>{
        const newcomp_rate=[]
        this.setState({[e.target.name]:e.target.value},()=>{
            this.state.comp_rate.map(cat=>{
                if((this.state.subcat.length === 0 && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat.length === 0 && this.state.category.length === 0 && this.state.location.length > 0 && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat.length> 0 && cat.sub_category.toLowerCase() === this.state.subcat.toLowerCase() && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase())){
                    newcomp_rate.push(cat)
                }
            })
            this.setState({newcomp_rate})
        })
    }
    clearfilter=()=>{
        this.setState({category:"",location:"",subcat:"",newcomp_rate:[]})
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        const d = new Date()
        var image = new Image();
              image.src = logo;
            doc.addImage(image, 'PNG',20, 0, 40, 30); 
                doc.setFontSize(20);
                doc.text("Composite Rates",70,30)
        doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
        doc.setFontSize(8);
        doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
        doc.save("compositerates.pdf")
        this.setState({downloaddisplay:"none"})
      } 
    render() { 
        
        const headers =["S/No","Location","Item","unit","Rates"]
     const states =[]
        const category =[]
        const subcategory=[]
    
        this.state.comp_rate.map(cat=>{
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
            <div style={{width:"100%",overflow:"hidden"}}> 
            <div className="container" style={{textTransform:"capitalize"}}>  
            <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} src={`${deep16}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>COMPOSITE RATES</small>
                    <div className="mb-1" style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small>These are compressed (omnibus) rates that combine a number of items into a single rate, thereby considerably reducing estimating time. They are useful to Consultants, Clients’ Organizations and Contractors..</small> </div>
                    
                    </div>
                    </center>
                    </div>                  
                 </div>
                     
            <div className="row mt-3" >
            <div className="col-12 col-md-3">
  <select name="location" className="form-control"  onChange={this.change} value={this.state.location}>
<option value="">Select Location</option>
{states.map(state =>                 
<option value={`${state}`}>{state}</option>
)}
</select><br/>
  </div>    
  <div className="col-12 col-md-3">
  <select name="category" className="form-control" id="category" onChange={this.change} value={this.state.category}>
<option value="">Select Category</option>
{category.map(cat =>                 
<option value={`${cat}`}>{cat}</option>
)}
</select><br/>
  </div>
  <br/><br/>
  <div className="col-12 col-md-3" style={{display:"none"}}>
  <select name="subcat" className="form-control" id="subcat" onChange={this.change} value={this.state.subcat}>
<option value="">Select Sub-Category</option>
{subcategory.map(subcat =>                 
<option value={`${subcat}`}>{subcat}</option>
)}
</select><br/>
  </div> <br/><br/>
  
  <div className="col-6 col-md-3" style={{display:`${this.state.filterheight === "100%" ? "none" : "block"}`}}>
       <button onClick={this.clearfilter} className="btn btn-primary">Clear Filter</button>
         </div>                   
</div>
</div>
<br/><br/>
<div style={{maxWidth:"100%",overflow:"auto"}} className="lgmargin">
<table className="table table-striped table-bordered" id="table">
<thead>
<tr style={{backgroundColor:"orange",color:"white"}}>
{headers.map(header=>
 <th style={{fontSize:"13px",fontWeight:"normal"}}>{header}</th>
 )}
</tr>
</thead>
<tbody>
     {this.state.newcomp_rate.length > 0 ?
    this.state.newcomp_rate .map((basic,index) => 
   basic.isApproved ?
<tr>
   <td >{index + 1}</td>
   <td >{basic.location}</td>
   <td style={{minWidth:"450px"}}>{basic.description}</td>
      <td >{basic.unit}</td>  
      <td >{basic.rate}</td>       
      </tr> 
      : null                      
         )  :
         this.state.comp_rate .map((basic,index) => 
            basic.isApproved ?
            <tr>            
     <td >{index + 1}</td>
     <td>{basic.location}</td>
     <td style={{minWidth:"450px"}}>{basic.description}</td>
      <td >{basic.unit}</td>  
      <td >{basic.rate}</td> 
      </tr> : null                     
            ) 
         }

</tbody>
</table>
</div>
<br/><br/>
                <div className="row mr-5">
                    <div className="col-12 ">
                    
                    <button className="btn btn-primary" onClick={this.downloadtable} style={{float:"right",clear:"both"}}>
                        Download pdf <small><span className="fa fa-chevron-down ml-1"></span></small>
                    </button><br/><br/>
                    <span style={{display:`${this.state.downloaddisplay}`,float:"right"}}><small>downloading pdf...</small></span>
                </div>
                </div>
                <br/><br/>
                <div>
                {Cookie.get("cyxpzz") ?
                    <a href="/forms/compositerate" >
                    <button className="btn btn-primary" style={{float:"right",marginRight:"50px"}}>
                       + Add Item
                    </button>
                    </a>
                    : null}
                </div>
</div>
         );
    }
}
 
export default CompositeRate;