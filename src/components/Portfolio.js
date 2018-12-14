import React, {Component} from 'react';
import {Button, Row, Col, Table} from 'reactstrap'
import AddPortfolio from './AddPortfolio';
import AddStock from './AddStock';
import axios from 'axios';

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            portfolioName: '',
            stockName: '',
            stockAmount: '',
            modal: false,
            portfolio: [],
            unitValue: null,
            totalValue: null,
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
        // this.state.portfolio[id].stocks.push(stock);
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.stockName}&interval=1min&apikey=EVNDD17OHUNAZIMD&outputsize=compact`)
        .then(res=>{
            const data = res.data['Time Series (1min)'];
            const values = Object.values(data)[0];
            const unitValue = values['1. open'];
            const totalValue = unitValue * stock.stockAmount
            this.state.portfolio[id].stocks.push({
                stockName: stock.stockName.toUpperCase(),
                stockAmount: stock.stockAmount,
                unitValue: unitValue+'EUR',
                totalValue: totalValue+'EUR',
            });
            this.setState({
                modal: false
            })
        })
        .catch(e=>console.log(e))
    }

    removePortfolio = (i)=>{
        this.state.portfolio.splice(i, 1);
        this.setState({
            modal:true
        })
    }
    render() {
        const portfolio = this.state.portfolio.map((item, i)=>(
                    <Col xs="12" lg="6" key={i}>
                        <div className="portfolio-container">
                            <span className="top-controller">
                                <p className="portfolio-name">{item.portfolioName}</p>
                                <Button color="primary">Show in Dollars</Button>
                                <Button color="danger" onClick={()=>this.removePortfolio(i)}>X</Button>
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
                                        <td>{item.unitValue}</td>
                                        <td>{item.totalValue}</td>
                                        <td>
                                            <input 
                                                type="checkbox" />
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                            
                            </Table> 
                            <p>total value</p>
                            <span className="bottom-controller">
                                <AddStock 
                                    color="primary"
                                    stockName= {this.state.stockName}
                                    stockAmount= {this.state.stockAmount}
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
                                    <Button color="danger" onClick={this.removeStock}>Remove Selected</Button>   
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
                    handleChange={this.handleChange}
                    createPortfolio={this.createPortfolio}
                    toggle={this.toggle}
                    modal={this.state.modal}
                />                
                <Row>{portfolio}</Row>
            </div>

        )
    }
}

export default Portfolio;