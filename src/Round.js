import React, { Component }  from 'react';
import Matchup from './Matchup.js'

class Round extends Component {

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

  renderMatchup(i) {
    return <Matchup
      key={i.toString()}
      round={this.props.round}
      className={"match_id" + i }
      match_id={i+2**(this.props.round) + this.regionOffset()}
      teamClicked={this.props.teamClicked}
      picks = {this.props.picks}
      master  = {this.props.master}
    />
  }

  render() {

  return (
      <div className={"round round" + this.props.round}>
          {new Array(this.matchesInRound()).fill(0).map((matchup, i) => { return this.renderMatchup(i)})}
      </div>
    );
  }
}

export default Round;
