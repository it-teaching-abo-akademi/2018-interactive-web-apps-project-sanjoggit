import React, {Component, Fragment} from 'react';
import {Button, Row, Col, Table} from 'reactstrap'
import AddPortfolio from './AddPortfolio';
import AddStock from './AddStock';

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            portfolioName: '',
            stockName: '',
            stockAmount: '',
            modal: false,
            portfolio: []
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
             stocks: []
         }
         this.setState({
             portfolioName: ''
         })
         this.state.portfolio.unshift(portfolio);
         this.toggle();         
         
     }

     addStock = (id)=>{
        const stock = {
            stockName: this.state.stockName.toUpperCase(),
            stockAmount: this.state.stockAmount
        }
        this.setState({
            stockName: '',
            stockAmount: ''
        })
        this.state.portfolio[id].stocks.push(stock);
     }
    render() {
        console.log(this.state.portfolio);
        const portfolio = this.state.portfolio.map((item, i)=>(
                    <Col xs="12" lg="6" key={i}>
                        <div className="portfolio-container">
                            <span className="top-controller">
                                <p className="portfolio-name">{item.portfolioName}</p>
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
                            {item.stocks.map((item, i)=>(
                                <tbody key={i}>
                                    <tr>
                                        <td>{item.stockName}</td>
                                        <td>{item.stockAmount}</td>
                                        <td>4.866 EUR</td>
                                        <td>97.316 EUR</td>
                                        <td><input type="checkbox"/></td>
                                    </tr>
                                </tbody>
                            ))}
                            
                            </Table> 
                            <p>Total: 330.241 EUR</p>
                            <span className="bottom-controller">
                                <AddStock 
                                    color="primary"
                                    stockName= {this.state.stockName}
                                    stockAmount= {this.state.stockAmount}
                                    modal={this.state.modal}
                                    handleChange={this.handleChange}
                                    createPortfolio={this.createPortfolio}
                                    toggle={this.toggle}
                                    addStock = {this.addStock}
                                    id={i}
                                    />
                                <div>
                                    <Button color="info">Perf Graph</Button>
                                </div>
                                <div>
                                    <Button color="danger">Remove Selected</Button>   
                                </div>
                            </span>
                        </div>
                    </Col>
        ))
        
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
                <Row>{portfolio}</Row>
            </div>

        )
    }
}

export default Portfolio;