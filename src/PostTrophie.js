import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';

class PostTrophie extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      description: '',
      value: '',
      date: '',
      game: '',
      link: '',
      trophies: [],
      message: ''
    }

  };

  // När komponent monteras tilldelas state data
  componentDidMount() {      
    this.setState({trophies: this.props.sendTrophies.trophies});
  }
    
  // Ändrar i state när användaren ändrar texten i fälten
  handleChange = event => {
      let input = event.target.name;
      this.setState({ [input]: event.target.value });

      // Lägger till bindestreck för rätt formatering av datum
      if (this.state.date.length === 3 || this.state.date.length === 6) {
        if ( event.target.name === 'date') {
          event.target.value = event.target.value + '-';
        }      
      }
  };

  
  // Gör POST-anrop till webbtjänst med de uppgifter användaren fyllt i
  handleSubmit = event => {
    event.preventDefault();

    // Kontrollerar så att alla fällt är ifyllda
    if (this.state.name !== '' && this.state.description !== '' && this.state.value !== '' && this.state.date !== '' && this.state.game !== '' && this.state.link !== '') {

      // Kontrollerar så att datum är korrekt ifyllt
      if (isNaN(Date.parse(this.state.date)) !== true && this.state.date.length === 10) {

        const trophie = {
          name: this.state.name,
          description: this.state.description,
          value: this.state.value,
          date: this.state.date,
          game: this.state.game,
          link: this.state.link
        };


        
        // Gör POST-anrop, använder querystring för att formatera data korrekt
        axios.post('https://shrouded-wildwood-48582.herokuapp.com/trophies/add', querystring.stringify(trophie), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
          .then(res => {

            let tempArray = this.state.trophies;
            tempArray.push(res.data);
            this.setState({
              trophies: tempArray,
              message: 'Trophie tillagd'
            });
            console.log(res);
            console.log(res.data);
            document.getElementById("addNewTrophie").reset();
            this.props.update(this.state.trophies);
          })
          
      }else{
        this.setState({
          message: 'Datum var inte korrekt ifyllt (yyyy-mm-dd)'
        });
      }

    } else {
      this.setState({
        message: 'Något eller några av fälten är inte ifyllda'
      });
    }

  };
  
    render() {
      // Formulär för att fylla i information om ny trophie
      return (
        <div className="postTrophie">
          <form id="addNewTrophie" onSubmit={this.handleSubmit}>
            <label>
              Namn på trophie:
              <input type="text" name="name" onChange={this.handleChange} />
            </label>
            <label>
              Beskrivning:
              <input type="text" name="description" onChange={this.handleChange} />
            </label>
            <label>
              Värde:
              <input type="text" name="value" onChange={this.handleChange} />
            </label>
            <label>
              Datum:
              <input type="text" placeholder="yyyy-mm-dd" name="date" onChange={this.handleChange} />
            </label>
            <label>
              Spel:
              <input type="text" name="game" onChange={this.handleChange} />
            </label>
            <label>
              Länk:
              <input type="text" name="link" onChange={this.handleChange} />
            </label>           
            <button type="submit">Lägg till</button>                       
          </form>     
          <p className="postMessage">{this.state.message}</p>    
        </div>
      )
    }
  };

  export default PostTrophie;