import React, { Component } from 'react';
import Admin from './Admin';
import Klient from './Klient';
import './css/app.css';

class App extends Component {

    state = {
        page: 'klient'
    };
    // Ändrar värde för vilken sida som ska visas
    changePage = event => {
        this.setState({
            page: event.target.id
        })
    }

    render() {
        return(
        // Skriver ut knappar för att välja mellan endast lista eller admin-vy
        // Kontrollerar vilket värde som finns i state för vilken sida som ska visas
        <React.Fragment>
            <div className="menu">
                <button id="klient" onClick={this.changePage}>Klient</button>
                <button id="admin" onClick={this.changePage}>Admin</button>
            </div>
            
            {this.state.page === 'klient' && 
                <Klient />
            }
            {this.state.page !== 'klient' && 
                <Admin />
            }
        </React.Fragment>

        );
            
    }
}

export default App;