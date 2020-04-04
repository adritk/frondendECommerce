import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Axios from 'axios';
import { API_URL } from '../helpers/API_URL';
import {Redirect} from 'react-router-dom'

class Register extends Component {
  state = {
    username: '',
    password: '',
    confirmPass: '',
    redirect : false
  }

  updateInputValueUsername(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  updateInputValuePassword(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  updateInputValueConfirm(evt) {
    this.setState({
      confirmPass: evt.target.value
    });
  }

  registerUser = () => {
    if(this.state.username !=='' && this.state.password !=='' && this.state.confirmPass !=='') {
      if(this.state.password === this.state.confirmPass) {
          Axios.post(API_URL + 'register', {
            username: this.state.username,
            password: this.state.password,
            role: 'user'
          })
          .then((res) => {
            alert('register successs')
            this.setState({redirect: true})
          })
      } else {
        alert('confirm password must be same')
      }
    } else {
      alert('please fill all this form')
    }
  }
    render() { 
        if(this.state.redirect) {
          return <Redirect to="/allproducts" />
        }
        return ( 
          <div id="background">
          <h2 style={{textAlign: 'center',paddingTop: 10}}>Register</h2>

          <div id="styleForm"> 
              <MDBInput type='text' label="Username" outline value={this.state.username} onChange={evt => this.updateInputValueUsername(evt)}/>
              <MDBInput type="password" label="Password" outline value={this.state.password} onChange={evt => this.updateInputValuePassword(evt)} />
              <MDBInput type="password" label="Confirm Password" outline value={this.state.confirmPass} onChange={evt => this.updateInputValueConfirm(evt)} />
          </div>
          
          <div className="text-center">
              <MDBBtn onClick={this.registerUser}>Register</MDBBtn>
          </div>

          <div id="donthaveaccount">
              <a href="/" style={{color:'black'}}>Have An Account? Sign In Here</a>
          </div>     
      </div>
       
         );
    }
}
 
export default Register;