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
  }
  bracketPositionId(index) {
    return (this.getRound()).toString() + (1+index + this.regionOffset()).toString().padStart(2,'0')
  }

  getRound(){
    return Math.abs(7-this.props.round)
  }
  matchesInRound() {
    if (this.props.round > 1) {
      return 2**this.props.round / 4 // 4 regions
    } 
    return 1;
  }
  regionOffset() {
    return this.matchesInRound()*this.props.region
  }
  render() {

	return(	<div className={"round round" + this.props.round}>
			
				{new Array(this.matchesInRound()).fill(0).map((matchup, i) => <Matchup key={i.toString()}round={this.props.round} className={"match_id" + i } match_id={i+2**(this.props.round) + this.regionOffset()  } teamClicked={this.props.teamClicked}/>)}
					
						
		</div>);
	}
}

export default Round;
