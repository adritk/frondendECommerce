import React, { Component } from 'react';
import Axios from 'axios'
import {API_URL} from '../helpers/API_URL'
import { MDBBtn, MDBCard, MDBContainer, MDBCardBody, MDBCardTitle,MDBCardImage, MDBRow, MDBCardText, MDBCol } from 'mdbreact';
import NavbarUser from '../component/NavbarUser';
class Laptop extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        Axios.get(API_URL + 'getproductlaptop')
        .then((res) => {
            this.setState({products: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderProduct = () => {
        return (
            this.state.products.map((val,index) => {
                return (
                    <MDBCard style={{ width: "230px", height: '500px', margin: '20px auto'}}>
                    <MDBCardImage style={{height: '300px', paddingTop: 0}} className="img-fluid" src={val.images} waves />
                    <MDBCardBody>
                <MDBCardTitle>{val.name}</MDBCardTitle>
                      <MDBCardText>
                        {val.description}
                      </MDBCardText>
                        <MDBBtn>Rp {parseInt(val.price).toLocaleString()}</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
            )
        })
        )
    }

    render() {
        return (
            <div>
            <NavbarUser />
            <MDBContainer>
                <div className="background">
                    <MDBRow>
                        {this.renderProduct()}
                    </MDBRow>
                </div>
            </MDBContainer>
            </div>
        );
    }
}

export default Laptop;