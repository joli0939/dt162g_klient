import React, { Component } from 'react';
import linkImg from './link.png';

class TrophieList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        trophies: [],
        sort: {
          column: null,
          direction: 'asc',
        }
    };
    // Binder funktion för att använda ES2015-formatering
    this.onSort = this.onSort.bind(this);
  };

  // Lägger till array med trophies från REST när komponent monteras
  componentDidMount() {    
    this.setState({trophies: this.props.sendTrophies.trophies});
  };

  // Uppdaterar state om en ändring görs i props från radioknappar
  componentDidUpdate(prevProps) {

    // Skriver ut alla trophies från ett specifikt spel
    if (this.props.sendTrophies.sortList.sortBy !== prevProps.sendTrophies.sortList.sortBy) {

      if (this.props.sendTrophies.sortList.sortBy === 'all') {
        this.setState({trophies: this.props.sendTrophies.trophies});
      } else {
        let sortBy = this.props.sendTrophies.sortList.sortBy;
        let temp = this.props.sendTrophies.trophies;
        let newArray = [];
        // eslint-disable-next-line
        temp.map((sortByGame) => {
          // eslint-disable-next-line
          if (sortByGame.game === sortBy){
            newArray.push(sortByGame);
          };
        })
        this.setState({trophies: newArray});
      };
    };

    // Skriver ut alla trophies av ett specifikt värde
    if (this.props.sendTrophies.sortListValue.sortBy !== prevProps.sendTrophies.sortListValue.sortBy) {

      if (this.props.sendTrophies.sortListValue.sortBy === 'all') {
        this.setState({trophies: this.props.sendTrophies.trophies});
      } else {
        let sortBy = this.props.sendTrophies.sortListValue.sortBy;
        let temp = this.props.sendTrophies.trophies;
        let newArray = [];
        // eslint-disable-next-line
        temp.map((sortByValue) => {
          // eslint-disable-next-line
          if (sortByValue.value === sortBy){
            newArray.push(sortByValue);
          };
        })
        this.setState({trophies: newArray});
      };
    };
  };

  // Formaterar datum-sträng med endast år, månad, dag
  formatDate(date) {
    if (date !== undefined && date !== null) {
      let formatedDate = date.substring(0, 10);
      return formatedDate;
    }
  };

  // Sorterar tabell när användaren trycker på någon av rubrikerna
  onSort(column) {
    return (function (e) {
      let direction = this.state.sort.direction;
    
      if (this.state.sort.column === column) {
        // Ändrar riktning om samma kolumn sorteras två gånger
        direction = this.state.sort.direction === 'asc' ? 'desc' : 'asc';
      }

      // Gör enskild sortering utifrån vilken rubrik användaren klickar på
      const sortedData = this.state.trophies.sort((a, b) => {
        if (column === 'name') {
          // Gör det möjligt att sortera efter nummer i strängar
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.name, b.name);
        } 
        else if (column === 'description') {
          
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.description, b.description);
        } 
        else if (column === 'value') {
          
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.value, b.value);
        } 
        else if (column === 'date') {
          
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.date, b.date);
        } 
        else if (column === 'game') {
          
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.game, b.game);
        } 
        else {
          
          const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

          return collator.compare(a.link, b.link);
        } 
      });

      // Vänder sorteringen
      if (direction === 'desc') {
        sortedData.reverse();
      }

      // Uppdaterar state
      this.setState({
        trophies: sortedData,
        sort: {
          column,
          direction,
        }
      });
    }).bind(this); // Binder en gång till då onSort returnerar en funktion
  };


  render() {
    // Skriver ut en tabell med alla trophies
    return (
      <table className="tableStyle">
          <thead>
              <tr>
                  <th className="tableNameWidth" onClick={this.onSort('name')}>Namn</th>
                  <th className="tableDescriptionWidth" onClick={this.onSort('description')}>Beskrivning</th>
                  <th className="tableValueWidth" onClick={this.onSort('value')}>Värde</th>
                  <th className="tableDateWidth" onClick={this.onSort('date')}>Datum</th>
                  <th className="tableGameWidth" onClick={this.onSort('game')}>Spel</th>
                  <th className="tableLinkWidth" onClick={this.onSort('link')}>Länk</th>
              </tr>
          </thead>
          <tbody>
              {this.state.trophies.map((trophie, key) => {
                  return (
                      <tr key={key}>
                        <td className="tableNameWidth">{trophie.name}</td>
                        <td className="tableDescriptionWidth">{trophie.description}</td>
                        <td className="tableValueWidth">{trophie.value}</td>
                        <td className="tableDateWidth">{this.formatDate(trophie.date)}</td>
                        <td className="tableGameWidth">{trophie.game}</td>
                        <td className="linkTd tableLinkWidth"><a  href={trophie.link} target="_blank" rel="noopener noreferrer"><img className="linkImg" src={linkImg} alt="En jordglob" /></a></td>
                      </tr>
                  )
              })}
          </tbody>
      </table>

    )
  };
};

export default TrophieList;
