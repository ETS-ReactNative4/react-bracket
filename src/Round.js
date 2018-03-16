import React, { Component }  from 'react';
import Matchup from './Matchup.js'
import matches from './data/matchups.json';

class Round extends Component {
  constructor(props){
    super(props);
  	this.state = {games: []};
  	matches.games.forEach((item) => {
  		this.state.games[item.bracketPositionId] = item;
  	})
  }
  handleEvent(){
    console.log(this.props);
  }
  bracketPositionId(index) {
    console.log(this.props.region,this.props.round, this.matchesInRound(),'a',index, this.regionOffset());
    return (this.getRound()).toString() + (1+index + this.regionOffset()).toString().padStart(2,'0')
  }

  getRound(){
    return Math.abs(7-this.props.round)
  }
  matchesInRound() {
    return 2**this.props.round / 4 // 4 regions
  }
  regionOffset() {
    return this.matchesInRound()*this.props.region
  }
  render() {

	return(	<div className={"round round" + this.props.round}>
			
				{new Array(this.matchesInRound()).fill(0).map((matchup, i) => <Matchup game={ this.state.games[this.bracketPositionId(i)]} />)}
					
			
						
		</div>);
	}
}

export default Round;
