import React, { Component }  from 'react';
// import teams from './data/teams.json'

class Team extends Component {
    constructor(props){
    super(props);
      this.state =  {
        teams: this.props.teams,
        team_id: (this.props.slot_id > 63 ) ? this.props.slot_id - 64+ 1 : this.props.pick
      }
  }

  getTeamId() {
    if(this.props.slot_id > 63) {
      return this.props.slot_id - 63
    } else if (this.props.pick) {
      return this.props.pick
    }
  }
  getTeamName() {
    if(this.props.slot_id > 63) {
      return this.state.teams[this.props.slot_id - 64 ].Team;
    } else {
      if (this.props.pick) {
        return this.state.teams[this.props.pick-1].Team;
      } else {
        return '\u00A0'
      }
    }
  }

  getSlug() {
    return this.getTeamName().toLowerCase().split(' ').join('-')
  }

  teamHasBeenPicked = () => {
    return (this.props.slot_id > 63 || this.props.pick)
  }

  handleClick = () => {
    console.log("teamPicked",
      this.props.pick,
      this.state.team_id,
      this.props.match_id
       )
    var teamPicked = this.getTeamId()
    if (teamPicked && this.props.teamClicked) {
      this.props.teamClicked(this.props.match_id, teamPicked);
    }
  }
  renderLogo(){
    if (this.teamHasBeenPicked()) {
      return <img alt={this.getSlug()}src={"/images/logos/" + this.getSlug() + ".svg"}/>
    }
  }
  render() {
    var correct = '';
    if (this.props.master_pick) {
      correct = (this.props.master_pick === this.props.pick) ? 'correct ' : 'wrong'
    }

    var  hasPick =  this.teamHasBeenPicked() ? "picked " : 'not_picked '
    var slotstyle = "slot" + this.props.slot_id
    var styles = ["team", correct, slotstyle, hasPick]

    return (
      <div className={styles.join(' ')} onClick={this.handleClick} >
          {this.renderLogo()}
        <div className="team_name">{this.getTeamName(this.props.slot_id)}</div>
      </div>
    );
}}
export default  Team
