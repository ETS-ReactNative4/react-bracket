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
				<Round region={this.props.region} round={5} matchups={new Array(8).fill(0)}/>
				<Round region={this.props.region} round={4} matchups={new Array(4).fill(0)}/>
				<Round region={this.props.region} round={3} matchups={new Array(2).fill(0)}/>
				<Round region={this.props.region} round={2} matchups={new Array(1).fill(0)}/>
			</div>
		);
	}
}
export default Region
