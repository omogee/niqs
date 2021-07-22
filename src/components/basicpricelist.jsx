import React, { Component } from 'react';
import axios from "axios";
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import deep10 from "./images/deep10.jpg"
import 'jspdf-autotable'
import logo from "./images/laaga.png"
import Cookie from "js-cookie"

class BasicPrice extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Advancefilter:false,
            filterheight:"0px",
            filtericon:"fa fa-chevron-down",
            basic_cat:[],
            newbasic_cat:[],
            location:"",
            category:"",
            subcat:"",
            monthOne:"",
            monthTwo:"",
            yearOne:"",
            yearTwo:"",
            downloaddisplay:"none",
            fullmonth:"",
            fullprice:"",
            showtrends:false
         }
    }
    componentDidMount=()=>{
        document.title = 'NIQS DATABANK | BASIC PRICELIST';
        axios.get(`https://niqsdatabank.herokuapp.com/api/v1/basicpricelist`)
        .then(res => this.setState({basic_cat:res.data.data},()=>{
            console.log(this.state.basic_cat)
        })
        )
        .catch(err=> console.log(err))
    }
    change=(e)=>{
        const newbasic_cat = []
        this.setState({[e.target.name]:e.target.value},()=>{
            this.state.basic_cat.map(cat=>{
                if((this.state.subcat.length === 0 && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat.length === 0 && this.state.category.length === 0 && this.state.location.length > 0 && cat.location.toLowerCase() === this.state.location.toLowerCase()) || (this.state.subcat.length> 0 && cat.sub_category.toLowerCase() === this.state.subcat.toLowerCase() && cat.category.toLowerCase() === this.state.category.toLowerCase() && cat.location.toLowerCase() === this.state.location.toLowerCase())){
                    newbasic_cat.push(cat)
                }
            })
            this.setState({newbasic_cat})
     const months =["January","February","March","April","May","June","July", "August","September","October","November","Dec"]

            const startMonth = this.state.monthOne
            const endMonth = this.state.monthTwo
            const startyear = this.state.yearOne
             const endyear = this.state.yearTwo
             const fullstart =[]
             const fullend =[]
 if(startMonth.length > 0 && endMonth.length > 0 && this.state.yearOne.length > 0 && this.state.yearTwo.length > 0){
                const firstpos = months.indexOf(this.state.monthOne)
                const secpos =  months.indexOf(this.state.monthTwo)
                console.log(firstpos)
                 const secondset = months.slice(0,secpos)
            const firstSetMonth = months.slice(firstpos,months.length)
  
          const completeMonths =fullstart.concat(fullend)
           if(parseInt(this.state.yearTwo) - parseInt(this.state.yearOne) >= 3){
                alert("Warning!!! Price Trends cannot display Trends above 2 years")
                this.setState({yearOne:"",yearTwo:"",monthOne:"",monthTwo:""})
            }
            else if(parseInt(this.state.yearOne) > parseInt(this.state.yearTwo)){
                alert("Warning!!! Please select a Feasible Trend Duration")
                this.setState({yearOne:"",yearTwo:"",monthOne:"",monthTwo:""})
            }
            else{
                console.log("complete length",completeMonths) 
                const difference = parseInt(this.state.yearTwo) - parseInt(this.state.yearOne)
  const mainfirstMonths =[]
  const mainsecondMonths =[]
    this.state.basic_cat.map(cat =>{
        console.log(cat.month,firstSetMonth)
 if( firstSetMonth.includes(cat.month) && cat.year == this.state.yearOne){
          mainfirstMonths.push({month:cat.month,year:cat.year,price:cat.price})     
          console.log("yes")   
 }
    })
    console.log(" set with prices",mainfirstMonths)
    this.state.basic_cat.map(cat =>{  
        if(secondset.includes(cat.month) && cat.year == this.state.yearTwo){
                 mainsecondMonths.push({month:cat.month,year:cat.year,price:cat.price})        
        }
           })
           if(this.state.yearOne === this.state.yearTwo){
               let secondpos = secpos + 1
               console.log("secondpos", secondpos)
            const allSetMonth = months.slice(firstpos,secondpos)
            const mainallMonths =[]
            console.log("allmoths", allSetMonth)
            this.state.basic_cat.map(cat =>{   
                if(allSetMonth.includes(cat.month) && cat.year == this.state.yearTwo){
                    mainallMonths.push({month:cat.month,year:cat.year,price:cat.price})    
                    console.log()    
                }
                   })
                   console.log("mainallMonths set of months with prices",mainallMonths)
                   let fullresult = mainallMonths
                     let fullmonths = fullresult.map(a => a.month);
                     let fullprice = fullresult.map(a => a.price);
                     console.log(fullmonths,fullprice)
                     this.setState({fullmonth:JSON.stringify(fullmonths),fullprice:JSON.stringify(fullprice),showtrends:true})
        }
      else if(parseInt(this.state.yearTwo) - parseInt(this.state.yearOne) === 2){
            const mainthirdMonths=[]
            const yearThree = parseInt(this.state.yearTwo) -1
            this.state.basic_cat.map(cat =>{   
                if(months.includes(cat.month) && cat.year == yearThree){
                         mainthirdMonths.push({month:cat.month,year:cat.year,price:cat.price})        
                }
                   })
                   console.log("mainsecondMonths set of months with prices",mainsecondMonths)
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
                     console.log(fullmonths,fullprice)
                     this.setState({fullmonth:JSON.stringify(fullmonths),fullprice:JSON.stringify(fullprice),showtrends:true})
        }else{
            console.log("mainsecondMonths set of months with prices",mainsecondMonths)
            let fullresult =mainfirstMonths.concat(mainsecondMonths)
              let fullmonths = fullresult.map(a => a.month);
              let fullprice = fullresult.map(a => a.price);
              console.log(fullmonths,fullprice)
              this.setState({fullmonth:JSON.stringify(fullmonths),fullprice:JSON.stringify(fullprice),showtrends:true})
        }
        }
        }
        })
    }
    togglefilterheight=()=>{
        if(this.state.filterheight === "0px"){
            this.setState({filterheight:"100%",filtericon:"fa fa-chevron-up"})
        }else{
            this.setState({filterheight:"0px",filtericon:"fa fa-chevron-down"})
        }
    }
   
    showTrends=()=>{
       if(this.state.showtrends){
       window.location.href= `/price/chart?startmonth=${this.state.monthOne}&endmonth=${this.state.monthTwo}&startyear=${this.state.yearOne}&endyear=${this.state.yearTwo}`
    }else{
        alert("Please Select a Specific Duration")
    }
    }
    downloadtable=()=>{
        this.setState({downloaddisplay:"block"})
        const doc = new jsPDF()
        const d = new Date()
var image = new Image();
      image.src = logo;
    doc.addImage(image, 'PNG',20, 0, 40, 30); 
        doc.setFontSize(20);
        doc.text("Basic Price Lists",70,30)
doc.autoTable({startY:33, html: '#table',margin: { top: 5 }, })
doc.setFontSize(8);
doc.text(`${d}`, 50, doc.internal.pageSize.height - 10)
doc.save("basicpricelists.pdf")
this.setState({downloaddisplay:"none"})
      }
    render() {
        const headers =["s/no","state", "description","measurement","price","month","year"]
       const states =[]
        const category =[]
        const subcategory=[]
      
        this.state.basic_cat.map(cat=>{
            if(!states.includes(cat.location)){
             states.push(cat.location)
            }         
          if(!category.includes(cat.category) && cat.location === this.state.location){
         category.push(cat.category)
          }         
          if(!subcategory.includes(cat.sub_category) && cat.location === this.state.location && cat.category === this.state.category){
          subcategory.push(cat.sub_category)
          }
        })
        let year =1970
          let years = []
          let dummyArray = new Array(52).fill(undefined)
          dummyArray.map((array,i)=>{
                  years.push(year+i)
          })

          const months =["January","February","March","April","May","June","July", "August","September","October","November","Dec"]

        return ( 
            <div className="container" style={{textTransform:"capitalize",width:"100%",overflow:"hidden"}}>
              <div className="row" >
                  <div className="col-12">
                      <div className="row" style={{backgroundColor:"lightblue",padding:"0px"}}>
                         <div className="col-3 col-md-2" style={{padding:"0px",margin:"0px"}}>
                    <img style={{width:"100%",padding:"0px",height:"100%", margin:"0px"}} src={`${deep10}`} alt=""/>
                    </div>
                    <div className="col-9 col-md-10 text-primary">
                    <center className="mr-1">
                        <div className="description">
                    <small style={{fontSize:"18px",fontWeight:"bold"}}>BASIC PRICE LISTS</small><br/>
                    <div style={{border:"1px solid white",borderRadius:"5px",fontSize:"14px"}}><small>Comprises current market prices of materials used in the Construction Industry. Information contained in this section is useful to Consultants, Clients’ Organizations, Contractors and Suppliers.</small> </div>
                    <small style={{fontSize:"11px"}}>Click the filter button to display more advanced option parameters</small>
                    </div>
                    </center>
                    </div>   
                      </div>
                  </div>
                <div className="col-12 mt-4">
                <div className="row">
                
        <div className="d-none d-md-block col-md-2">
                         <button className="btn btn-primary " onClick={this.togglefilterheight}>
                            <small>filter <span className={`${this.state.filtericon} ml-1`}></span></small>
                         </button>          
                     </div>                    
                     <div className="col-12 col-md-3">
                     <select name="location" className="form-control" id="location" onChange={this.change} value={this.state.location}>
               <option value="">Select Location</option>
              {states.map(state =>                 
               <option value={`${state}`}>{state}</option>
               )}
             </select><br/>
                     </div>    
                     <br/><br/>
                     <div className="col-12 col-md-3">
                     <select name="category" className="form-control" id="category" onChange={this.change} value={this.state.category}>
               <option value="">Select Category</option>
              {category.map(cat =>                 
               <option value={`${cat}`}>{cat}</option>
               )}
             </select><br/>
                     </div>
                     <br/><br/>
                     <div className="col-12 col-md-3">
                     <select name="subcat" className="form-control" id="subcat" onChange={this.change} value={this.state.subcat}>
               <option value="">Select Sub-Category</option>
              {subcategory.map(subcat =>                 
               <option value={`${subcat}`}>{subcat}</option>
               )}
             </select><br/>
                     </div>
                     <br/><br/>
                     <div className="col-6 d-md-none">
                         <button className="btn " style={{float:"right",border:"1px solid lightgrey"}} onClick={this.togglefilterheight}>
                            <small> Filter <span className={`${this.state.filtericon} ml-1`}></span></small>
                         </button>
                        
                     </div>
                     <div className="col-6 col-md-1" style={{display:`${this.state.filterheight === "100%" ? "none" : "block"}`}}>
                         <button style={{float:"right"}} className="btn btn-primary">Go</button>
                     </div>                    
                
                     <div className="col-12">       
                         <div className="row" style={{height:`${this.state.filterheight}`,transition:"height 2s",overflow:"hidden"}}>
                         <div className="col-12 col-md-2 col-lg-1">
                          <small> From :</small>
                      </div>
                      <div className="col-12 col-md-5 col-lg-2">
   <select name="monthOne" className="form-control"  onChange={this.change} value={this.state.monthOne}>
               <option value="">month</option>
              {months.map(month =>                 
               <option value={`${month}`}>{month}</option>
               )}
             </select><br/>
                      </div>
                      <div className="col-12 col-md-5 col-lg-2">
                          <div className="row">
                              <div className="col-2">
                              <small style={{fontSize:"20px"}}>/</small>
                              </div>
                              <div className="col-10">
                              <select name="yearOne" className="form-control" onChange={this.change} value={this.state.yearOne}>
               <option value="">Year</option>
              {years.map(year =>                 
               <option value={`${year}`}>{year}</option>
               )}
             </select><br/>
                              </div>
                          </div>
                          
                      </div>
                      <div className="col-12 col-md-2 col-lg-1">
                          To :
                      </div>
                      <div className="col-12 col-md-5 col-lg-2">
   <select name="monthTwo" className="form-control"  onChange={this.change} value={this.state.monthTwo}>
               <option value="">month</option>
              {months.map(month =>                 
               <option value={`${month}`}>{month}</option>
               )}
             </select><br/>
                      </div>                    
                      <div className="col-12 col-md-5 col-lg-2">
                          <div className="row">
                              <div className="col-2">
                              <small style={{fontSize:"20px"}}>/</small>
                              </div>
                              <div className="col-10">
                              <select name="yearTwo" className="form-control" id="yearTwo" onChange={this.change} value={this.state.yearTwo}>
               <option value="">Year</option>
              {years.map(year =>                 
               <option value={`${year}`}>{year}</option>
               )}
             </select><br/>
                              </div>
                          </div>
                          
                      </div>
                      <div className="col-12 col-lg-2">
                          <button  className="btn btn-primary" onClick={this.showTrends}>
                              <small>Show Trends</small>
                          </button>
                      </div>
                         </div>



                </div>  
                 </div><br/><br/>
                 <div className="mt-1" style={{width:"100%",overflow:"auto"}}>
                 <table className="table table-striped table-bordered" id="table">
                <thead>
                <tr style={{backgroundColor:"orange",color:"white"}}>
                   {headers.map(header=>
                    <th style={{fontSize:"13px",fontWeight:"normal"}}>{header}</th>
                    )}
                </tr>
                </thead>
                <tbody>
                        {this.state.newbasic_cat.length > 0 ?
                       this.state.newbasic_cat .map((basic,i) => 
                        basic.isApproved ?
                    <tr>
                          <td >{i+1}</td>
                      <td >{basic.location}</td> 
                        <td style={{fontSize:"14px"}}>{basic.description}</td>
                         <td >{basic.measurement}</td>  
                         <td >{basic.price}</td>  
                         <td>{basic.month}</td>
                         <td>{basic.year}</td>  
                              </tr>  
                              : null                                        
                            )  :
                            this.state.basic_cat .map((basic,i) => 
                                basic.isApproved ?
                        <tr>    
                         <td >{i+1}</td>
                         <td >{basic.location}</td> 
                           <td style={{fontSize:"14px"}}>{basic.description}</td>
                            <td >{basic.measurement}</td>  
                            <td >{basic.price}</td>  
                            <td>{basic.month}</td>
                            <td>{basic.year}</td>            
                             </tr>            
                             : null                                      
                               ) 
                            }
                   
                </tbody>
                </table>
                </div>
                </div>
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
                    <a href="/forms/basicpricelist">
                    <button className="btn btn-primary" style={{float:"right"}}>
                       + Add Item
                    </button>
                    </a>
                    : null}
                </div>
            </div>
         );
    }
}
 
export default BasicPrice;