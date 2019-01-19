import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    // Ändrar i state när användaren fyller i fälten
    onChange = event => {
        let input = event.target.name;
        this.setState({
            [input]: event.target.value
        })
    }

    // Gör POST-anrop med inloggningsuppgifter och får true eller false tillbaka som skickas vidare
    makeCall = event => {
        event.preventDefault();

        const login = {
            username: this.state.username,
            password: this.state.password
        };
        
        
        axios.post('https://shrouded-wildwood-48582.herokuapp.com/login/post', querystring.stringify(login), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
          .then(res => {


            console.log(res);
            console.log(res.data);
            this.props.submitLogin(res.data);
          })
    }


    render() {
        // Skriver ut ett inloggningsformulär och eventuellt felmeddelande
        return(
            <div>
            <form className="loginForm" onSubmit={this.makeCall}>
                <label>
                    <span>Användarnamn:</span>
                    <input autoFocus type="text" name="username" value={this.state.username} onChange={this.onChange} />
                </label>
                <label>
                    <span>Lösenord:</span>
                    <input type="password" name="password" value={this.state.password} onChange={this.onChange} />
                </label>
                <button type="submit">Logga in</button>
            </form>
            </div>
        )
    }
}

export default Login;