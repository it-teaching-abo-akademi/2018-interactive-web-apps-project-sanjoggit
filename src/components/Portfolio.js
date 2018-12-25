import React, { Component } from "react";
import { Button, Row, Col, Table } from "reactstrap";
import AddPortfolio from "./AddPortfolio";
import AddStock from "./AddStock";
import axios from "axios";

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioName: "",
      stockName: "",
      stockAmount: "",
      modal: false,
      portfolio: [],
      USD_EUR: {},
      isEuro: true,
      selectedStocks: [],
      totalValue: [0]
    };
  }
  UNSAFE_componentWillMount() {
    axios
      .get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=EVNDD17OHUNAZIMD`
      )
      .then(res => {
        const exchangeObj = res.data["Realtime Currency Exchange Rate"];
        const currencyObj = exchangeObj["5. Exchange Rate"];
        this.setState({
          USD_EUR: currencyObj
        });
      });
  }

  toggleIsEuro = ()=>{
      this.setState({
          isEuro: !this.state.isEuro
      })
  }
  
  toggleRate = (item, i) => {
      console.log('*******', i)
      this.toggleIsEuro(i);    
      if(this.state.isEuro){
          const portfolio = this.state.portfolio[i].stocks.map(item => {
            item.unitValue = Number.parseFloat(item.originalUnitValue * this.state.USD_EUR).toFixed(3) + 'EUR';
            item.totalValue = Number.parseFloat(item.originalUnitValue * item.stockAmount * this.state.USD_EUR).toFixed(3) + 'EUR';
            return item;
          });
      
          this.setState({
            ...portfolio
          });
      } else{
        const portfolio = this.state.portfolio[i].stocks.map(item => {
            item.unitValue = Number.parseFloat(item.originalUnitValue).toFixed(3) + 'USD';
            item.totalValue = Number.parseFloat(item.originalUnitValue * item.stockAmount).toFixed(3)  + 'USD';
            return item;
          });
      
          this.setState({
            ...portfolio
          });
      }
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createPortfolio = () => {
    const portfolio = {
      portfolioName: this.state.portfolioName,
      currency: 'EUR',
      stocks: []
    };
    this.setState({
      portfolioName: ""
    });
    this.state.portfolio.unshift(portfolio);
    this.toggle();
  };

  addStock = id => {
    const stock = {
      stockName: this.state.stockName.toUpperCase(),
      stockAmount: this.state.stockAmount
    };
    this.setState({
      stockName: "",
      stockAmount: ""
    });
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
          stock.stockName
        }&interval=1min&apikey=EVNDD17OHUNAZIMD&outputsize=compact`
      )
      .then(res => {
        const data = res.data["Time Series (1min)"];
        const values = Object.values(data)[0];
        const unitValue = values["1. open"];
        const totalValue = unitValue * stock.stockAmount;
        // this.state.totalValue.push(totalValue);
        this.state.portfolio[id].stocks.push({
          stockName: stock.stockName.toUpperCase(),
          stockAmount: stock.stockAmount,
          originalUnitValue: Number.parseFloat(unitValue).toFixed(3),
          unitValue: Number.parseFloat(unitValue).toFixed(3)+'USD',
          totalValue: Number.parseFloat(totalValue).toFixed(3)+'USD'
        });
        this.setState({
          modal: false
        });
      })
      .catch(e => console.log(e));
  };

  removePortfolio = i => {
    let newPortfolios = this.state.portfolio;
    newPortfolios.splice(i, 1);
    this.setState({
      portfolio: newPortfolios
    });
  };
  handleSelection = (stockName)=>{
    let newSelectedStocks = this.state.selectedStocks;
    if(!newSelectedStocks.includes(stockName)){
      newSelectedStocks.push(stockName);      
    } else{
      const index = newSelectedStocks.indexOf(stockName)
      newSelectedStocks.splice(index, 1)
    }

    this.setState({
      selectedStocks: newSelectedStocks
    })
  }
  removeStock = (index)=>{
    let newStocks = this.state.portfolio[index].stocks;

    this.state.selectedStocks.forEach(item=> {
      newStocks.map((newItem, i)=>{
        if(newItem.stockName === item){
          newStocks.splice(i, 1)
        }
        return newItem
      })
    })  


    this.setState({
      selectedStocks: []
    })
    
  }
  countValue = (i)=>{
    let value = [0];
    this.state.portfolio[i].stocks.map(item=>value.push(Number(item.totalValue.slice(0, -3))))
    if(this.state.isEuro){
      return value.reduce((total, num)=>total + num) + 'USD'
    } else{
      return value.reduce((total, num)=>total + num) + 'EUR'
    }
    
  }
  render() {
    const portfolio = this.state.portfolio.map((item, i) => (
      <Col xs="12" lg="6" key={i}>
        <div className="portfolio-container">
          <span className="top-controller">
            <p className="portfolio-name">{item.portfolioName}</p>
            <Button color="primary" onClick={() => this.toggleRate(item, i)}>
              {this.state.isEuro ? 'Show in Euro' : 'Show in Dollar'}
            </Button>
            <Button color="danger" onClick={() => this.removePortfolio(i)}>
              X
            </Button>
          </span>
          <Table bordered>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Amount</th>
                <th>Unit Value</th>
                <th>Total Value</th>
                <th />
              </tr>
            </thead>
            {item.stocks.map((item, i) => (
              <tbody key={i}>
                <tr>
                  <td>{item.stockName}</td>
                  <td>{item.stockAmount}</td>
                  <td>{item.unitValue}</td>
                  <td>{item.totalValue}</td>
                  <td>
                    <input type="checkbox" onClick={()=>this.handleSelection(item.stockName)} />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
          {/* <p>total value {this.state.isEuro ? this.state.totalValue.reduce((total, num)=>total+num) + 'USD'
             : (this.state.totalValue.reduce((total, num)=>total+num))*this.state.USD_EUR + 'EUR'
             }</p> */}
             <p>Total Value {this.countValue(i)} </p>
          <span className="bottom-controller">
            <AddStock
              color="primary"
              stockName={this.state.stockName}
              stockAmount={this.state.stockAmount}
              handleChange={this.handleChange}
              createPortfolio={this.createPortfolio}
              toggle={this.toggle}
              addStock={this.addStock}
              id={i}
            />
            <div>
              <Button color="info">Perf Graph</Button>
            </div>
            <div>
              <Button color="danger" onClick={()=>this.removeStock(i)}>
                Remove Selected
              </Button>
            </div>
          </span>
        </div>
      </Col>
    ));

    return (
      <div>
        <AddPortfolio
          portfolioName={this.state.portfolioName}
          stockName={this.state.stockName}
          stockAmount={this.state.stockAmount}
          handleChange={this.handleChange}
          createPortfolio={this.createPortfolio}
          toggle={this.toggle}
          modal={this.state.modal}
        />
        <Row>{portfolio}</Row>
      </div>
    );
  }
}

export default Portfolio;
