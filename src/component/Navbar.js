import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

class Navbar extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

onBtnLogout = () => {
  localStorage.removeItem('role')
}

render() {
  return (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">Simple Crud</MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
                <MDBNavLink to="/" onClick={this.onBtnLogout}> Logout</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>

        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navbar;