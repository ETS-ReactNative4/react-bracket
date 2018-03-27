import React, { Component }  from 'react';
import Team from './Team.js'

class Matchup extends Component {
	 constructor(props){
    	super(props);
	}

	getSlotId(match_id) {
		var round = Math.floor(Math.log2(this.props.match_id));
		var offset = 2**round;
		var bar =  (match_id%offset)* 2 ;
		return bar + (offset * 2);
	}

	render() {
		return (
		<div className={"matchup " + this.props.match_id + " " + this.getSlotId(this.props.match_id) }>
			<Team slot_id={this.getSlotId(this.props.match_id)} teamClicked={this.props.teamClicked}/>
			<Team slot_id={this.getSlotId(this.props.match_id) +1} teamClicked={this.props.teamClicked} />
		</div>
		);	
	}
}
export default Matchup;
