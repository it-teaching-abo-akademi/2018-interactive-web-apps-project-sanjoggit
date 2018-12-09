import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { Container } from 'reactstrap';
import Portfolio from './components/Portfolio';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container fluid>
          <Portfolio />
        </Container>
      </div>
    );
  }
}

export default App;
