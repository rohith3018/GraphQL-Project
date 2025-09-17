import React, {Component} from 'react';
import '../../App.css';
// import axios from 'axios';
// import hostAddress from '../constants';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {pastOrder} from '../../js/actions/orders';
import { connect } from "react-redux";


let orderList;
let total=[];
let c=-1;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }

class PastOrders extends Component {
    constructor(props){
            super(props);
            orderList=new Map();
            this.state = {  
                cart: []
            }
    }  
    componentDidMount(){
        console.log("I am here")
        const data = {
            email : cookie.load('email')
        }
      
        // axios.defaults.withCredentials = true;
        // axios.post('http://'+hostAddress+':3001/pastOrder/pastOrder',data,config)
        // .then((response) => {
            this.props.pastOrder(data);

        if(this.props.order!=null){
        let mapping=this.props.order.map(val=>{
            for(var i=0;i<val.orderDetails.length;i++){
            var obj1={
                "ID": val._id,
                "restaurant":val.rname,
                "item":val.orderDetails[i].itemname,
                "price":val.orderDetails[i].price,
                "status":val.status,
                "quantity": val.orderDetails[i].qty
        }
        if(orderList.has(val._id)){
            var temp=orderList.get(val._id);
            temp.push(obj1);
            orderList.set(val._id,temp);
        }else{
            orderList.set(val._id,[obj1]);
        }
    }
        })

        console.log(orderList)
        this.setState({
        })
    }
  //  });
    }
    onDragEnd = result => {
        // To do Later Order columns
      };

    render(){
    
    let redirectVar = null;
    if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/login"/>
    }
    if(cookie.load('cookie')=="restaurant"){
        redirectVar = <Redirect to= "/login"/>
    }
    let display=[];
    let addData=[];
       let details = orderList.forEach ( (v,k,order) => {
           console.log(order);
           console.log(" Yahahhahahahs")
console.log(k)
console.log(v)


total[++c]=0
 display.push(<div>
               <br></br>
              <div><h4>Restaurant : {v[0].restaurant}</h4></div>
              <div> <b>Status :  {v[0].status}</b></div>
              <hr></hr>
              <div>
                  <table class="table">
                      <thead style={{backgroundColor:"red", height :"20px", color: "white", margin: "10px"}}>
                          <th>Item Name</th>
                          <th>Item Quantity</th>
                          <th>Item Price</th>
                      </thead>
                      <tbody>
                         
                      </tbody>
                      </table>
              </div>
          </div>) 

                 
    v.forEach(det=>{
    total[c]+=det.price
    console.log(det);
    display.push(
    
        <table>
        <td><div style={{marginRight:"40px"}}>{det["item"]}</div></td>
         <td> </td>
        <td><div style={{marginRight:"50px",marginLeft:"40px"}}>{det.quantity}</div></td>
        <td> </td> 
        <td><div style={{marginLeft:"80px"}}>${det.price}</div></td>
        </table>
   

   
    )
    })

        display.push(<div>
            <hr></hr>
            <pre>
            <b> Total Amount : $ {total[c]} </b>
            </pre>
            <hr></hr>
        </div>  
        )
       }
    )        
        return(
            <div>
                {redirectVar}
                
                <div class="container" style={{backgroundColor:"white", width:"60%",opacity:"80%"}}>
                        <h3>Past Orders</h3>
                        
                      {details}
                      {display}
                </div> 
                
            </div> 
        )
    }
}

//export default PastOrders;

function mapDispatchToProps(dispatch) {
    return {
        pastOrder: user => dispatch(pastOrder(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      order: store.pastOrder
    };
  }
 
  const PastOrdersC = connect(mapStateToProps, mapDispatchToProps)(PastOrders);
  export default PastOrdersC;