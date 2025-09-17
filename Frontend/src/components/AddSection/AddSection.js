import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import hostAddress from '../constants';

import {addSection} from '../../js/actions/menu';
import { connect } from "react-redux";


let updateFlag=false;
let config = {
    headers:{
        'Authorization': "Bearer " + localStorage.getItem("jwtToken"),
        'Content-Type': 'application/json'
      }
  }
//Define a Login Component
class AddSection extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            sectionname : ""
        }
        //Bind the handlers to this class
        
       
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
   componentWillMount(){
   

    }


    //email change handler to update state variable with the text entered by the user
    onChangeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }



    //submit Register handler to send a request to the node backend
    submitForm= (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : cookie.load('email'),
            sectionname : this.state.sectionname
        }

if(this.sectionname.value=="" ){
alert("Please fill Section Name Field!");
}else{
   
    //  //set the with credentials to true
    //  axios.defaults.withCredentials = true;
    //  //make a post request with the user data
    //  axios.post('http://'+hostAddress+':3001/addsection/addsection',data,config)
    //  .then(response => {
    //      alert(response.data);
    //      console.log("Status Code : ",response.status);
    //      if(response.data.trim() == "Section Added Successfully!"){
    //        console.log("Hello New Section");
    //        updateFlag=true;
    //         this.setState({
    //         })
    //      }
         
    //  })

    this.props.addSection(data);
    if(this.props.addSectionMsg!=null){
        alert(this.props.addSectionMsg);
        updateFlag=true;
            this.setState({
            })
    }
        }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        if(cookie.load('cookie')=="customer"){
            redirectVar = <Redirect to= "/rlogin"/>
        }
        let goBack=null;
        if(updateFlag){
            goBack=window.location.reload();
        }
        return(
            <div>
                {redirectVar}
                {goBack}
            <div>
               <div>
               <h4>Add Section</h4>
                    <form>
                        <div class="form-group">
                                <input ref={(ref)=> this.sectionname=ref} style={{flex:"10",width :"80%"}} onChange = {this.onChangeHandler} type="text" class="form-control" name="sectionname" placeholder="Section Name" required/>
                            </div>
                           
                            <button onClick = {this.submitForm} class="btn btn-primary3" type="submit"> Add </button>                 

                            </form>
                    </div>
                   
                    </div>
            
            </div>
        )
    }
}


//export default AddSection;

function mapDispatchToProps(dispatch) {
    return {
        addSection : user => dispatch(addSection(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      addSectionMsg: store.addSectionMsg
    };
  }
 
  const AddSectionC = connect(mapStateToProps, mapDispatchToProps)(AddSection);
  export default AddSectionC;
