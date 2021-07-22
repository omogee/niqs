import React, { Component } from 'react';
import axios from "axios"
import ReactHtmlParser from "react-html-parser"
import deep20 from "./images/deep20.jpg"
import jsPDF from "jspdf"
import "jspdf-autotable"
import logo from "./images/laaga.png"
import Cookie from "js-cookie"

class CostIndices extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            CostIndices:[],
            downloaddisplay:"none"
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | COST INDICES';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/costindices`)
        .then(res => this.setState({CostIndices:res.data.data}))
        .catch(err=> console.log(err))
    }
    
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF("landscape", "pt")
        const d = new Date()
var image = new Image();
      image.src = logo;
    doc.addImage(image, 'PNG',20, 0, 40, 30); 
        doc.setFontSize(20);
        doc.text("Cost Indices",70,30)
doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
doc.setFontSize(8);
doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
doc.save("costindices.pdf")
this.setState({downloaddisplay:"none"})
      } 

    render() { 
        const headers =["S/No","MATERIAL/CITY","CEMENT<br/>Per Bag","SHARP_SAND <br/>Per M3","GRANITE<br/>Per M3","LATERITE <br/>Per M3","HARDCORE<br/>Per M3","HT_RODS<br/>Per Tonne","BRC_MESH<br/>Per Rol of 30M2",
 "230mm_BLOCKS Per No","ALUM_ROOFING","FLUSH_DOOR <br/>Per No","ALUM_WINDOW<br/>600 x 600mm","FLOOR_TILES <br/>Per M2","WALL_TILES<br/>Per M2","POP_CEILING<br/>Per M2","EMUL_PAINT<br/>Per 20 Lit Drum","AVERAGE"]
      const states =[]
      this.state.CostIndices.map(indice =>{
          states.push(indice.city)
      }) 
        return ( 
            <div style={{width:"100%",overflow:"hidden"}}>
                <div className="container">
                <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} src={`${deep20}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"20px",fontWeight:"bold"}}>COST INDICES</small><br/>
                    <div className="mt-1" style={{border:"1px solid white",padding:"15px",borderRadius:"5px",fontSize:"14px"}}><small>Gives cost variation of prices in different parts of the country.</small> </div>
                    
                    </div>
                    </center>
                    </div>                  
                 </div>
                </div>
                <div className=" mt-3">
                    <div style={{width:"100%",overflow:"auto"}}>
                <table className="table table-striped table-bordered" id="table">
                <thead>
                <tr style={{backgroundColor:"orange",color:"white",paddingTop:"0px",paddingBottom:"0px"}}>
                   {headers.map(header=>
                    <th style={{fontSize:"13px",fontWeight:"normal",paddingTop:"0px",paddingBottom:"0px"}}>{ReactHtmlParser(header)}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                   
                        {this.state.CostIndices.map((indices,i) => 
                        indices.isApproved ?
                             <tr>                     
                      <td >{i+1}</td>
                        <td style={{fontSize:"14px"}}>{indices.city}</td>
                         <td >{indices.cement}</td>  
                         <td >{indices.sharp_sand}</td>  
                         <td>{indices.granite}</td>
                         <td>{indices.laterite}</td>
                         <td>{indices.hardcore}</td>
                         <td>{indices.ht_rods}</td>
                         <td>{indices.brc_mesh}</td>
                         <td>{indices.blocks}</td>
                         <td>{indices.alum_roofing}</td>
                         <td>{indices.flush_door}</td>
                         <td>{indices.alum_window}</td>
                         <td>{indices.floor_tiles}</td>
                         <td>{indices.wall_tiles}</td>
                         <td>{indices.pop_ceiling}</td>
                         <td>{indices.emul_paint}</td>
                         <td>{indices.average}</td>
                          </tr>        
                          : null             
                            )}
                   
                </tbody>
                </table>
                </div>
                <br/><br/>
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
                    <a href="/forms/costindices">
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
 
export default CostIndices;