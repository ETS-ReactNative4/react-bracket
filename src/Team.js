import React, { Component }  from 'react';
import teams from './data/teams.json'

class Team extends Component {
	  constructor(props){

    super(props);

}
 
    getTeamName(slot_id) {
    	if(slot_id > 63) {
    		return teams[slot_id - 64 ].Team;
    	}
    }
	
	render() {
 
	return (
		<div className={"team slot" + this.props.slot_id} onClick={() => this.props.teamClicked(this.props.slot_id)} >
		{this.getTeamName(this.props.slot_id)} a
		</div>
	);

}}
export default  Team
