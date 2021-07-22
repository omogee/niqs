import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from "react-html-parser"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../main.css';
import deep1 from "./images/deep1.jpg"
import deep2 from "./images/deep2.jpg"
import deep3 from "./images/deep3.jpg"
import deep4 from "./images/deep4.jpg"
import deep10 from "./images/deep10.jpg"
import deep11 from "./images/deep11.jpg"
import deep12 from "./images/deep12.jpg"
import deep13 from "./images/deep13.jpg"
import deep14 from "./images/deep14.jpg"
import deep15 from "./images/deep15.jpg"
import deep16 from "./images/deep16.jpg"
import deep17 from "./images/deep17.jpg"
import deep18 from "./images/deep18.jpg"
import deep19 from "./images/deep19.jpg"
import deep20 from "./images/deep20.jpg"


class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            displaypriceimage:"block",
            displayprice:"none",
            displayunitimage:"block",
            displayunit:"none",
            data:[]
         }
    }
componentDidMount =()=>{
    document.title = 'NIQS DATABANK | EXPLORE';
const array =[
{"image":`${deep10}`,"link":"price","text":"Comprises current market prices of materials used in the Construction Industry. Information contained in this section is useful to Consultants, Clients’ Organizations, Contractors and Suppliers.<br/><br/>","btn":"Basic Price List"},
{"image":`${deep11}`,"link":"unitrates","text":"Each rate includes the cost of materials, labour, plant, incidental expenses, profit and overheads. The rates cover major items in Building and Civil Engineering works. These rates are useful to Consultants and Contractors’ Estimators.","btn":"Unit Rates"},
{"image":`${deep12}`,"link":"labourrates","text":"This is classified under two headings: <ul> <li style={{padding:20px}}>Informal sector which covers daily wages paid to itinerant construction workers </li> <li>Formal sector covers wages paid by established construction companies which comprises the basic wage rate plus allowances. </li> <br/>The rates are based on the latest NJIC Agreement.</ul>","btn":"Labour Rates"},
{"image":`${deep13}`,"link":"planthire","text":"<br/>This covers the cost of hiring heavy plant for civil works, mixers, compressors, dumpers, cranes, etc. <br/><br/><br/><br/>","btn":"Daily Plant Hire Rates"},
{"image":`${deep14}`,"link":"labouroutput","text":"This is an estimate of workers rate of productivity for various construction activities and operations.<br/><br/><br/><br/>","btn":"Labour Outputs"},
{"image":`${deep15}`,"link":"constants","text":"<br/>This section contains useful information that by-pass computation from first principles i.e. shortcuts while estimating.<br/><br/><br/>","btn":"Constants"},
{"image":`${deep16}`,"link":"compositerate","text":"These are compressed (omnibus) rates that combine a number of items into a single rate, thereby considerably reducing estimating time. They are useful to Consultants, Clients’ Organizations and Contractors.","btn":"<small>Composite Rates For Approx. Estimating</small>"},
{"image":`${deep17}`,"link":"elementalcost","text":"This is used for budgeting, cost planning and cost control of projects from inception to completion. It can also be used as a basis for advising Clients on future projects. This section covers different types of projects: Residential, Commercial, Educational, Religious, etc. Each Analysis page comprises a brief description of the project, its location, year of execution, gross floor area and elemental costs.","btn":"Elemental Cost Analysis"},
{"image":`${deep18}`,"link":"benchmarkforinfrastructuralworks","text":"<br/>Gives cost per Km of Roads, Rail Lines, High Tension Transmission Lines, etc.<br/><br/><br/><br/><br/>","btn":"<small>Benchmark For Infrastructural Works</small>"},
{"image":`${deep19}`,"link":"oilandgasbenchmarks","text":"<br/>Gives cost of building Normal/Modular Refineries of different capacities, etc.<br/><br/><br/><br/><br/>","btn":"<small>Benchmark For Oil and Gas Industries</small>"},
{"image":`${deep20}`,"link":"costIndices","text":"<br/>Gives cost variation of prices in different parts of the country.<br/><br/><br/><br/><br/>","btn":"Cost Indices"},
]
this.setState({data:array})
}
    mouseover =(e)=>{
        let element = e.currentTarget
        e.currentTarget.classList.add("hoverapp")
  //      alert(e.currentTarget.classList)
  //  this.setState({displayprice:"block",displaypriceimage:"none"})
    }
    mouseleave =(e)=>{
        e.currentTarget.classList.remove("hoverapp")
       
      //  this.setState({displayprice:"none",displaypriceimage:"block"})
        }
       
    render() { 
        return ( 
            <div className="container">
                <div className="row mt-1" style={{padding:"10px"}}>
    {this.state.data.map(datum=>
                <div key={datum.text} className="col-12 col-md-6 col-lg-3" style={{padding:"0px",margin:"0px"}}>
                       <div className="row" onMouseEnter={(e)=>this.mouseover(e)} onMouseLeave={(e)=>this.mouseleave(e)} style={{border:"1px solid lightgrey",borderRadius:"5px",margin:"20px",padding:"0px"}}>
                           <div className="col-12" style={{padding:"0px"}}>
                       <div className="imgdiv">
                         <img style={{width:"100%",padding:"0px",height:"200px",margin:"0px"}}
                        src={datum.image}></img>
                        </div>
                        <div className="textdiv textpadding" style={{padding:"10px",overflow:"hidden",width:"100%",position:"absolute",top:"0px",opacity:"0.7",zIndex:"2",backgroundColor:"black",color:"white"}}>
                         
                            <small style={{overflow:"hidden"}}>
                            {datum.text.length > 250 ? ReactHtmlParser(datum.text.slice(0,250) + "...") : ReactHtmlParser(datum.text)}
                             </small>
                        
                        </div>    
                       <a href={`/${datum.link}`}>
                       <button className="btn btn-primary"  style={{margin:"0px",paddingLeft:"0px",paddingRight:"0px",width:"100%",borderTopLeftRadius:"0px",borderTopRightRadius:"0px"}}>
                           {ReactHtmlParser(datum.btn)}
                        </button> 
                           </a>                       
                           </div>
                       </div>                 
                    </div>
                    )}
                    </div>
    <br/>
            </div>
         );
    }
}
 
export default Explore;