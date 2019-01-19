import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';

class EditTrophie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            trophies: []
        }
    }


    // När komponent monteras används props för att tilldela state värde
    componentDidMount() {       
        this.setState({trophies: this.props.sendTrophies.trophies});
    }


    // Funktioner för att uppdatera olika delar av arrayen trophies i state när användaren ändrar text för respektive fält
    handleName(key, event) {
        const newArray = this.state.trophies;
        newArray[key].name = event.target.value;
        this.setState({trophies: newArray});
    }
    handleDescription(key, event) {
        const newArray = this.state.trophies;
        newArray[key].description = event.target.value;
        this.setState({trophies: newArray});
    }
    handleValue(key, event) {
        const newArray = this.state.trophies;
        newArray[key].value = event.target.value;
        this.setState({trophies: newArray});
    }
    handleDate(key, event) {
        const newArray = this.state.trophies;
        newArray[key].date = event.target.value;
        this.setState({trophies: newArray});
    }
    handleGame(key, event) {
        const newArray = this.state.trophies;
        newArray[key].game = event.target.value;
        this.setState({trophies: newArray});
    }
    handleLink(key, event) {
        const newArray = this.state.trophies;
        newArray[key].link = event.target.value;
        this.setState({trophies: newArray});
    }

    // Formaterar datumsträng med endast år, månad, dag
    formatDate(date) {
        if (date !== undefined && date !== null) {
            let formatedDate = date.substring(0, 10);
            return formatedDate;
        }
    }

    // När användaren fyllt i ändringar och trycker på sänd görs ett PUT-anrop
    handleSubmit = (key, id, event) => {
        event.preventDefault();

        // Kontrollerar så att alla fällt är ifyllda
        if (this.state.trophies[key].name !== '' && this.state.trophies[key].description !== '' && this.state.trophies[key].value !== '' && this.state.trophies[key].date !== '' && this.state.trophies[key].game !== '' && this.state.trophies[key].link !== '') {

            // Kontrollerar så att datum är korrekt ifyllt
            if (isNaN(Date.parse(this.state.trophies[key].date)) !== true) {
    
                // Skapar ett objekt med data från array för vald trophie
                const trophie = {
                    name: this.state.trophies[key].name,
                    description: this.state.trophies[key].description,
                    value: this.state.trophies[key].value,
                    date: this.state.trophies[key].date,
                    game: this.state.trophies[key].game,
                    link: this.state.trophies[key].link
                };

                // Skapar adress för anrop
                let url = 'https://shrouded-wildwood-48582.herokuapp.com/trophies/update/' + id;
                console.log(url);
                
                // Gör PUT-anrop, använder querystring för att formatera data korrekt
                axios.put(url, querystring.stringify(trophie), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })

                // Anropar funktion i förälder för att ändra state och uppdatera lista
                this.props.update(this.state.trophies);
            }else{
                console.log("Felaktigt datum");
            }
        }else{
            console.log("Något fält är inte ifyllt")
        }
      };



    render() {
        // Skriver ut textfält med ifylld information från existerande trophies
        return (
            <div>
            {this.props.sendTrophies.trophies.map((trophie, key) => {
                return (
                    <div key={key} className="editTrophie">
                        <form onSubmit={(e) => this.handleSubmit(key, trophie._id, e)}>
                            <h3>{trophie.name}</h3>
                            <h4>{trophie.game}</h4>
                            <label>
                            Namn på trophie:
                            <input type="text" name="name" value={trophie.name} onChange={(e) => this.handleName(key, e)} />
                            </label>
                            <label>
                            Beskrivning:
                            <input type="text" name="description" value={trophie.description} onChange={(e) => this.handleDescription(key, e)} />
                            </label>
                            <label>
                            Värde:
                            <input type="text" name="value" value={trophie.value} onChange={(e) => this.handleValue(key, e)} />
                            </label>
                            <label>
                            Datum:
                            <input type="text" name="date" value={this.formatDate(trophie.date)} onChange={(e) => this.handleDate(key, e)} />
                            </label>
                            <label>
                            Spel:
                            <input type="text" name="game" value={trophie.game} onChange={(e) => this.handleGame(key, e)} />
                            </label>
                            <label>
                            Länk:
                            <input type="text" name="link" value={trophie.link} onChange={(e) => this.handleLink(key, e)} />
                            </label>
                            <button type="submit">Ändra</button>
                        </form>
                    </div>
                )
            })}
            </div>
        )
    }
}

export default EditTrophie;