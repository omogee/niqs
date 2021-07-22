import React, { Component } from 'react';
import featureThree from "./images/feature3.jpg"
import featureTwo from "./images/feature2.jpg"
import featureOne from "./images/feature1.jpg"
import background from "./images/deep9.jpg"

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
  componentDidMount=()=>{
    document.title = 'NIQS DATABANK HOME';
  }
    render() { 
        /**
         *   <br/><br/>
                  <div style={{color:"white",fontWeight:"bold",marginTop:"200px"}}>
                      <center>
                     <h1>Build Anytime!</h1>
                     <small>Get your cost on any project right before you begin</small>
                     <div className="mt-5">
                       <button className="centerbtn btn btn-primary" style={{borderRadius:"10px",boxShadow:"1px 2px 3px 2px lightgrey"}}>
                           Get Data
                       </button>
                     </div>
                     <br/><br/>
                      </center>
                  </div>


                  
         */
        return ( 
            <div className="container-fluid" style={{margin:"0px",padding:"0px"}}>
                <div style={{backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundImage:`url(${background})`}}>
                <br/><br/>
                  <div style={{color:"white",fontWeight:"bold",marginTop:"200px"}}>
                      <center>
                     <h1>Build Anytime!</h1>
                     <small style={{textTransform:"capitalize"}}>Get your cost on any project right before you begin</small>
                     <div className="mt-5">
                    <a href="/explore">
                    <button className="centerbtn btn" style={{backgroundColor:"rgb(255, 102, 0)",color:"white",borderRadius:"10px",boxShadow:"1px 2px 3px 2px lightgrey"}}>
                           Get Data
                       </button>
                    </a>
                     </div>
                     <br/><br/>
                      </center>
                  </div>
                </div>
                <div  id="about" >
                    <div>
                    <center>
                        <br/><br/>  <br/><br/>  
                    <h1 className="text-primary mt-3">About Databank</h1>
                    </center>
                    <small className="centerText" style={{padding:"10px",display:"block",textTransform:"capitalize"}}>
                    Databank is an web application by The Nigerian Institute of Quantity Surveyors with the intention of simplifying the role of quantity surveying for the Professionals in the field creating cost analysis for varying projects and drilling down to the cost of labour / manpower, equipment and materials in diverse locations making it easy to deliver projects regardless of location at the click of a button.<br/><br/>
                    Databank Also Makes Available Market Trends For Ranges Of Materials Within The Economy To Facilitate Sustainable Decision Making Process For Professionals In The Industry.
                    </small>
                    </div>
                    </div>  
                    <center className="mt-5">
                     <h4 className="text-primary  mr-1">Features</h4>    
                    </center>  
                    <br/><br/>
                  <div className="featureimg">
                  <div className="centerlogo">
                       <center>
                    <img src={featureThree}  className="img-responsive"   alt=""/>
                    <h3 className="text-primary mt-5" style={{textTransform:"capitalize",fontWeight:"bold"}}>Simple</h3>
                    </center>
                    </div> 
                    <div className="centerlogo">
                       
                    <center>
                            <img src={featureTwo}  className="img-responsive"  alt=""/>
                            <h3 className="text-primary mt-5" style={{textTransform:"capitalize",fontWeight:"bold"}}>Effective</h3>
                         </center>
                          </div>
                          <div className="centerlogo">
                    <center>
                            <img src={featureOne}  className="img-responsive"  alt=""/>
                            <h3 className="text-primary mt-5" style={{textTransform:"capitalize",fontWeight:"bold"}}>Price Trend</h3>
                         </center>
                          </div>
                  </div>
                
                    <div id="contact" style={{height:"100%"}}>
                    <br/><br/><br/><br/>
                    <div style={{backgroundColor:"black",height:"100%"}}>
                    <div className="col-12 mt-5 mb-5"  >
                      <center>
                           <h1 style={{color:"white"}}> Contact Us</h1>
                </center>
                </div>  
                    <div className="col-12">
                      <div className="row">
                          <div className="d-none d-md-block col-md-3"></div>
                          <div className="col-12 col-md-6 col-lg-3" style={{color:"orange",float:"right"}}>
                              <small>
                                  <b>HEAD OFFICE ADDRESS</b><br/><br/>
                                  House No 24, NIQS Crescent,<br/>
                                  Off Michael Ama Nnachi Crescent,<br/>
                                  Cadastral Zone B6, Mabushi District,<br/>
                                  P.O.Box 10689 Garki,<br/>
                                  Abuja, Nigeria.<br/>
                                  <span className="fa fa-envelope"></span> : <a className="ml-2" href="mailto:info@niqs.org.ng">info@niqs.org.ng</a> <br/><br/>

                                  <b>LAGOS LIASON OFFICE ADDRESS</b><br/>
                                  Victoria Akan QS House,<br/>
                                  No 17/19 Idowu Taylor Street,<br/>
                                  Victoria Island,<br/>
                                  P.O.Box 2666 Marina,<br/>
                                 Lagos, Nigeria.<br/><br/>
                                  Tel: 08076484849, 09063937890
                              </small>
                          </div>
                          <div className="col-12 col-md-6 col-lg-3 mt-5" style={{color:"orange"}}>
                              NAME <br/>
                              <input type="text" className="form-control" style={{color:"white",backgroundColor:"black",border:"none",borderRadius:"0px",borderBottom:"1px solid orange"}}/>
                            <br/>  EMAIL ADDRESS <br/>
                              <input type="text" className="form-control" style={{color:"white",backgroundColor:"black",border:"none",borderRadius:"0px",borderBottom:"1px solid orange"}}/>
                              <br/>
                              MESSAGE <br/>
                              <input type="text" className="form-control" style={{color:"white",backgroundColor:"black",border:"none",borderRadius:"0px",borderBottom:"1px solid orange"}}/>
                              <center>
                                  <button className="btn btn-link" onClick={()=>alert("are you sure you want to submit this message")} style={{color:"orange"}}>SUBMIT</button>
                              </center>
                          </div>
                      </div>        
                      </div> 
                      <hr/>
                      <center>
                      <p className="text-muted">Copyright 2021 - NIQS Databank</p>
                      </center>
                  
                    </div>
                    </div>
            </div>
         );
    }
}
 
export default Landing;