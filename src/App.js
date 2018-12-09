import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Header />
        </Container>
      </div>
    );
  }
}

export default App;
