import React, { Component } from 'react';
class Datasubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="container">
                <small style={{float:"right"}}>Hi Mariah</small>
                <br/>
                <center className="mt-2 mb-5">
                    <h3 className="text-primary">
                        Create a new section data submission
                    </h3>
                </center>

                <div className="row mt-5">
                    <div className="col-12 col-md-6 col-lg-3">
                        <input type="text" style={{borderColor:"lightblue",margin:"10px"}} className="form-control" placeholder="Choose Section"/>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <input type="text" className="form-control" style={{borderColor:"lightblue",margin:"10px"}} placeholder="Choose Location" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <input type="text" className="form-control" style={{borderColor:"lightblue",margin:"10px"}} placeholder="Choose Category"/>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <input type="text" className="form-control" style={{borderColor:"lightblue",margin:"10px"}} placeholder="Choose Sub-Category"/>
                    </div>
                   
                </div>
                 <br/>
                <div className="row">
                <div className="col-12">
                     <small className="text-primary" style={{fontWeight:"bold",fontSize:"16px"}}>Choose Description</small>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <br/>
                <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                     <small className="text-primary" style={{fontWeight:"bold",fontSize:"14px"}}>Choose Measurement</small>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                     <small className="text-primary" style={{fontWeight:"bold",fontSize:"14px"}}>Choose Unit</small>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                     <small className="text-primary" style={{fontWeight:"bold",fontSize:"14px"}}>Enter Price</small>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                     <small className="text-primary" style={{fontWeight:"bold",fontSize:"14px"}}>Choose Month/ Year</small>
                        <input type="text" className="form-control" />
                    </div>
                </div>
                <br/>
                <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                     <small className="text-primary" style={{fontWeight:"bold",fontSize:"14px"}}>Choose Dimension</small>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                     <small className="text-primary" style={{fontWeight:"bold",fontSize:"14px"}}>Enter Value</small>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <input type="text" className="form-control mt-4" placeholder="+ Add Another Dimension"/>
                    </div>
                </div>
                <br></br>
                <div className="row">
                   <div className="col-12">
                   <button className="btn btn-primary" style={{float:"right"}}>Submit</button>
                   </div>
                </div>
            </div>
         );
    }
}
 
export default Datasubmit;