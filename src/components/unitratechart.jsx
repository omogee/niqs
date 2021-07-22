import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import queryString from "query-string"
import axios from "axios"

class UnitRateChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startMonth:"",
          startyear:"",
          endMonth:"",
          endyear:"",
            labels: [],
            datasets: [
              {
                label: 'Unit Rates',
                backgroundColor: "rgb(51, 119, 255)",
                borderColor: 'red',
                borderWidth: 5,
                data: []
              }
            ],
            basic_cat:[]
          }
    }
  componentDidMount=()=>{
    document.title = 'NIQS DATABANK | UNIT RATES';
    axios.get(`https://niqsdatabank.herokuapp.com/api/v1/unitrate`)
    .then(res => this.setState({basic_cat:res.data.data},()=>{
      
    const months =["January","February","March","April","May","June","July", "August","September","October","November","Dec"]
     const parsedQuery = queryString.parse(this.props.location.search)
    const startMonth = parsedQuery.startmonth
    const endMonth = parsedQuery.endmonth  
    const startyear = parsedQuery.startyear
     const endyear = parsedQuery.endyear
     this.setState({startMonth,startyear,endMonth,endyear})
     const fullstart =[]
     const fullend =[]
if(startMonth.length > 0 && endMonth.length > 0 && startyear.length > 0 && endyear.length > 0){
        const firstpos = months.indexOf(startMonth)
        const secpos =  months.indexOf(endMonth)
         const secondset = months.slice(0,secpos)
    const firstSetMonth = months.slice(firstpos,months.length)

  const completeMonths =firstSetMonth.concat(secondset)
 
    if(parseInt(endyear) - parseInt(startyear) >= 3){
      alert("Warning!!! Price Trends cannot display Trends above 2 years")
        this.setState({yearOne:"",yearTwo:"",monthOne:"",monthTwo:""})
    }
    else if(startyear > endyear){
      alert("Warning!!! Please select a Feasible Trend Duration")
        this.setState({yearOne:"",yearTwo:"",monthOne:"",monthTwo:""})
    }
    else{
        console.log("complete length",completeMonths) 
const mainfirstMonths =[]
const mainsecondMonths =[]

this.state.basic_cat.map(cat =>{
console.log(cat.month,firstSetMonth)
if( firstSetMonth.includes(cat.month) && cat.year == startyear && !mainfirstMonths.includes({month:cat.month,year:cat.year,price:cat.price})){
  mainfirstMonths.push({month:cat.month,year:cat.year,price:cat.price})     
}
})
console.log(" set with prices",mainfirstMonths)

this.state.basic_cat.map(cat =>{
if(secondset.includes(cat.month) && cat.year == endyear && !mainsecondMonths.includes({month:cat.month,year:cat.year,price:cat.price})){
         mainsecondMonths.push({month:cat.month,year:cat.year,price:cat.price})        
}
   })
   console.log("mainsecondMonths set of months with prices",mainsecondMonths)
   console.log(startyear , endyear)
   if(startyear === endyear){
    let secondpos = secpos + 1
    console.log("secondpos", secpos,secondpos)
 const allSetMonth = months.slice(firstpos,secondpos)
 const mainallMonths =[]
 console.log("allmoths", allSetMonth)
 this.state.basic_cat.map(cat =>{   
     if(allSetMonth.includes(cat.month) && cat.year == endyear){
         mainallMonths.push({month:cat.month,year:cat.year,price:cat.price})    
         console.log()    
     }
        })
        console.log("mainallMonths set of months with prices",mainallMonths)
        const sorter = (a, b) => {
          if(a.year !== b.year){
             return a.year - b.year;
          }else{
             return months.indexOf(a.month) - months.indexOf(b.month);
          };
        };
        mainallMonths.sort(sorter)
        let fullresult = mainallMonths
        let mainresult=[]
        fullresult.map((result,i) =>{
            if(mainresult.length === 0){
mainresult.push({month:result.month,count:1,totalprice:result.price,year:result.year})
            }
else if( mainresult.find(p => p.month === result.month)){
 let found = mainresult.find(ob => result.month === ob.month && result.year === ob.year);
        if(found){
         found["count"] =found["count"] + 1
         found["totalprice"] = parseInt(found["totalprice"])+ parseInt(result.price)              
      }
     }else{
mainresult.push({month:result.month,count:1,totalprice:result.price,year:result.year})     
      }
 })
 console.log("result",mainresult)
        let fullmonths = mainresult.map(a => a.month+`(${a.year})`);
          let fullprice = mainresult.map(a => a.totalprice);
          console.log(fullmonths,fullprice)
          this.setState({labels:fullmonths})
          let datasets = this.state.datasets
          datasets.map(d =>{
            d.data = fullprice
          })
       
          this.setState({datasets})
          this.setState({fullmonth:JSON.stringify(fullmonths),fullprice:JSON.stringify(fullprice)})
}
else if(parseInt(endyear) - parseInt(startyear) === 2){
  
 const mainthirdMonths=[]
 const yearThree = parseInt(endyear) -1
 this.state.basic_cat.map(cat =>{   
     if(months.includes(cat.month) && cat.year == yearThree){
              mainthirdMonths.push({month:cat.month,year:cat.year,price:cat.price})        
     }
        })
        
        const sorter = (a, b) => {
          if(a.year !== b.year){
             return a.year - b.year;
          }else{
             return months.indexOf(a.month) - months.indexOf(b.month);
          };
        };
        mainsecondMonths.sort(sorter)
        mainfirstMonths.sort(sorter)
        mainthirdMonths.sort(sorter)
        let fullresult =mainfirstMonths.concat(mainthirdMonths).concat(mainsecondMonths)
        let mainresult=[]
        fullresult.map((result,i) =>{
            if(mainresult.length === 0){
mainresult.push({month:result.month,count:1,totalprice:result.price,year:result.year})
            }
else if( mainresult.find(p => p.month === result.month)){
 let found = mainresult.find(ob => result.month === ob.month && result.year === ob.year);
        if(found){
         found["count"] =found["count"] + 1
         found["totalprice"] = parseInt(found["totalprice"])+ parseInt(result.price)              
      }
     }else{
mainresult.push({month:result.month,count:1,totalprice:result.price,year:result.year})     
      }
 })
 console.log("result",mainresult)
        let fullmonths = mainresult.map(a => a.month+`(${a.year})`);
          let fullprice = mainresult.map(a => a.totalprice);
          this.setState({labels:fullmonths})
          let datasets = this.state.datasets
          datasets.map(d =>{
            d.data = fullprice
          })
       
          this.setState({datasets})
          console.log(fullmonths,fullprice)
          this.setState({fullmonth:JSON.stringify(fullmonths),fullprice:JSON.stringify(fullprice)})
}else{
 
 const sorter = (a, b) => {
  if(a.year !== b.year){
     return a.year - b.year;
  }else{
     return months.indexOf(a.month) - months.indexOf(b.month);
  };
};
mainsecondMonths.sort(sorter)
mainfirstMonths.sort(sorter)
 let fullresult =mainfirstMonths.concat(mainsecondMonths)
 let mainresult=[]
 fullresult.map((result,i) =>{
     if(mainresult.length === 0){
mainresult.push({month:result.month,count:1,totalprice:result.price,year:result.year})
     }
else if( mainresult.find(p => p.month === result.month)){
let found = mainresult.find(ob => result.month === ob.month && result.year === ob.year);
 if(found){
  found["count"] =found["count"] + 1
  found["totalprice"] = parseInt(found["totalprice"])+ parseInt(result.price)              
}
}else{
mainresult.push({month:result.month,count:1,totalprice:result.price,year:result.year})     
}
})
console.log("result",mainresult)
 let fullmonths = mainresult.map(a => a.month+`(${a.year})`);
   let fullprice = mainresult.map(a => a.totalprice);
   this.setState({labels:fullmonths})
   let datasets = this.state.datasets
   datasets.map(d =>{
     d.data = fullprice
   })

   this.setState({datasets})
   console.log(fullmonths,fullprice)
   this.setState({fullmonth:JSON.stringify(fullmonths),fullprice:JSON.stringify(fullprice)})
}
  
/*
 let fullresult =mainfirstMonths.concat(mainsecondMonths)
   let fullmonths = fullresult.map(a => a.month);
   let fullprice = fullresult.map(a => a.price);
   this.setState({labels:fullmonths})
   let datasets = this.state.datasets
   datasets.map(d =>{
     d.data = fullprice
   })

   this.setState({datasets})
   console.log(fullmonths,fullprice)
   this.setState({fullmonth:JSON.stringify(fullmonths),fullprice:JSON.stringify(fullprice)})
   */
}
}
})
    )
.catch(err=> console.log(err))

  }
    render() { 
      
      console.log(this.state)
        return ( 
          <div style={{width:"100%",height:"100%"}}>
        <div className="row" id="graph">
          <div className="col-12">
          <center>
            <div className="container" >
               <Line
          data={this.state}
          options={{
            title:{
              display:true,
              text:`Average Unit Rate From ${this.state.startMonth} ${this.state.startyear} to ${this.state.endMonth} ${this.state.endyear}`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
         
        />
            </div>
            </center>
            </div>
            
          </div>
          </div>
         );
    }
}
/**
 * <div className="container" >
               <Bar
          data={this.state}
          options={{
            title:{
              display:true,
              text:`Average Price From ${this.state.startMonth} ${this.state.startyear} to ${this.state.endMonth} ${this.state.endyear}`,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
         
        />
            </div>
 */
 
export default UnitRateChart;