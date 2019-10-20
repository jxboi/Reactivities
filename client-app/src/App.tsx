import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
// import {cars} from './demo';
// import Greet from './components/Greet';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
      .then((response) => {
        console.log(response); 
        this.setState({
          values: response.data
        });
      })
    // this.setState({
    //   values: [{id: 1, name: 'Value 101'}, {id:2, name: 'Value 102'}]
    // });
  }

  render(){
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.values.map((m: any) => (
            <List.Item key={m.id}>{m.name}</List.Item>
          ))}
        </List>
        <ul>
          {this.state.values.map((m: any) => (
            <li key={m.id}>{m.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
