import React, { Component } from 'react';
import deep15 from "./images/deep15.jpg"
import axios from "axios"
import jsPDF from "jspdf"
import "jspdf-autotable"
import logo from "./images/laaga.png"
import Cookie from "js-cookie"

class Constants extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            constants:[],
            newconstants:[],
            category:[],
            subcategory:[],
            codetype:"",
            code:"",
            downloaddisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | CONSTANTS';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/constant`)
        .then(res => this.setState({constants:res.data.data}),()=>{
            console.log(this.state.constants)
        })
        .catch(err=> console.log(err))
    }
    change =(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            const newconstants =[]
            if(this.state.code.length > 0){
               let codematch = this.state.constants.find(cons=> cons.code === this.state.code)
               this.setState({codetype:codematch.category})
               this.state.constants.map(cat =>{
               if(cat.code === this.state.code){
                   newconstants.push(cat)
               }
               })
               this.setState({newconstants})
            }
        })
    }
    clearfilter=()=>{
        this.setState({code:"",codetype:"",newconstants:[]})
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        const d = new Date()
        var image = new Image();
              image.src = logo;
            doc.addImage(image, 'PNG',20, 0, 40, 30); 
                doc.setFontSize(20);
                doc.text("Constants",70,30)
        doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
        doc.setFontSize(8);
        doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
        doc.save("constants.pdf")
        this.setState({downloaddisplay:"none"})
      } 
    render() { 
        const headers =["S/No","description","output/manday(m3/8HRS)","output/manday(m3/8HRS)"]
        const headersTwo=["","","","slow","fast","average"]
        const category =[]
                const subcategory=[]
                const code =[]
        this.state.constants.map(cat=>{
            if(!category.includes(cat.id)){
                category.push(cat.id)
            }
            if(!code.includes(cat.code)){
                code.push(cat.code)
            }
            if(!subcategory.includes(cat.sub_category) && cat.id == this.state.category){
                subcategory.push(cat.sub_category)
            }
        })

        return (
            <div style={{width:"100%",overflow:"hidden"}}> 
            <div className="container">
               <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} src={`${deep15}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"20px",fontWeight:"bold"}}>CONSTANTS</small><br/>
                    <div style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small style={{padding:'10px'}}>This section contains useful information that by-pass computation from first principles i.e. shortcuts while estimating.</small> </div>
                    </div>
                    </center>
                    </div>                  
                 </div>
                 <div className="row">
                 <div className="col-12">
                      <div className="row mt-3">
                      <div className="col-12 col-md-4">
                     <select style={{textTransform:"uppercase"}} name="code" className="form-control" id="code" onChange={this.change} value={this.state.code}>
               <option value="">Choose Code</option>
              {code.map(cat =>                 
               <option style={{textTransform:"uppercase"}} value={`${cat}`}>{cat}</option>
               )}
             </select><br/>
                     </div>
                     <br/><br/>
                     <div className="col-12 col-md-4">
                     <input type="text" style={{textTransform:"capitalize"}} name="codetype" className="form-control" value={this.state.codetype} readOnly placeholder="category"/>
                     <br/>
                     </div>
                     <div className="col-12 col-md-3 mt-1">
                     <button onClick={this.clearfilter} className="btn btn-primary">
                         Clear filter
                         </button>
                     </div><br/><br/>
                      </div>
                  </div>
                  </div>
                  <div style={{overflow:"auto"}}>
                 <table  className="table table-striped table-bordered mt-4 elemcostdiv" id="table">
                <thead>
                <tr style={{backgroundColor:"orange",color:"white"}}>             
           <th style={{fontSize:"13px",fontWeight:"normal"}}>S/No</th>
           <th style={{fontSize:"13px",fontWeight:"normal"}}>Description</th>
           <th style={{fontSize:"13px",fontWeight:"normal"}}>Other_Output</th>
           <th colspan="3" style={{fontSize:"13px",fontWeight:"normal"}}>Output / Manday(m3/8HRS)	</th>
                </tr>
                <tr style={{fontWeight:"bold"}}>
                   {headersTwo.map(headers=>
                    <th style={{fontSize:"13px",fontWeight:"bold",textTransform:"capitalize"}}>{headers}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                        {this.state.newconstants.length > 0 ?
                       this.state.newconstants .map((basic,i) => 
                             basic.isApproved ?
                                  <tr>           
                      <td >{i+1}</td>
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                        <td >{basic.other_output}</td>
                         <td >{basic.slow}</td>  
                         <td >{basic.average}</td>  
                         <td >{basic.fast}</td>  
                         </tr>
                         :null                  
                            )  :
                            this.state.constants .map((basic,i) => 
                               basic.isApproved ? 
                                <tr>
                         <td >{i + 1}</td>
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                        <td >{basic.other_output}</td>
                         <td >{basic.slow}</td>  
                         <td >{basic.average}</td>  
                         <td >{basic.fast}</td> 
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
                    <a href="/forms/constants">
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
 
export default Constants;