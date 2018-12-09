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

class AddPortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            
        };
    }

    

    
    render() {        
        const closeBtn = <button className="close" onClick={this.props.toggle}>&times;</button>;
        const {portfolioName, stockName, stockAmount, modal, handleChange, createPortfolio, toggle} = this.props;
        return (
            <Row>
                <Col xs="12">
                    <Button color="primary" className="add-btn" onClick={toggle}>Add Portfolio</Button>
                    <Modal
                        isOpen={modal}
                        toggle={toggle}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle} close={closeBtn}>Create new portfolio</ModalHeader>
                        <ModalBody>
                            <form>
                                <div>
                                    <label><h6>Portfolio Name</h6></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Portfolio Name" 
                                        name="portfolioName"
                                        value={portfolioName}
                                        onChange={handleChange}
                                        />
                                </div>
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
                            <Button color="primary" onClick={createPortfolio}>Create</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        )
    }
}

export default AddPortfolio;