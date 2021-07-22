import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom'
import Login from "./components/login"
import Register from "./components/register"
import Navbar from "./components/navbar"
import Datasubmit from "./components/datasubmit"
import Elementalcost from "./components/elementalcost"
import ElementalcostA from "./components/elementalcostA"
import Explore from "./components/explore"
import Landing from "./components/landing"
import Elementalcostform from "./components/forms/elementalcostform"
import BasicPrice from "./components/basicpricelist"
import BasicPriceForm from "./components/forms/basicpriceform"
import CostIndices from "./components/costindindices"
import "./main.css"
import Pricechart from "./components/pricechart"
import CostIndicesForm from './components/forms/costindicesform.jsx';
import CompositeRate from './components/compositerate';
import CompRateForm from './components/forms/compositerateform';
import PlantHire from './components/planthirerate';
import LabourOutput from './components/labouroutput';
import Constants from './components/constants';
import PlantHireForm from './components/forms/planthireform';
import LabouroutputForm from './components/forms/labouroutputform';
import BenchmarkInfrastructure from './components/benchmarkinfrastructure';
import BenchmarkInfrastructureForm from './components/forms/benchmarkinfrastructureform';
import ElectricalInfrastructure from './components/electricalinfrastructure';
import ElectricalinfrastructureForm from './components/forms/electricalinfrastructureform';
import UnitRates from './components/unitrates';
import LabourRates from './components/labourrates';
import BenchmarkForOilandGas from './components/benchmarkforoilandgas';
import Admin from './components/admin';
import SideNavbar from './components/sidenavbar';
import ManageUsers from './components/manageusers';
import CreateUser from './components/createuser';
import UnitRateChart from './components/unitratechart';
import UnitRateForm from './components/forms/unitrateform';
import ConstantForm from './components/forms/constantform';
import LabourRateForm from './components/forms/labourrateform';
import Viewuser from './components/viewuser';
import UpdateUser from './components/updateuser';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        sidenavbarwidth:"0%",
        showsidenavbar:false
       }
  }
  showsidenavbar=()=>{
    if(this.state.sidenavbarwidth === "0%"){
      this.setState({showsidenavbar:true},()=>{
         this.setState({sidenavbarwidth:"50%"})
      })
     
    }else{
      this.setState({sidenavbarwidth:"0%",showsidenavbar:false})
    }
  }
 /**
  *  <div style={{backgroundColor:"rgba(242,242,242,0.7)",display:`${this.state.showsidenavbar ? "block" :"none"}`,zIndex:"3",width:"100%",height:"120%",position:"absolute"}}>
        <div style={{width:`${this.state.sidenavbarwidth}`,transition:"width 2s",height:"100%",overflow:"auto",position:"absolute",left:"0px",zIndex:"4"}}>
        <div style={{float:"right"}}>
         <span className="fa fa-times mr-2" onClick={this.showsidenavbar}></span>
          </div>
          <SideNavbar />
        </div>
        </div>
     
  * <div className="row" style={{height:"100%"}}>
        <div className="col-12 d-lg-none" style={{display:`${uri.indexOf("/admin") > 0 ? "block" : "none"}`,height:"100%"}}>
                          <div style={{float:"left"}}>
                          <span className="fa fa-bars" onClick={this.showsidenavbar}></span>
                          </div>
                      </div>
                      </div>
  */
  render() { 
    const uri = window.location.href
    console.log(uri)
    if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  return (
     <Router>   
     <Route path="/" component ={Navbar} />
   
     <div style={{backgroundColor:"rgba(242,242,242,0.7)",display:`${this.state.showsidenavbar ? "block" :"none"}`,zIndex:"3",width:"100%",height:"120%",position:"absolute"}}>
     <div style={{width:`${this.state.sidenavbarwidth}`,transition:"width 2s",height:"100%",overflow:"auto",position:"absolute",left:"0px",zIndex:"4"}}>
     <div style={{float:"right"}}>
      <span className="fa fa-times mr-2" onClick={this.showsidenavbar}></span>
       </div>
       <SideNavbar />
     </div>
     </div>

     <Route path='/login' exact   component={Login} />
     <Route path="/register" exact component={Register} />
     <Route path="/data" exact component={Datasubmit}/>
     <Route path="/elementalcostanalysis/:id" exact component={ElementalcostA} />
     <Route path="/explore" exact component={Explore} />
     <Route path="/elementalcost" exact component={Elementalcost} />
     <Route path="/forms/elementalcost" exact component={Elementalcostform} />
     <Route path="/" exact component={Landing} />
     <Route path="/price" exact component={BasicPrice} />
     <Route path="/forms/basicpricelist" exact component={BasicPriceForm} />
     <Route path="/unitrates" exact component={UnitRates} />
     
     <Route path="/forms/unitrates" exact component={UnitRateForm} />
     <Route path="/labourrates" exact component={LabourRates} />
     <Route path="/forms/labourrates" exact component={LabourRateForm} />
     <Route path="/oilandgasbenchmarks" exact component={BenchmarkForOilandGas} />

     <Route path="/compositerate" exact component={CompositeRate} />
     <Route path="/forms/compositerate" exact component={CompRateForm} />
     <Route path="/price/chart" exact component={Pricechart} />
     <Route path="/unitrates/chart" exact component={UnitRateChart} />
     <Route path="/electrical" exact component={ElectricalInfrastructure} />
     <Route path="/forms/electricalinfrastructure" exact component={ElectricalinfrastructureForm} />
     <Route path="/planthire" exact component={PlantHire} />
     <Route path="/forms/planthirerate" exact component={PlantHireForm} />
     <Route path="/benchmarkforinfrastructuralworks" exact component={BenchmarkInfrastructure} />
     <Route path="/forms/benchmarkinfrastructureform" exact component={BenchmarkInfrastructureForm} />
     <Route path="/constants" exact component={Constants} />
     <Route path="/forms/constants" exact component={ConstantForm} />
     <Route path="/labouroutput" exact component={LabourOutput} />
     <Route path="/forms/labouroutput" exact component={LabouroutputForm} />
     <Route path="/costindices" exact component={CostIndices} />
     <Route path="/forms/costindices" exact component={CostIndicesForm} />
     <div style={{display:"flex",flexWrap:"nowrap"}}>
 <div style={{width:"18%"}}>
   <div style={{position:"fixed",width:"inherit",left:"0",top:"20%"}}>
   <Route path='/admin'    component={SideNavbar} />
   </div>  
      </div>
      <div style={{width:"82%",padding:"20px"}}>
      <Route path='/admin/home'    component={Admin} />
      <Route path='/admin/home/createuser'    component={CreateUser} />
      <Route path='/admin/manageusers'    component={ManageUsers} />
      <Route path='/admin/manageuser/:id' exact   component={Viewuser} />
      <Route path='/admin/manageuser/update/:id'    component={UpdateUser} />
      <Route path='/admin/createuser'    component={CreateUser} />
      </div>
 </div>

     </Router>

  ); 
    }else{
      return (
        <Router>   
        <Route path="/" component ={Navbar} />
         <Route path='/admin/home'    component={Admin} />
         <Route path='/admin/home/createuser'    component={CreateUser} />
         <Route path='/admin/manageusers'    component={ManageUsers} />
         <Route path='/admin/manageuser/:id' exact   component={Viewuser} />
         <Route path='/admin/manageuser/update/:id'    component={UpdateUser} />
         <Route path='/admin/createuser'    component={CreateUser} />
   
        <Route path='/login' exact   component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/data" exact component={Datasubmit}/>
        <Route path="/elementalcostanalysis/:id" exact component={ElementalcostA} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/elementalcost" exact component={Elementalcost} />
        <Route path="/forms/elementalcost" exact component={Elementalcostform} />
        <Route path="/" exact component={Landing} />
        <Route path="/price" exact component={BasicPrice} />
        <Route path="/forms/basicpricelist" exact component={BasicPriceForm} />
        <Route path="/unitrates" exact component={UnitRates} />
        
        <Route path="/forms/unitrates" exact component={UnitRateForm} />
        <Route path="/labourrates" exact component={LabourRates} />
        <Route path="/forms/labourrates" exact component={LabourRateForm} />
        <Route path="/oilandgasbenchmarks" exact component={BenchmarkForOilandGas} />
   
        <Route path="/compositerate" exact component={CompositeRate} />
        <Route path="/forms/compositerate" exact component={CompRateForm} />
        <Route path="/price/chart" exact component={Pricechart} />
        <Route path="/unitrates/chart" exact component={UnitRateChart} />
        <Route path="/electrical" exact component={ElectricalInfrastructure} />
        <Route path="/forms/electricalinfrastructure" exact component={ElectricalinfrastructureForm} />
        <Route path="/planthire" exact component={PlantHire} />
        <Route path="/forms/planthirerate" exact component={PlantHireForm} />
        <Route path="/benchmarkforinfrastructuralworks" exact component={BenchmarkInfrastructure} />
        <Route path="/forms/benchmarkinfrastructureform" exact component={BenchmarkInfrastructureForm} />
        <Route path="/constants" exact component={Constants} />
        <Route path="/forms/constants" exact component={ConstantForm} />
        <Route path="/labouroutput" exact component={LabourOutput} />
        <Route path="/forms/labouroutput" exact component={LabouroutputForm} />
        <Route path="/costindices" exact component={CostIndices} />
        <Route path="/forms/costindices" exact component={CostIndicesForm} />
        </Router>
   
     );   
    }
}
}
export default App;
