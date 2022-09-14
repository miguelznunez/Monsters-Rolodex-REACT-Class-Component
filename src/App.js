import { Component } from "react"

import CardList from "./components/card-list/card-list.component"
import SearchBox from "./components/search-box/search-box.component"
import './App.css';


class App extends Component {

  constructor() {
    super()

    this.state = {
      monsters : [],
      searchField : ""
    }
  }
  // Mounts is the first time a component gets displayed on the DOM
  // It only happens once through a components life
  // the only time it might re-mount is if its been unmounted (its been 
  // completely removed from the DOM)
  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")

    .then(response => response.json())
    .then((users) => this.setState( () => {
        return {monsters: users}
      }
    ))
  }

  // Function that gets called when user searches
  // Its grabing each letter the user inputs and updating the searchField variable
  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    this.setState(() => {
      return { searchField }
    })
  }

  render() {

    // Instead of using this.state.monsters, this.state.searchField, etc. You can create variables
    // this way so you can do away without the this.state
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    // This function is filering out the monster names with the searchField variable
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    })

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
       <SearchBox 
          onChange={onSearchChange}
          placeholder="Search monsters"
          className="monsters-search-box"/>
       <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
  
}

export default App;
