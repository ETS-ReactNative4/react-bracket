import React, { Component }  from 'react';
import Region from './Region.js'
import Matchup from './Matchup.js'
import BracketForm from './BracketForm.js'

import FlashMessage from './FlashMessage.js'
import Team from './Team.js'
import teamdata from './data/teams.json'
class Bracket extends Component {
  constructor(props){
    super(props);
    var appInitData = this.props.appInitData || {
      bracket: {
        id: null,
        name: null,
        final_points: null,
        picks: Array(63).fill(null),
        canEdit: true,
        errors: {}

      },
      tournament: {
        teams: teamdata,
        master: Array(63).fill(0),
      }
          }
    appInitData.bracket.errors = {};

     // appInitData.bracket.picks = [2,2,59,2,27,33,59,2,11,23,27,33,45,53,59,2,8,11,14,17,23,27,31,33,39,43,45,49,53,59,63,2,4,6,8,9,11,14,16,17,19,22,23,26,27,30,31,33,35,37,39,41,43,45,47,49,52,53,55,58,59,62,63]
    // appInitData.tournament.master[0] = 1;

    this.state = Object.assign({}, appInitData.bracket, { tournament: appInitData.tournament});
      // picks: [49, 31, 49, 11, 31, 46, 49, 1, 11, 22, 31, 36, 46, 49, 57, 3, 5, 11, 13, 18, 22, 27, 31, 36, 38, 43, 46, 49, 53, 57, 62, 1, 3, 5, 7, 9, 11, 13, 15, 18, 20, 22, 23, 25, 27, 29, 31, 34, 36, 38, 40, 41, 43, 46, 48, 49, 51, 53, 55, 57, 60, 62, 63]
  }
  setBracketName = (event) => {
    this.setState({name: event.target.value});
  }

  setFinalPoints = (event) => {
    this.setState({final_points: event.target.value});
  }
  teamClicked = (match_id, team_id) => {
    if (!this.state.canEdit) {
      return;
    }
    var picks = this.state.picks.slice();
    picks[match_id-1] = team_id;

    for (var i = match_id; i > 1; i--) {
      var nextMatch = this.getNextMatch(i);
      var leadInMatchIds = this.getLeadInMatches(nextMatch);
      if (picks[nextMatch-1] !== picks[leadInMatchIds[0]-1] && picks[nextMatch-1] !== picks[leadInMatchIds[1]-1]) {
        // Unset a pick if previous pick invalidates
        picks[nextMatch-1] = null;
      }
    }
    this.setState({picks: picks});
  }
  randomize() {
      for (var i = 63; i >=0; i++){
          var leadInMatchIds = this.getLeadInMatches(i)
          var slot_id= Matchup.getSlotId(leadInMatchIds[0])
      }
  }

  validateBracket = () => {
    var errors = {};
    var hasAllSelections = !this.state.picks.some((val) => {return val === null});
    var hasName = this.state.name && this.state.name.trim() !== '';
    console.log(hasAllSelections, hasName, this.state.final_points )
    var isValid =   hasName && hasAllSelections && this.state.final_points;
    errors['name'] = !hasName;
    errors['picks'] = !hasAllSelections;
    errors['final_points'] = this.state.final_points<1;
    var errored = Object.values(errors).filter( errored => errored == true ).length > 0
    this.setState({error: errored, errors: errors})

    return !errored
  }

  trySubmit = () => {
    if (this.validateBracket()) {
      var form = new FormData()
      form.append( "json", JSON.stringify( this.state.picks ) );
      this.setState({canEdit:false});
      fetch("/brackets/react_update", {
        method: "POST",
        body: JSON.stringify(this.state),
        credentials: 'include'
      }).then((resp) => resp.json()) // Transform the data into json
        .then(
        (data) => {
          console.log(data)
          if (data.error) {
              this.setState({canEdit:true, flash_message: {message:'Failed to save Bracket', type:'error'}})
          } else {
              this.setState({canEdit:true, flash_message: {message:'Bracket Saved', type:'success'}})
              this.setState(data.bracket)

          }
        }
      ) .catch(error => {
            this.setState({canEdit:true, flash_message: {message:'Failed to save Bracket', type:'error'}})

    });

    } else {
      console.log('err');
      this.setState({error:true})
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
    return  <Region
      region = {i}
      teamClicked = {this.teamClicked}
      picks = {this.state.picks}
      bracket =  {this.state.bracket}
      tournament = {this.state.tournament}
    />
  }
  renderFinalPoints() {
    var errored = this.state.errors.final_points ? 'errored' : ''
    return  <input className={errored} type="number" size="3" defaultValue={this.state.final_points} disabled={!this.state.canEdit} onChange={this.setFinalPoints}/>

  }
  renderFlash() {
    if (this.state.flash_message) {
      return  <FlashMessage timeout={this.hideFlash} flash_message={this.state.flash_message}/>
    }
  }

  hideFlash = () =>  {
    this.setState({flash_message: null})
    return false;
  }

  renderHelp() {
    var link = "/bracektes/add";
    if (this.state.id && this.state.canEdit) {
        link = "/brackets/edit/" + this.state.id
    }

    return <div><p>If you are experiencing trouble with the new layout try out the old form <a href={link}>Here</a>.</p> <p>Just click a team to advance.</p></div>
  }

  render() {
        var errored = this.state.errors.picks ? 'errored' : ''

    return (
        <div>
        {this.renderFlash()}
        {this.renderHelp()}
        <div className={ "bracket "+ errored} >


        <BracketForm bracket={this.state} onSubmit={this.trySubmit} setBracketName={this.setBracketName}/>
        <div className="half">
          {this.renderRegion(0)}
          <div/>
          {this.renderRegion(2)}
        </div>

        <div className="final-four">
        <h3>Final Four</h3>
          <div className="round round1">
            <Matchup
              className="matchup final"
              match_id={2}
              teamClicked={this.teamClicked}
              picks={this.state.picks}
              tournament={this.state.tournament}
            />
          </div>

          <div className="championship round">
          <h4>Championship</h4>
          <div className="round round0">
            <Team
              match_id={1}
              slot_id={2}
              pick ={this.state.picks[1]}
              master_pick = {this.state.tournament.master[1]}
              teams={this.state.tournament.teams}
              teamClicked={this.teamClicked}

            />
          </div>
          <div className="champion">
            <Team
              slot_id={1}
              pick ={this.state.picks[0]}
              master_pick = {this.state.tournament.master[0]}
              teams={this.state.tournament.teams}
            />
          </div>
          <div className="round round0">
            <Team
                        match_id={1}
            slot_id={3}
            pick ={this.state.picks[2]}
            master_pick = {this.state.tournament.master[2]}
            teams={this.state.tournament.teams}
            teamClicked={this.teamClicked}

          />
          </div>
          <div>
          Total Points of Final Game<br/>
          {this.renderFinalPoints()}
          </div>
          </div>

          <div className="round round1">
            <Matchup
              className="matchup final"
              match_id={3}
              teamClicked={this.teamClicked}
              picks={this.state.picks}
              tournament={this.state.tournament}
            />
          </div>


        </div>


        <div className="half">
          {this.renderRegion(1)}
          <div/>
          {this.renderRegion(3)}
        </div>

    </div>
    </div>
  );}
}

export default Bracket
