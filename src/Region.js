import React, { Component }  from 'react';
import Round from './Round.js'
class Region extends Component {
  	constructor(props) {
    	super(props);
    }
    render() {
    	    	var rounds = new Array(4).fill(0);

    	return (
			<div className={"region region" }>
				<Round 
					region={this.props.region} 
					round={5}
					teamClicked={this.props.teamClicked}
				/>
				<Round 
					region={this.props.region} 
					round={4}
					teamClicked={this.props.teamClicked}
				/>				
				<Round 
					region={this.props.region} 
					round={3}
					teamClicked={this.props.teamClicked}
				/>				
				<Round 
					region={this.props.region} 
					round={2}
					teamClicked={this.props.teamClicked}
				/>					
			</div>
		);
	}
}
export default Region
