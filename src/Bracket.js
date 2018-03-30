import React, { Component }  from 'react';
import Round from './Round.js'
import Region from './Region.js'
import Matchup from './Matchup.js'
import BracketForm from './BracketForm.js'
import Team from './Team.js'
class Bracket extends Component {
  constructor(props){
    super(props);
    var appInitData = this.props.appInitData || {
      bracket: {
        id: null,
        name: null,
        final_points: null,
        picks: Array(63).fill(null)
      },
      master: Array(63).fill(0)
    }

    this.state = Object.assign({}, appInitData.bracket, { master: appInitData.master });
      // picks: [49, 31, 49, 11, 31, 46, 49, 1, 11, 22, 31, 36, 46, 49, 57, 3, 5, 11, 13, 18, 22, 27, 31, 36, 38, 43, 46, 49, 53, 57, 62, 1, 3, 5, 7, 9, 11, 13, 15, 18, 20, 22, 23, 25, 27, 29, 31, 34, 36, 38, 40, 41, 43, 46, 48, 49, 51, 53, 55, 57, 60, 62, 63]
  }
  updateName = (event) => {
    this.setState({name: event.target.value});
  }
  teamClicked = (match_id, team_id) => {
    if (!this.state.canEdit) {
      return;
    }
    var picks = this.state.picks.slice();
    picks[match_id-1] = team_id;

    for (var i = match_id ; i > 1; i--) {
      var nextMatch = this.getNextMatch(i);
      var leadInMatchIds = this.getLeadInMatches(nextMatch);
      if (picks[nextMatch-1] !== picks[leadInMatchIds[0]-1] && picks[nextMatch-1] !== picks[leadInMatchIds[1]-1]) {
        // Unset a pick if previous pick invalidates
        picks[nextMatch-1] = null;
      }
    }
    this.setState({picks: picks});
  }

  validateBracket = () => {
    const result = this.state.picks.some((val) => {return val === null});
    console.log('Error', result);
    if (!result) {
      var form = new FormData()
      form.append( "json", JSON.stringify( this.state.picks ) );
      fetch("http://localhost:8080/brackets/update", {
        method: "POST",
        body: JSON.stringify(this.state),
        credentials: 'include'
      });
    }
  }

  // which match id does this lead into
  getNextMatch(match_id) {
    var round = Math.floor(Math.log2(match_id));
    var matchesPrior = 2**round;
    var offset = match_id - matchesPrior;
    var nextMatch = Math.floor(offset/2) + matchesPrior/2;
    return nextMatch;
  }

  // Given a match id, get the twp previous match ids leading into this matchup
  getLeadInMatches(match_id) {
    var round = Math.floor(Math.log2(match_id));
    var offset = 2**round;
    var bar =  (match_id%offset)* 2 ;
    bar = bar + (offset * 2);
    return [bar, bar+1];
  }

  renderRegion(i) {
    console.log('bracket', this.state.master)
    return  <Region
      region = {i}
      teamClicked = {this.teamClicked}
      picks = {this.state.picks}
      bracket =  {this.state.bracket}
      master = {this.state.master}
    />
  }

  render() {
    return (
      <div className="bracket">
        <BracketForm bracket={this.state} onSubmit={this.validateBracket}/>
        <div className="half">
          {this.renderRegion(0)}
                    `           // eventually delete these, but the styles depend onthem
                                <div className="region region-champ">
                                  <div className="round">
                                    <div className="matchup">
                                      <div className="team">&nbsp;</div>
                                      <div className="team">&nbsp;</div>
                                    </div>
                                  </div>
                                </div>
          {this.renderRegion(2)}
      </div>
      <div className="final-four">
        <div className="region">
          <Round
            region={0}
            round={1}
            teamClicked={this.teamClicked} picks = {this.state.picks}
          />
          <div className="round final">
            <Matchup
              className="matchup final"
              match_id={1}teamClicked={this.teamClicked}
              picks={this.state.picks}
            />
            Total Points of Final Game
            <input value={this.state.final_points} disabled={!this.state.canEdi}/>
            Champion
            <Team slot_id={1} pick={this.state.picks[0]} />
          </div>
          <Round
            region={1}
            round={1}
            teamClicked={this.teamClicked}
            picks={this.state.picks}
          />
        </div>
      </div>
      <div className="half">
        {this.renderRegion(1)}
                                      <div className="region region-champ">
                                        <div className="round">
                                          <div className="matchup">
                                            <div className="team">&nbsp;</div>
                                            <div className="team">&nbsp;</div>
                                          </div>
                                        </div>
                                      </div>
        {this.renderRegion(3)}
      </div>
    </div>
  );}
}

export default Bracket
