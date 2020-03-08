import React from 'react'

class StarShipCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { StarShips: props.StarShips };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ StarShips: nextProps.StarShips});
    }

    renderHyperdriveBar=value=>{
        const isUnknown = value==="unknown";
        const w = isUnknown ? 0 : parseFloat(value)*100/5; //I used 5 as 100% as required, but there are at least one ship with Hyperdrive rating bigger than 5
        return (
          <span className={"progress-bar"+(isUnknown?" disabled":"")}>
            <span style={{width:w+"%"}}/>
          </span>
        )
    }
    
    render() {
        return (
            this.state.StarShips.map( (Ship, i) => (
                <div className="item" key={i}>
                    <p>Name: <span className="capitalized">{ Ship.name }</span></p>
                    <p>Crew: { parseInt(Ship.crew) === 0 ? "None" : Ship.crew }</p>
                    <p>Passengers: { parseInt(Ship.passengers) === 0 ? "None" : Ship.passengers }</p>
                    <p>Hyperdrive Class: { this.renderHyperdriveBar(Ship.hyperdrive_rating)}</p>
                </div>
            ))
        );
    }
    }

export default StarShipCard;
