import React, { Component }  from 'react';
import Team from './Team.js'

class Matchup extends Component {

  getSlotId(match_id) {
    var round = Math.floor(Math.log2(this.props.match_id));
    var offset = 2**round;
    var bar = (match_id%offset)* 2 ;
    return bar + (offset * 2);
  }

  render() {
    var matchClass = " m" + this.props.match_id
    return (
    <div className={"matchup" + matchClass}>
      <Team
        match_id = {this.props.match_id}
        slot_id = {this.getSlotId(this.props.match_id)}
        teamClicked = {this.props.teamClicked}
        pick = {this.props.picks ? this.props.picks[this.getSlotId(this.props.match_id)-1] : null}
        master_pick = {this.props.tournament.master ? this.props.tournament.master[this.getSlotId(this.props.match_id)-1] : null}
        teams  = {this.props.tournament.teams}

      />
      <Team
        match_id = {this.props.match_id }
        slot_id = {this.getSlotId(this.props.match_id)+1}
        teamClicked = {this.props.teamClicked}
        pick = {this.props.picks ? this.props.picks[this.getSlotId(this.props.match_id)] : null}
        master_pick = {this.props.tournament.master ? this.props.tournament.master[this.getSlotId(this.props.match_id)] : null}
        teams  = {this.props.tournament.teams}
      />
    </div>
    );
  }
}
export default Matchup;
