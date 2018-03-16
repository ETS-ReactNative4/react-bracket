import React, { Component }  from 'react';
import Team from './Team.js'

class Matchup extends Component {
	 constructor(props){
    	super(props);
    	console.log(props)
	}
	render() {
		return (
		<div className="matchup">
			<Team team={this.props.game.home}/>
			<Team team={this.props.game.away}/>
		</div>
		);	
	}
}
export default Matchup;
