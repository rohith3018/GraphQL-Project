import React, { Component } from "react";
import "../../App.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";
// import hostAddress from '../constants';
// import axios from 'axios';
import { delieveredOrder } from "../../js/actions/orders";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

let orderList;
let total = [];
let currArr=[]; 
let c = -1;
let arr = [];
let ix = 0;
let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    "Content-Type": "application/json"
  }
};
const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "grey" : "white",
  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "pink" : "white",
  padding: grid
  //width: 250
});

class DeliveredOrder extends Component {
  constructor(props) {
    super(props);
    orderList = new Map();
    this.state = {
      //for pagination
      paginated_orders: null,
      results_per_page: 2,
      num_pages: 0,
      status: [],
      inc: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.reorder = this.reorder.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    console.log("I am here");
    const data = {
      email: cookie.load("email")
    };

    // axios.defaults.withCredentials = true;
    // axios.post('http://'+hostAddress+':3001/deliveredOrder/deliveredOrder',data,config)
    // .then((response) => {
    this.props.delieveredOrder(data);

    if (this.props.order != null) {
      let mapping = this.props.order.map(val => {
        for (var i = 0; i < val.orderDetails.length; i++) {
          var obj1 = {
            ID: val._id,
            customer: val.uname,
            address: val.uaddress,
            item: val.orderDetails[i].itemname,
            price: val.orderDetails[i].price,
            status: val.status,
            quantity: val.orderDetails[i].qty,
            totalPrice: val.price
          };
          if (orderList.has(val._id)) {
            var temp = orderList.get(val._id);
            temp.push(obj1);
            orderList.set(val._id, temp);
          } else {
            arr.push(val._id);
            orderList.set(val._id, [obj1]);
          }
        }
      });

       currArr = arr.slice(0, this.state.results_per_page);
      let currentOrders2 = new Map();
      currArr.forEach(i => {
        currentOrders2.set(i, orderList.get(i));
      });
      console.log("Hellooooo", currentOrders2);
      const pages = Math.ceil(arr.length / this.state.results_per_page);
      this.setState({
        num_pages: pages,
        paginated_orders: currentOrders2
      });
    }
    // });
  }

  reorder = (list, startIndex, endIndex) => {
    // const result = Array.from(list);
    // const [removed] = result.splice(startIndex, 1);
    // result.splice(endIndex, 0, removed);

    // let currentOrders2 = new Map();
    // result.forEach(i => {
    //   currentOrders2.set(i, this.state.paginated_orders.get(i));
    // });
    console.log(currArr)
    //console.log("Sonu is checking again")
    let currentOrders2 = new Map();
    for(var i=0;i<currArr.length;i++){
      currentOrders2.set(currArr[this.state.results_per_page-(1+i)],list.get(currArr[this.state.results_per_page-(1+i)]))
    }
    return currentOrders2;
  };

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = this.reorder(
      this.state.paginated_orders,
      result.source.index,
      result.destination.index
    );
    this.setState({
      paginated_orders: items
    });
  }

  handlePageClick(data) {
    console.log(data.selected);
    let page_number = data.selected;
    let offset = Math.ceil(page_number * this.state.results_per_page);
     currArr = arr.slice(offset, offset + this.state.results_per_page);
    let currentOrders2 = new Map();
    currArr.forEach(i => {
      currentOrders2.set(i, orderList.get(i));
    });
    this.setState({
      paginated_orders: currentOrders2
    });
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/rlogin" />;
    }
    if (cookie.load("cookie") == "customer") {
      redirectVar = <Redirect to="/rlogin" />;
    }
    let display = [];
    //let addData=[];
    let details;
    if (this.state.paginated_orders != null) {
      details = this.state.paginated_orders.forEach((v, k, order) => {
        ix = arr.indexOf(k) - 1;
        let addData = [];
        console.log(order);
        console.log(" Yahahhahahaccchs");
        console.log(k);
        console.log(v);

        // let det=v.forEach(det=>{
        //     total[c]+=det.price
        //     console.log(det);
        //     addData.push(
        //         <tr class="card">
        //         <td>{det["item"]}</td>
        //         <td></td>
        //         <td>{det.quantity}</td>
        //         <td>${det.price}</td>
        //         </tr>
        //     )
        //     })

        display.push(
          <Draggable key={v[0].ID} draggableId={v[0].ID} index={ix}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                <div
                  class="card"
                  style={{
                    width: " 40rem",
                    border: "2px solid grey",
                    margin: "5px",
                    padding: "8px"
                  }}
                >
                  <div class="card-body">
                    <h4 class="card-title">
                      <b>Customer : {v[0].customer}</b>
                    </h4>
                    <h5 class="card-title">Status : {v[0].status}</h5>
                    <table class="table">
                      <tr
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          marginTop: "10px"
                        }}
                      >
                        <td>Item Name</td>
                        <td></td>
                        <td>Item Quantity</td>
                        <td>Item Price</td>
                      </tr>
                      <tbody>
                        {v.forEach(det => {
                          total[c] += det.price;
                          console.log(det);
                          addData.push(
                            <tr class="card">
                              <td>{det["item"]}</td>
                              <td></td>
                              <td>{det.quantity}</td>
                              <td>${det.price}</td>
                            </tr>
                          );
                        })}
                        {addData}
                      </tbody>
                    </table>

                    <div>
                      <hr></hr>
                      <pre>
                        <b> Total Amount : $ {v[0].totalPrice} </b>
                      </pre>
                      <hr></hr>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        );
        total[++c] = 0;
        addData = [];
      });
    } else {
      details = <div style={{ margin: "35px" }}> Nothing to Show!:(</div>;
    }
    return (
      <div>
        {redirectVar}

        <div
          class="container"
          style={{ backgroundColor: "white", width: "60%", opacity: "80%" }}
        >
          <h3>Delivered Orders</h3>
          <hr></hr>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {details}
                  {display}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="row" style={{ margin: "30px" }}>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.num_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    );
  }
}

//export default DeliveredOrder;

function mapDispatchToProps(dispatch) {
  return {
    delieveredOrder: user => dispatch(delieveredOrder(user))
  };
}

function mapStateToProps(store) {
  return {
    order: store.deliveredOrder
  };
}

const DeliveredOrderC = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveredOrder);
export default DeliveredOrderC;
