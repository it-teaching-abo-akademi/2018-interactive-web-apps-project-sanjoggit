import React, { Component } from 'react';
import { Button, Row, Col,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Line, defaults} from 'react-chartjs-2';
import axios from 'axios';

defaults.global.animations = false


export class PortfolioChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            data: {
                labels: [],
                datasets: []
            },
            stocks: []
        }
      }

    
      toggle = ()=> {
        this.setState({
          modal: !this.state.modal
        });
        
      }

      getStocks = (id)=>{
        this.props.portfolio[id].stocks.map(item=>(
            axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${item.stockName}&outputsize=full&apikey=EVNDD17OHUNAZIMD`)
            .then(res=>{
                const data = res.data['Time Series (Daily)'];
                const dates = Object.keys(data);
                const values = Object.values(data);
                const rate = values.map(item=> Number(item['1. open']))
                this.setState(prevState=>({
                    data: {
                        ...prevState.data,
                        labels: dates.reverse(),
                       
                    }
                }))

                let color = '#' + (Math.random().toString(16) + "000000").substring(2,8);
                let found = this.state.data.datasets.find(el => el.label === item.stockName)
                    !found && this.state.data.datasets.push({
                    label: item.stockName,
                    data: rate.reverse(),
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                })               
                

            })
            .catch(e=>console.log(e))
            )
        )  
        this.toggle()
      }
    render() {
        const {id} = this.props;
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        return (        
            <Row>
                <Col xs="12">
                    <Button color="info" onClick={()=>this.getStocks(id)}>Perf Graph</Button>
                    <Modal 
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        >
                        <ModalHeader toggle={this.toggle} close={closeBtn}>Perf Chart</ModalHeader>
                        <ModalBody>
                            <Line
                                data={this.state.data}
                                height={400}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            footer
                        </ModalFooter>                        
                    </Modal>
                </Col>
            </Row>
        )
    }
}

export default PortfolioChart
