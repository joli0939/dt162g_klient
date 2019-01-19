import React, { Component } from 'react';
import axios from 'axios';
import Trophielist from './Trophielist';
import RadioButtons from './RadioButtons';
import ValueRadioButtons from './ValueRadioButtons';
import loadingImg from './preloader.gif';

class App extends Component {

  constructor(props) {
    super(props);
    // State för att hålla data från databas
    this.state = {
      trophies: [],
      sortList: {
        sortBy: 'all'
      },
      sortListValue: {
        sortBy: 'all'
      },
      load: false
    };

  };

  

  // Gör ett GET-anrop och hämtar alla trophies från databas, lagrar sedan dessa i state
  componentDidMount() {
    axios.get('https://shrouded-wildwood-48582.herokuapp.com/trophies/')
      .then(res => {
        const trophies = res.data;
        this.setState({ trophies });
        this.setState({load: true});
      })
  };

  // Ändrar i state för vilket spel listan ska skrivas ut
  updateOutput = recived => {
    if (recived === 'all') {
      this.setState({sortList: {
        sortBy: 'all'
      }});
    } else {
      this.setState({sortList: {
        sortBy: recived
      }});
    };
  };

  // Ändrar i state för vilken valör listan ska skriva ut för
  updateOutputValue = recived => {
    if (recived === 'all') {
      this.setState({sortListValue: {
        sortBy: 'all'
      }});
    } else {
      this.setState({sortListValue: {
        sortBy: recived
      }});
    };
  };



  render() {
    // Kontrollerar att lista med trophies har laddats, därefter renderas komponenter
    if (this.state.load !== false) {
    return (
      // Skickar med state som props till trophielist som skriver ut dem
      // Skickar med metoder för att underliggande komponenter ska kunna uppdatera state och uppdatera andra underliggande komponenter
      <React.Fragment>
        <h1>Mina trophies</h1>
        <div className="trophieTable">
          <Trophielist sendTrophies={this.state}/>
        </div>
        <div className="radioGame">
          <h3>Visa trophies från specifikt spel</h3>
          <RadioButtons sendTrophies={this.state} changeOutput={this.updateOutput}/>
        </div>
        <div className="radioValue">
          <h3>Visa trophies av specifik valör</h3>
          <ValueRadioButtons sendTrophies={this.state} changeOutput={this.updateOutputValue}/>
        </div>        
      </React.Fragment>
      
    )
    // Innan state har värden visas en bild
    }else{
      return(
        <React.Fragment>
          <img className="loadingImg" src={loadingImg} alt="En boll som ändrar färg mellan svart och blå" width="200" height="200" />
          <h2 className="loadingTxt">Laddar...</h2>
        </React.Fragment>
      )
    }
  };
};

export default App;