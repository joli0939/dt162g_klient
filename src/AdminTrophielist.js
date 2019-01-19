import React, { Component } from 'react';
import axios from 'axios';
import linkImg from './link.png';
import deleteImg from './delete.png';

class AdminTrophieList extends Component {

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
    

  }

  // När komponent monteras lagras data från props i state
  componentDidMount() {    
      this.setState({trophies: this.props.sendTrophies.trophies});
  };
    

  // Tar bort en trophie från tabell och databas
  deleteRow = (deleteID) => {
    let url = 'https://shrouded-wildwood-48582.herokuapp.com/trophies/delete/' + deleteID;

    // Tar bort vald trophie från state för att kunna uppdatera förälder
    let tempArray = this.state.trophies;
    for (let i=0; i<tempArray.length; i++) {
      if (tempArray[i]._id === deleteID) {
        tempArray.splice(i, 1);
        this.setState({trophies: tempArray});
      }
    }
    
    // Gör DELETE-anrop till webbtjänst med id som ska tas bort i adressen
    axios.delete(url)
      .then(res => {
        console.log(res);
        console.log(res.data);
        
    })
    // Anropar funktion i förälder och skickar med state för att förälder ska uppdatera lista
    this.props.update(this.state.trophies);
  };

  // Formaterar datumsträng genom att ta bort allt annat än år, månad, dag
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
    // Skriver ut lista i en tabell, en knapp för att ta bort vald rad läggs till
    return (

      <React.Fragment>
      <div className="adminTrophielist">
      <table className="adminTable" >
          <thead>
              <tr>
                  <th className="adminTableName" onClick={this.onSort('name')}>Namn</th>
                  <th className="adminTableDescription" onClick={this.onSort('description')}>Description</th>
                  <th className="adminTableValue" onClick={this.onSort('value')}>Värde</th>
                  <th className="adminTableDate" onClick={this.onSort('date')}>Datum</th>
                  <th className="adminTableGame" onClick={this.onSort('game')}>Spel</th>
                  <th className="adminTableLink" onClick={this.onSort('link')}>Länk</th>
                  <th className="adminTableDelete" >Ta bort</th>
              </tr>
          </thead>
          <tbody>
              {this.state.trophies.map((trophie, key) => {
                  return (
                      <tr key={key}>
                        <td className="adminTableName">{trophie.name}</td>
                        <td className="adminTableDescription">{trophie.description}</td>
                        <td className="adminTableValue">{trophie.value}</td>
                        <td className="adminTableDate">{this.formatDate(trophie.date)}</td>
                        <td className="adminTableGame">{trophie.game}</td>
                        <td className="linkTd adminTableLink"><a  href={trophie.link} target="_blank" rel="noopener noreferrer"><img className="linkImg" src={linkImg} alt="En jordglob" /></a></td>
                        <td className="deleteTd adminTableDelete" onClick={(e) => this.deleteRow(trophie._id, e)}><img className="deleteImg" src={deleteImg} alt="" /></td>
                      </tr>
                  )
              })}
          </tbody>
      </table>
      </div>
      </React.Fragment>
    )
  }
}

export default AdminTrophieList;
