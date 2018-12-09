import React, {Component} from 'react';
import {Button, Row, Col, Table} from 'reactstrap';
import AddPortfolio from './AddPortfolio';

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            portfolioName: '',
            stockName: '',
            stockAmount: '',
            modal: false
        }
    }
    toggle = () =>{
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
        
     }
 
     createPortfolio = ()=>{
         const portfolio = {
             portfolioName: this.state.portfolioName,
             stockName: this.state.stockName.toUpperCase(),
             stockAmount: this.state.stockAmount
         }
         this.setState({
             portfolioName: '',
             stockName: '',
             stockAmount: ''
         })
 
         this.toggle();
         console.log('portfolio', portfolio);
         
         
     }
    render() {
        return (
            <div>
                <AddPortfolio 
                    portfolioName= {this.state.portfolioName}
                    stockName= {this.state.stockName}
                    stockAmount= {this.state.stockAmount}
                    modal={this.state.modal}
                    handleChange={this.handleChange}
                    createPortfolio={this.createPortfolio}
                    toggle={this.toggle}
                />
                <Row>
                    <Col xs="12" lg="6">
                        <div className="portfolio-container">
                            <span>
                                <p className="portfolio-name">Portfolio Name</p>
                                <Button color="primary">Show in Dollars</Button>
                                <Button color="danger">X</Button>
                            </span>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Stock</th>
                                        <th>Amount</th>
                                        <th>Unit Value</th>
                                        <th>Total Value</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>NOK</td>
                                        <td>20</td>
                                        <td>4.866 EUR</td>
                                        <td>97.316 EUR</td>
                                        <td><input type="checkbox"/></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <p>Total: 330.241 EUR</p>
                            <span>
                                <Button color="primary">Add stock</Button>
                                <Button color="info">Perf Graph</Button>
                                <Button color="danger">Remove Selected</Button>                                
                            </span>
                        </div>
                    </Col>
                    <Col xs="12" lg="6">
                        hello
                    </Col>
                </Row>
            </div>

        )
    }
}

export default Portfolio;