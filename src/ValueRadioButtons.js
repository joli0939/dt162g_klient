import React, { Component } from 'react';

class RadioButtons extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            trophies: [],
            selectedOption: 'all'
        };

    };

    // // Lägger till array med trophies från REST när komponent laddas
    componentDidMount() {    
        this.setState({trophies: this.props.sendTrophies.trophies});        
    };

    // Använder Set() för att plocka ut alla originella namn på spel ur lista med trophies i state
    uniqueArray() {
        let unique = [...new Set(this.state.trophies.map(item => item.value))];
        return unique;
    };

    // Ändrar värden i state när en radioknapp klickas på, anropar funktion i förälder för att ändra state där
    handleOptionChange = changeEvent => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
        this.props.changeOutput(changeEvent.target.value);
    };

    render() {
        // Skriver ut en radioknapp per originellt värde som finns i arrayen
        let gameArray = this.uniqueArray();
        return(
            <React.Fragment>
            <form>
                <label key="all" className="container">
                    <input key="alla" type="radio" name="value" value="all" checked={this.state.selectedOption === 'all'} onChange={this.handleOptionChange} />
                    Alla
                    <span className="checkmark"></span>
                </label>
                {gameArray.map((value, key) => {
                    return (
                        <label key={key} className="container">
                            <input key={value} type="radio" name="value" value={value} checked={this.state.selectedOption === value} onChange={this.handleOptionChange} />
                            {value}
                            <span className="checkmark"></span>
                        </label>
                    )
                })}
            </form>
            </React.Fragment>
        )
    };
};

export default RadioButtons;