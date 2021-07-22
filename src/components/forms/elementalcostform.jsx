import React, { Component } from 'react';
import {states} from "../state"
import axios from "axios"
import Cookie from "js-cookie"
import {Redirect} from "react-router-dom"

class ElementalCost extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         categories:[],
         subcategories:[],
         category:"",
         buildingType:"",
         grossArea:"",
         description:"",
         clientType:"",
         location:"",
         duration:null,
         year:null,
         exchangeRate:"",
         othercategoriesdisplay:"none",
         othercategoriesIcon:"fa fa-chevron-right",
         facilitatingWorksheight:"0px",
         facilitatingWorksIcon:"fa fa-chevron-right",
         substructureheight:"0px",
         substructureIcon:"fa fa-chevron-right",
         superstructureheight:"0px",
         superstructureIcon:"fa fa-chevron-right",
         finishesheight:"0px",
         finishesIcon:"fa fa-chevron-right",
         fittingsheight:"0px",
         fittingsIcon:"fa fa-chevron-right",
         installationheight:"0px",
         installationIcon:"fa fa-chevron-right",
         existingUnitsheight:"0px",
         existingUnitsIcon:"fa fa-chevron-right",
         externalWorksheight:"0px",
         externalWorksIcon:"fa fa-chevron-right",

         demoWorkselemcost:"",
         demoworkcost:"",
         specgroundelemcost:"",
         specgroundcost:null,
         siteinvestelemcost:"",
         siteinvestcost:"",

         substructureelemcost:"",
         substructurecost:"",

         frameelemcost:"",
         framecost:"",
         upfloorelemcost:"",
         upfloorcost:"",
         roofelemcost:"",
         roofcost:"",
         stairelemcost:"",
         staircost:"",
         exwallelemcost:"",
         exwallcost:"",
         winexdoorelemcost:"",
         winexdoorcost:"",
         intwallselemcost:"",
         intwallscost:"",
         intdoorselemcost:"",
         intdoorscost:"",

         wallfinelemcost:"",
         wallfincost:"",
         floorfinelemcost:"",
         floorfincost:"",
         ceilingfinelemcost:"",
         ceilingfincost:"",

         fitfurequipelemcost:"",
         fitfurequipcost:"",

        sanappinstallelemcost:"",
        sanappinstallcost:"",
        hotcoldwaterelemcost:"",
        hotcoldwatercost:"",
        disposalinstallelemcost:"",
        disposalinstallcost:"",
        hvacinstallelemcost:"",
        hvacinstallcost:"",
        electinstallelemcost:"",
        electinstallcost:"",
        geninstallelemcost:"",
        geninstallcost:"",
        liftconveyorelemcost:"",
        liftconveyorcost:"",
        fireprotectelemcost:"",
        fireprotectcost:"",
        commcontrolelemcost:"",
        commcontrolcost:"",
        specinstallelemcost:"",
        specinstallcost:"",
        acinstallelemcost:"",
        acinstallcost:"",
        buildworkelemcost:"",
        buildworkcost:"",

         renworkselemcost:"",
         renworkscost:"",

         siteprepelemcost:"",
          siteprepcost:"",
          roadspathpavelemcost:"",
          roadspathpavcost:"",
          landscaplantingelemcost:"",
          landscaplantingcost:"",
          fencingelemcost:"",
          fencingcost:"",
          explumbingelemcost:"",
          explumbingcost:"",
          exelectelemcost:"",
          exelectcost:"",
          exdrainageelemcost:"",
          exdrainagecost:"",
          minorbuildingelemcost:"",
          minorbuildingcost:"",

          subtotal_fworks:"",
          main_cp:"",
          subtotal_fworks_cp:"",
          proteam_fees:"",
          base_ce:"",
          cont_ra:"",
          total_ce_vat:"",
          vat:"",
          total_ce_vat:"",
          messagebox:"",
          uploadcsv:false,
          csv:null,
          messageboxclass:"d-none alert-primary",
          redirect:false

         }
    }
    componentDidMount=()=>{
        const categories =[{"name":"Hotel Development","subcat":["5-Star Hotel","4-Star Hotel","3-Star Hotel","2-Star Hotel","Others"]},
        {"name":"Office Development","subcat":["Low-Rise Office Buildings (Below 4 Storey)","Medium-Rise Office Buildings (5-14 Storey)",
        "High-Rise Office Buildings (15-25 Storey)","Extra High-Rise Office Buildings (Over 25 Storey)"]},
      {"name":"Educational Buildings","subcat":["Below 2000 Capacity Theatre","2001 up to 5000 Capacity Theatre","below 2000 capacity cafeteria/ dinning hall",
    "classroom block (state no of classrooms)","student hostel","senate building","administration block","laboratory building",
"workshop","library"]},
{"name":"residential development","subcat": ["bungalows","duplexes","terrace houses","up to 4-storey block of flats", "high-rise luxury apartments (indicate no of storeys)"]},
{"name":"religious buildings","subcat":["church auditorium (indicate capacity)","mosque building (indicate capacity) "]},
{"name":"industrial/ commercial development","subcat" : ["factory building", "stores/ warehouses", "multi- storesy car park",
"petrol stations", "shopping centers", "corner shops", "bank buildings", "markets"]},
{"name":"health - related development","subcat" : ["health centre", "general hospital", "teaching hospital"]},
{"name":"sports/ recreational facilities (indicate capacity)","subcat" : ["sports stadium","indoor sports hall","lawn tennis court", "hand ball court", "basket ball court",
"golf course", "table tennis court"]},
{"name":"others" ,"subcat":["community halls", "skill acquisition centres"]}]
this.setState({categories})
    }
    change=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>{

            let subcategories;
            this.state.categories.map(category=>{
                if(category.name === this.state.category){
                subcategories = category.subcat
                }
            })
            this.setState({subcategories:subcategories},()=>{
                
            })
        })
    }
    toggleOthercategories=()=>{
        if(this.state.othercategoriesdisplay === "none"){
            this.setState({othercategoriesdisplay:"",othercategoriesIcon:"fa fa-chevron-up"})
        }else{
            this.setState({othercategoriesdisplay:"none",othercategoriesIcon:"fa fa-chevron-right"})
        }
    }
    togglefacilitatingworks=()=>{
        if(this.state.facilitatingWorksheight === "0px"){
            this.setState({facilitatingWorksheight:"100%"})
        }else{
            this.setState({facilitatingWorksheight:"0px"})
        }
    }
    togglesubstructure=()=>{
        if(this.state.substructureheight === "0px"){
            this.setState({substructureheight:"100%"})
        }else{
            this.setState({substructureheight:"0px"})
        }
    }
    togglesuperstructure=()=>{
        if(this.state.superstructureheight === "0px"){
            this.setState({superstructureheight:"100%"})
        }else{
            this.setState({superstructureheight:"0px"})
        }
    }
    togglefinishes=()=>{
        if(this.state.finishesheight === "0px"){
            this.setState({finishesheight:"100%"})
        }else{
            this.setState({finishesheight:"0px"})
        }
    }
    togglefittings=()=>{
        if(this.state.fittingsheight === "0px"){
            this.setState({fittingsheight:"100%"})
        }else{
            this.setState({fittingsheight:"0px"})
        }
    }
    toggleinstallation=()=>{
        if(this.state.installationheight === "0px"){
            this.setState({installationheight:"100%"})
        }else{
            this.setState({installationheight:"0px"})
        }
    }
    toggleexistingunits=()=>{
        if(this.state.existingUnitsheight === "0px"){
            this.setState({existingUnitsheight:"100%"})
        }else{
            this.setState({existingUnitsheight:"0px"})
        }
    }
    toggleexternalworks=()=>{
        if(this.state.externalWorksheight === "0px"){
            this.setState({externalWorksheight:"100%"})
        }else{
            this.setState({externalWorksheight:"0px"})
        }
    }
    filechange=(e)=>{
        this.setState({csv:e.target.files[0]})
       }
      
       submitcsv=()=>{
           console.log("sending")
           const token = Cookie.get("cyxpzz")
           if(!token){
               this.setState({redirect:true})
           }
           else if(this.state.csv === null){
               alert("Warning!!!! PLease Select a file")
           }else{
           const config = {
               headers: { Authorization: `Bearer ${token}` }
           };
           var formData = new FormData();
   formData.append("file",this.state.csv);
  
           axios.post(`https://niqsdatabank.herokuapp.com/api/v1/elementalcost/import`,formData,config)
           .then(res => {
               console.log(res.data,"eeeehhehhhehehehehhehehhehehehhehhhehh")
               if(res.data.message && res.data.data){
                   this.setState({messagebox:res.data.message,messageboxclass:"alert-success"},()=>{
                       window.scrollTo(0,  0)
               this.setState({csv:null})
          setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)               
   })
               }else{
                this.setState({redirect:true})
               }
           })
           .catch(err=> {
               console.log(err.response, err.message)
               this.setState({messagebox:"Upload Failed",messageboxclass:"alert-danger"},()=>{
                    window.scrollTo(0,  0)
                   setTimeout(()=>this.setState({messagebox:"",messageboxclass:"d-none"}),5000)
               })
           })
           console.log("sent")
       }
    }
   
    render() { 
        if(this.state.redirect){
            return <Redirect to={{ pathname: '/login',state: { from: this.props.location }}} />
        }
        console.log(this.state)
        let year = 1970
         let years = []
         let dummyArray = new Array(52).fill(undefined)
         dummyArray.map((array,i)=>{
                 years.push(year+i)
         })
       const  clientType=["Public", "Private","High End"]
       const categories =[{"name":"Hotel Development","subcat":["5-Star Hotel","4-Star Hotel","3-Star Hotel","2-Star Hotel","Others"]},
        {"name":"Office Development","subcat":["Low-Rise Office Buildings (Below 4 Storey)","Medium-Rise Office Buildings (5-14 Storey)",
        "High-Rise Office Buildings (15-25 Storey)","Extra High-Rise Office Buildings (Over 25 Storey)"]},
      {"name":"Educational Buildings","subcat":["Below 2000 Capacity Theatre","2001 up to 5000 Capacity Theatre","below 2000 capacity cafeteria/ dinning hall",
    "classroom block (state no of classrooms)","student hostel","senate building","administration block","laboratory building",
"workshop","library"]},
{"name":"residential development","subcat": ["bungalows","duplexes","terrace houses","up to 4-storey block of flats", "high-rise luxury apartments (indicate no of storeys)"]},
{"name":"religious buildings","subcat":["church auditorium (indicate capacity)","mosque building (indicate capacity) "]},
{"name":"industrial/ commercial development","subcat" : ["factory building", "stores/ warehouses", "multi- storesy car park",
"petrol stations", "shopping centers", "corner shops", "bank buildings", "markets"]},
{"name":"health - related development","subcat" : ["health centre", "general hospital", "teaching hospital"]},
{"name":"sports/ recreational facilities (indicate capacity)","subcat" : ["sports stadium","indoor sports hall","lawn tennis court", "hand ball court", "basket ball court",
"golf course", "table tennis court"]},
{"name":"others" ,"subcat":["community halls", "skill acquisition centres"]}]
        return ( 
            <div className="container">
                    <div className="row" >     
                    <div className={`col-12 alert ${this.state.messageboxclass}`}>
                   <center>
                       <small style={{fontWeight:"bolder"}}>{this.state.messagebox}</small>
                   </center>
               </div>     
              <div className="col-12 mt-3">
                  <input type="file" name="csv" onChange={this.filechange} className="form-control"/><br/><br/>
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                  <button onClick={this.submitcsv} style={{float:"right"}}  className="btn btn-primary">
                      Upload CSV
                  </button>
              </div>
          </div>
                <div className="row" style={{display:"none"}}>
                <div className="col-12 mt-5">
                 <h2 className="text-primary">ELEMENTAL COST </h2>
                 </div>
                   <div className="col-12 col-md-6 col-lg-4">
                   <br/>
                   <select name="category" className="form-control" id="category" onChange={this.change} value={this.state.category}>
               <option value="">Select category</option>
              {categories.map(category =>                 
               <option style={{textTransform:"uppercase"}} value={`${category.name}`}>{category.name}</option>
               )}
             </select><br/>
                    <br/>
                   </div>
                  
                   <div className="col-12 col-md-6 col-lg-4">
                   <br/>
                   <select className="form-control" id="buildingType" name="buildingType" onChange={this.change} value={`${this.state.buildingType}`}>
                   
                   {this.state.subcategories && this.state.subcategories.length > 0 ? this.state.subcategories.map(cat=>
                                <option value={`${cat}`}>{cat} </option>
                            ) :
                            <option value="">Select Building Type</option> }    
                 </select><br/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4">
                   <small>Gross Floor Area (<b>m2</b>) :</small>
                   <input type="number" className="form-control" id="grossArea" onChange={this.change} name="grossArea" value={this.state.grossArea}/><br/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4">
                   <small>Brief Description Of Project :</small>
                   <textarea col="5" rows="2" name="description" id="description" onChange={this.change} className="form-control" value={this.state.description}/><br/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4">
                   <br/>
                   <select name="clientType" className="form-control" id="clientType" onChange={this.change} value={this.state.clientType}>
               <option value="">Select Client Type</option>
              {clientType.map(client =>                 
               <option value={`${client}`}>{client}</option>
               )}
             </select><br/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4">
                   <br/>
                   <select name="location" className="form-control" id="location" onChange={this.change} value={this.state.location}>
               <option value="">Select location</option>
              {states.map(state =>                 
               <option value={`${state.state.name}`}>{state.state.name}</option>
               )}
             </select><br/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4">
                   <small>Duration (<b>weeks</b>) :</small>
                   <input type="number" className="form-control" onChange={this.change} value={this.state.duration}/><br/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4">
                       <br/>
                   <select name="year" className="form-control" id="year" onChange={this.change} value={this.state.year}>
               <option value="">Select year of Completion</option>
              {years.map(year =>                 
               <option value={`${year}`}>{year}</option>
               )}
             </select>
                  <br/>
                   </div>
                   <div className="col-12 col-md-6 col-lg-4">
                   <small>Exchange Rate At Award/ Completion:</small>
                   <input type="text" className="form-control" name="exchangeRate" onChange={this.change} value={this.state.exchangeRate}/><br/>
                   </div>
                   <div className="col-12 mb-1" style={{cursor :"pointer",padding:"10px",boxShadow:"1px 2px 5px 2px lightgrey"}} onClick={this.toggleOthercategories}>
                       Other Categories <span style={{float:"right"}} className={`${this.state.othercategoriesIcon} ml-1`}></span>
                   </div>
                   </div>
                   
                   <div className="row" style={{display:`${this.state.othercategoriesdisplay}`,display:"none"}}>
                  <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                      <div className="col-12 col-md-3"  style={{cursor :"pointer",padding:"10px"}} onClick={this.togglefacilitatingworks}>
                      <p className="ml-5 subcat">
                          Facilitating Works <span className="fa fa-chevron-right ml-2">></span>
                      </p>
                    </div>
                    <div className="col-12 col-md-9" >
                        <div className="row" style={{height:`${this.state.facilitatingWorksheight}`,transition:"height 2s",overflow:"hidden"}}>
                    <div className="col-12 col-md-4" >
                        <b>Demolition Works </b> <br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.demoWorkselemcost} name={"demoWorkselemcost"} className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.demoWorkcost} name={"demoWorkcost"} className="form-control" /><br/>
                    </div>
                    <div className="col-12 col-md-3">
                        <b> Specialist Ground Works</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.specgroundelemcost} name={"specgroundelemcost"} className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.specgroundcost} name={"specgroundcost"}  className="form-control" /><br/>
                    </div>
                    <div className="col-12 col-md-3">
                       <b> Site Investigation</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.siteinvestelemcost} name="siteinvestelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.siteinvestcost} name="siteinvestcost" className="form-control" /><br/>
                        </div>
                    </div>
                    </div>
                      </div>
                     
               </div>
                  <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                    <div className="col-12 col-md-3"style={{cursor:"pointer",padding:"10px"}} onClick={this.togglesubstructure}>
                      <p className="ml-5 subcat">
                          Substructure <span className="fa fa-chevron-right ml-2">></span>
                      </p>
                      </div>
                  <div className="col-12 col-md-9">
                  <div className="row" style={{height:`${this.state.substructureheight}`,transition:"height 2s",overflow:"hidden"}}>
                  <div className="col-12 col-md-6" >
                  <b> Substructure</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.substructureelemcost} name="substructureelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.substructurecost} name="substructurecost" className="form-control" /><br/>
                  </div>
                   <div className="col-12 col-md-6"></div>
                  </div>
                  </div>
                 </div>
                 </div>
                 <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                    <div className="col-12 col-md-3" style={{cursor:"pointer",padding:"10px"}} onClick={this.togglesuperstructure}>
                        <p className="ml-5 subcat">
                            Superstructure <span className="fa fa-chevron-right ml-2">></span>
                        </p>
                    </div>
                    <div className="col-12 col-md-9" >
                        <div className="row" style={{overflow:"hidden",height:`${this.state.superstructureheight}`,transition:"height 2s"}}>
                        <div className="col-12 col-md-4">
                  <b> Frame</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.frameelemcost} name="frameelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.framecost} name="framecost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4">
                  <b> Upper Floors</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.upfloorelemcost} name="upfloorelemcost"  className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.upfloorcost} name="upfloorcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4">
                  <b> Roof</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.roofelemcost} name="roofelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.roofcost} name="roofcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4">
                  <b> Staircases and Ramps</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.stairelemcost} name="stairelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.staircost} name="staircost" className="form-control" /><br/>

                  </div>
                  <div className="col-12 col-md-4">
                  <b> External Walls</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.exwallelemcost} name="exwallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.exwallcost} name="exwallcost" className="form-control" /><br/>

                  </div>
                  <div className="col-12 col-md-4">
                  <b> Windows and External Doors</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.winexdoorelemcost} name="winexdoorelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.winexdoorcost} name="winexdoorcost" className="form-control" /><br/>

                  </div>
                  <div className="col-12 col-md-4" style={{cursor:"pointer",padding:"10px"}}>
                  <b> Internal Walls and Partitions</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.intwallselemcost} name="intwallselemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.intwallscost} name="intwallscost" className="form-control" /><br/>

                  </div>
                  <div className="col-12 col-md-4">
                  <b> Internal Doors</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.intdoorselemcost} name="intdoorselemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.intdoorscost} name="intdoorscost" className="form-control" /><br/>
                  </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                    <div className="col-12 col-md-3" onClick={this.togglefinishes} style={{cursor:"pointer",padding:"10px"}}>
                      <p className="ml-5 subcat">
                          Finishes <span className="fa fa-chevron-right ml-2">></span>
                      </p>
                      </div>
                  <div className="col-12 col-md-9">
                  <div className="row" style={{height:`${this.state.finishesheight}`,transition:"height 2s",overflow:"hidden"}}>
                  <div className="col-12 col-md-4" >
                  <b> Wall Finishes</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.wallfinelemcost} name="wallfinelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.wallfincost} name="wallfincost" className="form-control" /><br/>
                  </div>
                   <div className="col-12 col-md-4">
                   <b> Floor Finishes</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.floorfinelemcost} name="floorfinelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.floorfincost} name="floorfincost" className="form-control" /><br/>
                   </div>
                   <div className="col-12 col-md-4">
                   <b> Ceiling Finishes</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.ceilingfinelemcost} name="ceilingfinelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.ceilingfincost} name="ceilingfincost" className="form-control" /><br/>
                   </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                  <div className="col-12 col-md-3" onClick={this.togglefittings} style={{cursor:"pointer",padding:"10px"}}>
                      <p className="ml-5 subcat">
                          Fittings and Furnishings <span className="fa fa-chevron-right ml-2">></span>
                      </p>
                      </div>
                      <div className="col-12 col-md-9">
                          <div className="row" style={{height:`${this.state.fittingsheight}`,transition:"height 2s",overflow:"hidden"}}>
                              <div className="col-12 col-md-6">
                                 <b> Fittings, Furnishings and Equipment</b><br/><br/>
                                  <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.fitfurequipelemcost} name="fitfurequipelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.fitfurequipcost} name="fitfurequipcost" className="form-control" /><br/>
                  </div>
                          </div>
                      </div>
                      </div>
                      </div>
                      <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                  <div className="col-12 col-md-3" style={{cursor:"pointer",padding:"10px"}} onClick={this.toggleinstallation}>
                      <p className="ml-5 subcat">
                          Mechanical and Electrical Installation <span className="fa fa-chevron-right ml-2">></span>
                      </p>
                      </div>
                  <div className="col-12 col-md-9">
                  <div className="row" style={{height:`${this.state.installationheight}`,transition:"height 2s",overflow:"hidden"}}>
                  <div className="col-12 col-md-4" >
                  <b> Sanitary Appliances Installations</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.sanappinstallelemcost} name="sanappinstallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.sanappinstallcost} name="sanappinstallcost" className="form-control" /><br/>
                  </div>
                   <div className="col-12 col-md-4">
                   <b>Hot and Cold Water Services</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.hotcoldwaterelemcost} name="hotcoldwaterelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.hotcoldwatercost} name="hotcoldwatercost" className="form-control" /><br/>
                   </div>
                   <div className="col-12 col-md-4">
                   <b> Disposal Installations</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.disposalinstallelemcost} name="disposalinstallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.disposalinstallcost} name="disposalinstallcost" className="form-control" /><br/>
                   </div>
                   <div className="col-12 col-md-4" >
                  <b>HVAC installation (Pipe Only)</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.hvacinstallelemcost} name="hvacinstallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.hvacinstallcost} name="hvacinstallcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b> Electric Installation</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.electinstallelemcost} name="electinstallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.electinstallcost} name="electinstallcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b>Generator Installation</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.geninstallelemcost} name="geninstallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.geninstallcost} name="geninstallcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b> Lift and Conveyor Installation</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.liftconveyorelemcost} name="liftconveyorelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.liftconveyorcost} name="liftconveyorcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b> Fire and Lightening Protection</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.fireprotectelemcost} name="fireprotectelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.fireprotectcost} name="fireprotectcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b> Communication, Security and Control Systems</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.commcontrolelemcost} name="commcontrolelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.commcontrolcost} name="commcontrolcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b>Special Installation</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.specinstallelemcost} name="specinstallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.specinstallcost} name="specinstallcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b>A/C installation</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.acinstallelemcost} name="acinstallelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.acinstallcost} name="acinstallcost" className="form-control" /><br/>
                  </div>
                  <div className="col-12 col-md-4" >
                  <b>Builders Work</b><br/><br/>
                        <small>
                            Elemenatal Cost :
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.buildworkelemcost} name="buildworkelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.buildworkcost} name="buildworkcost" className="form-control" /><br/>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                  <div className="col-12 col-md-3" onClick={this.toggleexistingunits} style={{cursor:"pointer",padding:"10px"}}>
                      <p className="ml-5 subcat">
                          Work To Existing Building Units <span className="fa fa-chevron-right ml-1">></span>
                      </p>
                      </div>
                      <div className="col-12 col-md-9">
                          <div className="row" style={{overflow:"hidden",height:`${this.state.existingUnitsheight}`,transition:"height 2s"}}>
                          <div className="col-12 col-md-4">
                              <b>Renovation Works</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.renworkselemcost} name="renworkselemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.renworkscost} name="renworkscost" className="form-control" /><br/>
                          </div>
                          </div>
                      </div>
                </div>
                </div>
                <div className="col-12">
                      <div className="row mb-1" style={{backgroundColor:"white",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                <div className="col-12 col-md-3" onClick={this.toggleexternalworks} style={{cursor:"pointer",padding:"10px"}}>
                      <p className="ml-5 subcat">
                         External Works <span className="fa fa-chevron-right ml-1">></span>
                      </p>
                      </div>
                      <div className="col-12 col-md-9">
                          <div className="row" style={{height:`${this.state.externalWorksheight}`,transition:"height 2s",overflow:"hidden"}}>
                          <div className="col-12 col-md-4">
                              <b>Site Preparation Works</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.siteprepelemcost} name="siteprepelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.siteprepcost} name="siteprepcost" className="form-control" /><br/>
                          </div>
                          <div className="col-12 col-md-4">
                              <b>Roads, Paths, Paving and Surfacing</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.roadspathpavelemcost} name="roadspathpavelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.roadspathpavcost} name="roadspathpavcost" className="form-control" /><br/>
                          </div>
                          <div className="col-12 col-md-4">
                              <b>Landscaping, Planting, Irrigation Systems</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.landscaplantingelemcost} name="landscaplantingelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.landscaplantingcost} name="landscaplantingcost" className="form-control" /><br/>
                          </div>
                          <div className="col-12 col-md-4">
                              <b>Fencing (state type)</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.fencingelemcost} name="fencingelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.fencingcost} name="fencingcost" className="form-control" /><br/>
                          </div>
                          <div className="col-12 col-md-4">
                              <b>External PLumbing and Reticulation</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.explumbingelemcost} name="explumbingelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.explumbingcost} name="explumbingcost" className="form-control" /><br/>
                          </div>
                          <div className="col-12 col-md-4">
                              <b>External Electrification</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.exelectelemcost} name="exelectelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.exelectcost} name="exelectcost" className="form-control" /><br/>
                          </div>
                          <div className="col-12 col-md-4">
                              <b>External Damage</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.exdrainageelemcost} name="exdrainageelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.exdrainagecost} name="exdrainagecost" className="form-control" /><br/>
                          </div>
                          <div className="col-12 col-md-4">
                              <b>Minor Building Works and Ancillary Buildings</b><br/><br></br>
                              <small>
                            Elemenatal Cost:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.minorbuildingelemcost} name="minorbuildingelemcost" className="form-control" /><br/>
                        <small>
                            Cost / m2 of GFA:
                        </small><br/>
                        <input type="number" onChange={this.change} value={this.state.minorbuildingcost} name="minorbuildingcost" className="form-control" /><br/>
                          </div>
                          </div>
                          </div>
                          </div>
                      </div>
                      <div className="col-12">
                          <div className="row" style={{backgroundColor:"white",padding:"15px",boxShadow:"1px 2px 5px 2px lightgrey"}}>
                              <div className="col-12 col-md-6 col-lg-4">
 <b> SUB TOTAL </b><br/> <small className="text-muted">(FACILITATING AND BUILDING WORKS) :</small>
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.subtotal_fworks}  name="subtotal_fworks" className="form-control"/>
                            <br/>  </div>
                              
                              <div className="col-12 col-md-6 col-lg-4">
  Main Contractor's Preliminaries :
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.main_cp} name="main_cp" className="form-control"/>
                            <br/>  </div>
                              <div className="col-12 col-md-6 col-lg-5">
  <b> SUB TOTAL </b> <br/> <span className="text-muted">(FACILITATING AND BUILDING WORKS <small>Including main contractor's preliminaries</small>) :</span>
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.subtotal_fworks_cp} name="subtotal_fworks_cp" className="form-control"/>
        <br/>    </div>
                              <div className="col-12 col-md-6 col-lg-4">
  Project/Design Team Fees and Consultant Fees :
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.proteam_fees} name="proteam_fees" className="form-control"/>
        <br/>      </div>
                              <div className="col-12 col-md-6 col-lg-4">
  BASE COST ESTIMATE :
                                </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.base_ce} name="base_ce" className="form-control"/>
        <br/>        </div>
                              <div className="col-12 col-md-6 col-lg-4">
  Contingency/ Risk Allowance :
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.cont_ra} name="cont_ra" className="form-control"/>
        <br/>           </div>
        <div className="col-12 col-md-6 col-lg-4">
  <b>TOTAL COST ESTIMATE </b> <br/><small className="text-muted">(V.A.T EXCLUSIVE)</small> :
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.total_ce} name="total_ce" className="form-control"/>
        <br/>           </div>
        <div className="col-12 col-md-6 col-lg-4">
  <b>V.A.T (%)</b>  :
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.vat} name="vat" className="form-control"/>
        <br/>           </div>
        <div className="col-12 col-md-6 col-lg-4">
  <b>TOTAL COST ESTIMATE</b><br/> <small className="text-muted">(V.A.T INCLUSIVE)</small>  :
                              </div>
                              <div className="col-12 col-md-6 ">
        <input type="number" onChange={this.change} value={this.state.total_ce_vat} name="total_ce_vat" className="form-control"/>
        <br/>           </div>
        
        <div className="col-12">
            <button className="btn btn-primary" onClick={this.submit} style={{float:"right"}}>
                Submit
            </button>
        </div>
        <div className="col-sm-12 col-md-6 mb-3">
                        <button onClick={this.uploadcsv} style={{float:"right"}} className="btn btn-primary">
                            Upload CSV
                        </button>
                    </div>
                          </div>
                      </div>
                      </div>
                  
            </div>
         );
    }
}
 
export default ElementalCost;