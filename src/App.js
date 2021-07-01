import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';


const BotList = ({bots}) => {
  bots.map(bot => <li key={bot}>{bot}</li>)
}

const BOT_SERVICE_URL = 'https://back.yourtar.ru/api/admin/bot/?offset=0'

class App extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isFetching: false,
      bots: ['1']};
  }

  render () {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <BotList bots={this.state.bots} />
          </header>
        </div>
    );
  }

  componentDidMount() {
    this.fetchBots()
  }

  fetchBots = () => {
    this.setState({...this.state, isFetching: true})
    fetch(BOT_SERVICE_URL)
        .then(response => response.json())
        .then(result => this.setState({bots: result, isFetching: false}))
        .catch(e => console.log(e));
  }
}

export default App;
