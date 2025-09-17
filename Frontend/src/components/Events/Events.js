import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import hostAddress from '../constants';
//import logo from '../Images/yogaEvent.png';
//import 'bootstrap/dist/css/bootstrap.css';
//import '@fortawesome/fontawesome-free/css/all.min.css';
//import Navigationbar from '../Navigationbar';

//Define a Login Component
class Events extends Component{
    //call the constructor method
    constructor(props){
        super(props);
        this.state = {
            events:[],
            redirect:"",
            eventFlag : false,
            event_id:this.props.match.params.id
        }
        this.submitEvents = this.submitEvents.bind(this);
        
    }
    
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            homeFlag : false
        })
    }

    componentDidMount(){


        this.setState({
            events:[{event_location:"San Jose",event_name:"The Whisk", event_description:"Come and Learn new baking techniques",event_date:" 12th December 2024."},
            {event_location:"San Jose",event_name:"Food and Drinks", event_description:"Drinks with new menu",event_date:" July 1 2019"},
            {event_location:"San Jose",event_name:"Yoga", event_description:"Kids yoga under age 10",event_date:" Aug 16 2019"},
            {event_location:"San Jose",event_name:"Pizzeria", event_description:"Come and try new pizza's",event_date:" Aug 21 2019"},
            {event_location:"Phoenix",event_name:"Food and Drinks", event_description:"Drinks with new menu",event_date:" July 1 2019"},
            {event_location:"Maryland",event_name:"Yoga", event_description:"Kids yoga under age 10",event_date:" Aug 16 2019"},
            {event_location:"Fredrick",event_name:"Pizzeria", event_description:"Come and try new pizza's",event_date:" Aug 21 2019"}
        
        ]
        })
        // axios.get(`${hostAddress}/getevents/`)
        // .then((response)=>{
        //     this.setState({
        //         events: this.state.events.concat(response.data)
        //     })
        // })
    }

    // viewEvents(id){
    //     this.setState({redirect:`/eventdetails/${id}`});
    // }
    
    //submit event handler to send a request to the node backend
    submitEvents = (e,id) => {
        //prevent page from refresh
        e.preventDefault();
        alert("Registered Succesfully")
        const data = {
            event_id: id,
            user_id: localStorage.getItem("user_id")
            
        }
        //set the with credentials to true
        /*axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${hostAddress}/events`,data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        homeFlag : true
                    })
                }else{
                    this.setState({
                        homeFlag : false
                    })
                }
                

            });*/
    }
    

    render(){
        /*redirect based on successful login*/
        let redirectVar = null;
        if(this.state.homeFlag){
            redirectVar = <Redirect to= "/registeredEvents"/>
        }
            var details = this.state.events.map((event)=>{
                return(
                <div style = {{backgroundImage:`url(./download.jpeg) !important`}}>
                <React.Fragment>
                <nav class="navbar navbar-light bg-light">
                <form class="form-inline">
                <a class="logo-link" href="/home"></a>
                
            
                </form>
                </nav>
                </React.Fragment>
                
                <div class="card">
                <img class="card-img-top" src={event.event_image} class = "float-left"/>
                <div class='card-body'>
                <h5 class="card-title" class="font-weight-bold" style ={{color:"white"}}>{event.event_name}</h5>
                <p class="font-weight-bold" style ={{color:"white"}}> {event.event_description}</p>
                <form class="form-inline">
                <button
                style={{
                    width: '10%',
                    padding:'1px',
                    opacity: '1.0',
                        backgroundColor: 'white',
                        }}
                    type='button'
                    className='btn'>
                    
                </button>
                <p class="card-text" style ={{color:"white"}}>  {event.event_location}</p></form>
                <form class="form-inline">
                <button
                style={{
                    width: '10%',
                    padding:'1px',
                    opacity: '1.0',
                        backgroundColor: 'white',
                        }}
                    type='button'
                    className='btn'>
                   
            </button>
            <p class="card-text" style ={{color:"white"}}> {event.event_date}</p></form>
                <button onClick = {e=>this.submitEvents(e,event.event_id)} class="btn btn-primary">Register Event</button>
                </div></div>
                


            </div>
                )
            })
        return(
            <div>
            {redirectVar}
            {details}
            </div>
            
            
        )
    }
}

//export Login Component
export default Events;