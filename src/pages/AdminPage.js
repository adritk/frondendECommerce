import React, { Component } from 'react';
import Axios from 'axios'
import { API_URL } from '../helpers/API_URL'
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Button } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBContainer } from 'mdbreact';
import Navbar from '../component/Navbar'

class AdminPage extends Component {
    state = {
        products: [],
        selectId: null,
        selectIdDelete: null,
        openModal: false
    }

    componentDidMount() {
        this.getAllProducts()
    }

    getAllProducts = () => {
        Axios.get(API_URL + 'getallproduct')
            .then((res) => {
                console.log(res.data)
                this.setState({ products: res.data })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    renderProducts = () => {
        let { selectId, selectIdDelete } = this.state
        return (
            this.state.products.map((val, index) => {
                if (val.id === selectId) {
                    return (
                        <tr>
                            <td style={{ paddingTop: 25 }}>{index + 1}</td>
                            <td>
                                <Input defaultValue={val.name}
                                    innerRef={(name) => this.name = name}
                                />
                            </td>

                            <td>
                                <Input defaultValue={val.price}
                                    innerRef={(price) => this.price = price}
                                />
                            </td>

                            <td>
                                <Input defaultValue={val.description}
                                    innerRef={(description) => this.description = description}
                                />
                            </td>

                            <td>
                                <Input defaultValue={val.quantity}
                                    innerRef={(quantity) => this.quantity = quantity}
                                />
                            </td>

                            <td>
                                <select ref="imageType" defaultValue={val.category}>
                                <option>Choose Category</option>
                                <option value="handphone">Handphone</option>
                                <option value="laptop">Laptop</option>
                                <option value="aksesoris">Aksesoris</option>
                        </select>
                            </td>

                            <td>
                                <Input defaultValue={val.images}
                                    innerRef={(images) => this.images = images}
                                />
                            </td>
                            <td>
                                <MDBBtn color="warning" onClick={() => this.setState({ selectId: null })} size="md">No</MDBBtn>
                                <MDBBtn color="danger" onClick={() => this.editProduct(val.id)} size="md">Yes</MDBBtn>
                            </td>
                        </tr>
                    )
                } else if (selectIdDelete === val.id) {
                    return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{val.name}</td>
                            <td>Rp {parseInt(val.price).toLocaleString()}</td>
                            <td>{val.description}</td>
                            <td>{val.quantity}</td>
                            <td>{val.category}</td>
                            <td>{val.images}</td>
                            <MDBBtn color="warning" onClick={() => this.setState({ selectIdDelete: null })} size="md">Cancel</MDBBtn>
                            <MDBBtn color="danger" onClick={() => this.deleteProduct(val.id)} size="md">Confirm</MDBBtn>
                        </tr>
                    )
                }
                return (
                    <tr>
                        <td style={{paddingTop: 70}}>{index + 1}</td>
                        <td style={{paddingTop: 70}}>{val.name}</td>
                        <td style={{paddingTop: 70}}>Rp {parseInt(val.price).toLocaleString()}</td>
                        <td style={{paddingTop: 70}}>{val.description}</td>
                        <td style={{paddingTop: 70}}>{val.quantity}</td>
                        <td style={{paddingTop: 70}}>{val.category}</td>
                        <td>{<img src={val.images} alt="notfound" style={{ width: 100 }} />}</td>
                        <td>
                        <MDBBtn style={{marginTop: 50}} color="primary" onClick={() => this.setState({ selectId: (val.id) })} size="md">Edit</MDBBtn>
                        <MDBBtn style={{marginTop: 50}} color="danger" onClick={() => this.setState({ selectIdDelete: (val.id) })} size="md">Delete</MDBBtn>
                        </td>
                    </tr>
                )
            })
        )
    }

    deleteProduct = (id) => {
        Axios.delete(API_URL + `deleteproduct/${id}`)
            .then((res) => {
                alert('delete successfull')
                this.getAllProducts()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    addProduct = () => {
        let name = this.name.value
        let price = this.price.value
        let description = this.description.value
        let quantity = this.quantity.value
        let images = this.images.value
        let category = this.refs.imageType.value
        let details = {
            name,
            price,
            description,
            quantity,
            category,
            images
        }
        if(name && price && description && quantity && images && category) {
            Axios.post(API_URL + 'addproduct', details)
            .then((res) => {
                alert('Add Successfull')
                this.setState({openModal: false})
                this.getAllProducts()
            })
            .catch((err) => {
                console.log(err.message)
            })
        } else {
            alert('isi semua kolom')
        }
    }

    editProduct = (id) => {
        let name = this.name.value
        let price = this.price.value
        let description = this.description.value
        let quantity = this.quantity.value
        let images = this.images.value
        let category = this.refs.imageType.value
        let details = {
            name,
            price,
            description,
            quantity,
            category,
            images
        }
        Axios.put(API_URL + `editproduct/${id}`, details)
            .then((res) => {
                alert('Edit Successfull')
                this.getAllProducts()
                this.setState({ selectId: null })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        let { openModal } = this.state
        return (
            <div>
                <Navbar />
                <div style={{display: 'flex', justifyContent: 'center'}} >
                    <MDBBtn color="success" onClick={() => this.setState({ openModal: true })}>Add Product</MDBBtn>
                </div>
                <Modal isOpen={openModal} size="sm">
                    <ModalHeader>Add Package</ModalHeader>
                    <ModalBody >
                        <Label>
                            Product Name
                            <Input type="text"
                                innerRef={(name) => this.name = name} />
                        </Label>

                        <Label>
                            Price
                            <Input type="text"
                                innerRef={(price) => this.price = price} />
                        </Label>

                        <Label>
                            Description
                            <Input type="text"
                                innerRef={(description) => this.description = description} />
                        </Label>

                        <Label>
                            Quantity
                            <Input type="text"
                                innerRef={(quantity) => this.quantity = quantity} />
                        </Label>

                        <Label>
                            Images
                            <Input type="text"
                                innerRef={(images) => this.images = images} />
                        </Label>

                        <Label>
                            Category
                        </Label><br></br>
                        <select ref="imageType">
                            <option>Choose Category</option>
                            <option value="handphone">Handphone</option>
                            <option value="laptop">Laptop</option>
                            <option value="aksesoris">Aksesoris</option>
                        </select>

                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.addProduct}>Confirm</Button>
                        <Button color="warning" onClick={() => this.setState({ openModal: false })}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Images</th>
                            <th>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderProducts()}
                    </MDBTableBody>
                </MDBTable>


            </div>
        );
    }
}

export default AdminPage;