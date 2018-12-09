import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

class AddStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        }
      }
    
      toggle =()=> {
        this.setState({
          modal: !this.state.modal
        });
      }
    render() {        
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        const {stockName, stockAmount, modal, handleChange, toggle, addStock, id} = this.props;
        return (
            <Row>
                <Col xs="12">
                    <Button color="primary" className="add-btn" onClick={this.toggle}>Add Stock</Button>
                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>Create new portfolio</ModalHeader>
                        <ModalBody>
                            <form>
                                <div>
                                    <label><h6>Stock Name</h6></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Stock Name"
                                        name="stockName"
                                        style={{textTransform: 'uppercase'}}
                                        value={stockName}
                                        onChange={handleChange}
                                        />
                                </div>
                                <div>
                                    <label><h6>Stock Amount</h6></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="0" 
                                        name="stockAmount"
                                        value={stockAmount}
                                        onChange={handleChange}
                                        />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>addStock(id)}>Create</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        )
    }
}

export default AddStock;