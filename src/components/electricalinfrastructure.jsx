import React, { Component } from 'react';
import axios from "axios"

class ElectricalInfrastructure extends Component {
    constructor(props) {
        super(props);
        this.state = { 
       elecInfrastructure:[],
       newelecInfrastructure:[],
       category:"",
       subcat:""
         }
    }
    componentDidMount=()=>{
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/electricalinfrastructure`)
        .then(res => this.setState({elecInfrastructure:res.data.data}),()=>{
            console.log(this.state.elecInfrastructure)
        })
        .catch(err=> console.log(err))
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{
            const newelecInfrastructure = []
            this.state.elecInfrastructure.map(cat=>{
                if(cat.category === this.state.category ||  cat.sub_category === this.state.subcat){
                    newelecInfrastructure.push(cat)
                }
            })
            this.setState({newelecInfrastructure})
        })
    }
    render() { 
        const category =[]
        const subcategory=[]
      
        this.state.elecInfrastructure.map(cat=>{   
          if(!category.includes(cat.category)){
         category.push(cat.category)
          }         
          if(!subcategory.includes(cat.sub_category) && cat.category === this.state.category){
          subcategory.push(cat.sub_category)
          }
        })
        const headers =["S/No","description","rate"]
        return ( 
           <div className="container">
           <div className="row">
           <div className="col-12" style={{backgroundColor:"lightblue",padding:"0px"}}>
                      <div className="row">
                         <div className="col-4 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px"}} src={`http://niqsdatabank.org/images/Material_Cost.jpg`} alt=""/>
                    </div>
                    <div className="col-8 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>ELECTERICAL INFRASTRUCTURE</small><br/>
                    <div style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small>filter button to display more advanced option parameters paramet  Click the filter button to display more advanced option parameters</small> </div>
                    <small style={{fontSize:"11px"}}>Click the filter button to display more advanced option parameters</small>
                    </div>
                    </center>
                    </div>   
                      </div>
                  </div>
                  <div className="col-12">
                      <div className="row mt-3">
                      <div className="col-12 col-md-4">
                     <select name="category" className="form-control" id="category" onChange={this.change} value={this.state.category}>
               <option value="">Select Category</option>
              {category.map(cat =>                 
               <option value={`${cat}`}>{cat}</option>
               )}
             </select><br/>
                     </div>
                     <br/><br/>
                     <div className="col-12 col-md-4">
                     <select name="subcat" className="form-control" id="subcat" onChange={this.change} value={this.state.subcat}>
               <option value="">Select Sub-Category</option>
              {subcategory.map(subcat =>                 
               <option value={`${subcat}`}>{subcat}</option>
               )}
             </select><br/>
                     </div>
                      </div>
                  </div>
           </div>
           
           <table className="table table-striped table-bordered mt-4" id="table">
                <thead>
                <tr style={{backgroundColor:"orange",color:"white"}}>
                   {headers.map(headers=>
                    <th style={{fontSize:"13px",fontWeight:"normal"}}>{headers}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                        {this.state.newelecInfrastructure.length > 0 ?
                       this.state.newelecInfrastructure .map(basic => 
                             <tr>                     
                      <td >{basic.id}</td>
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                         <td >{basic.rate}</td>                  
                          </tr>                     
                            )  :
                            this.state.elecInfrastructure .map(basic => 
                                <tr>                     
                         <td >{basic.id}</td>
                           <td style={{fontSize:"14px"}}>{basic.description}</td>
                            <td >{basic.rate}</td>                  
                             </tr>                     
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
                    <a href="/forms/electricalinfrastructure">
                    <button className="btn btn-primary" style={{float:"right"}}>
                       + Add Item
                    </button>
                    </a>
                </div>
           </div>
         );
    }
}
 
export default ElectricalInfrastructure;