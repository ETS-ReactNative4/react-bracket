import React, { Component }  from 'react';
import teams from './data/teams.json'

class Team extends Component {
    constructor(props){
    super(props);
      this.state =  {
        team_id: (this.props.slot_id > 63 ) ? this.props.slot_id - 64+ 1 : this.props.pick
      }
  }

  getTeamName() {
    if(this.props.slot_id > 63) {
      return teams[this.props.slot_id - 64 ].Team;
    } else {
      if (this.props.pick) {
        return teams[this.props.pick-1].Team;
      } else {
        return ':('
      }
    }
  }

  handleClick = () => {
    var teamPicked = (this.props.pick || this.state.team_id)
    if (teamPicked && this.props.teamClicked) {
      this.props.teamClicked(this.props.match_id, teamPicked);
    }
  }

  render() {
    var correct = '';

    if (this.props.master) {
      correct = (this.props.master == this.props.pick) ? 'correct' : 'wrong'
    }

    return (
      <div className={correct + " team slot" + this.props.slot_id} onClick={this.handleClick} >
        {this.getTeamName(this.props.slot_id)}
      </div>
    );
}}
export default  Team
