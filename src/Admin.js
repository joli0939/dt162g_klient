import React, { Component } from 'react';
import AdminMainPage from './AdminMainPage';
import Login from './Login';

class Admin extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      login: false,
      loginMessage: '',
    };

  };

  // Loggar ut användaren genom att ändra bool i state till false
  handleLogout = event => {
    event.preventDefault();
    this.setState({login: false});
  };

  // Kontrollerar om respons från inloggningsanrop är true, isf loggas användaren in genom att bool ändras till true
  handleSubmit = input => {
    if (input === true) {
      this.setState({login: true});
    }else{
      this.setState({loginMessage: 'Inloggning misslyckades'});
    }    
  };


  render() {
    // Kontrollerar om bool login i state är true eller false, renderar olika componenter beroende på det
    if (this.state.login === false) {
    return (
      <React.Fragment>
        <Login submitLogin={this.handleSubmit} />
        <p className="loginMessage">{this.state.loginMessage}</p>
      </React.Fragment>
    )
    } else {
      return (
        <React.Fragment>
          <button className="logoutButton" onClick={this.handleLogout}>Logga ut</button>
          <AdminMainPage />
        </React.Fragment>
      )
    }
 
  };
}

export default Admin;