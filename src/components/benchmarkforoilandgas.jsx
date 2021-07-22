import React, { Component } from 'react';

import axios from "axios"
import deep19 from "./images/deep19.jpg"

class BenchmarkForOilandGas extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | BENCHMARK FOR OIL AND GAS';
    }
    render() { 
        return ( 
            <div className="container">
                <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                    <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px", margin:"0px",height:"100%"}} src={`${deep19}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center >
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>BENCHMARKS FOR OIL AND GAS INDUSTRIES</small><br/>
                    <div className="lgpadding mb-2" style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small style={{padding:'10px'}}>Gives cost of building Normal/Modular Refineries of different capacities, etc.</small> </div>
                    </div>
                    </center>
                    </div>                  
                 </div>
            </div>
         );
    }
}
 
export default BenchmarkForOilandGas;