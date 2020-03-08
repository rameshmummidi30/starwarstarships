import React, { Component } from 'react';
import './App.css';
import StarShipCard from './components/StarShipCard'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      loaded: false,
      currentPage: 1,
      totalPages: 1,
    }
  }

  componentDidMount(){
    this.getData(1);
  }

  getData=page=>{
    fetch("https://swapi.co/api/starships/?page="+page).then(r=>r.json()).then(data=>{
      this.setState({
        items : data.results.map(ship => Object.assign({}, ship)),
        loaded : true,
        currentPage: page,
        totalPages: Math.ceil(data.count/10),
      })
    })
  }

  render(){
    if(!this.state.loaded){ return <div>loading...</div>; }

    const { currentPage } = this.state;

    return (
      
      <div className="App">
        <div className="content">
          <StarShipCard StarShips={this.state.items} />
        </div>
        <div className="footer">
          <div className="pagination">
            <button data-testid="prev" className="btn prv" disabled={currentPage===1} onClick={()=>this.getData(currentPage-1)}>Previous</button>
            <button data-testid='next' className="btn nxt" disabled={currentPage===this.state.totalPages} onClick={()=>this.getData(currentPage+1)}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
