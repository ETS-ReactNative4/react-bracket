import React, { Component }  from 'react';

class Team extends Component {
	  constructor(props){
    super(props);
}
	 render() {
	return (
		<div className="team">
		{this.props.team.names.short}
		</div>
	);
}}
export default  Team
