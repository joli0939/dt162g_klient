import React, { Component } from 'react';
import axios from 'axios';
import AdminTrophielist from './AdminTrophielist';
import PostTrophie from './PostTrophie';
import EditTrophie from './EditTrophie';
import loadingImg from './preloader.gif';

class MainPage extends Component {
  constructor(props) {
    super(props);

    // State för att hålla data från databas
    this.state = {
      trophies: [],
      load: false
    }
  };
  

  // När komponenten renderas görs ett GET-anrop och hämtar alla trophies från databas, lagrar sedan dessa i state
  componentDidMount() {
    axios.get('https://shrouded-wildwood-48582.herokuapp.com/trophies/')
      .then(res => {
        const trophies = res.data;
        this.setState({ trophies });
        this.setState({load: true});
      })
      
  };

  // Metod som skickas till underliggande komponenter och kan ändra state för att kunna rendera om de underliggande komponenterna vid behov
  updateStateArray = input => {
    this.setState({input});
  };

  render() {
    // Kontrollerar att lista med trophies har laddats, därefter renderas komponenter
    if (this.state.load !== false) {
    return (
      // Skickar med state som props till trophielist som skriver ut dem
      // Skickar med funktion som props för att kunna påverka state i den här komponenten
      <React.Fragment> 
        <h2>Lägg till ny trophie</h2>
        <PostTrophie sendTrophies={this.state} update={this.updateStateArray} />
        <h2>Aktuella trophies</h2>
        <AdminTrophielist sendTrophies={this.state} update={this.updateStateArray} />        
        <h2>Ändra existerande trophies</h2>
        <EditTrophie sendTrophies={this.state} update={this.updateStateArray} />
      </React.Fragment>

    )
    // Innan lista har laddats visas en bild
    }else{
      return(
        <React.Fragment>
          <img className="loadingImg" src={loadingImg} alt="En boll som ändrar färg mellan svart och blå" width="200" height="200" />
          <h2 className="loadingTxt">Laddar...</h2>
        </React.Fragment>
      )
    }
  }
}

export default MainPage;