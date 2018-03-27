import React, { Component }  from 'react';
import Round from './Round.js'
import matchups from './data/matchups.json'
import Region from './Region.js'
import Matchup from './Matchup.js'
class Bracket extends Component {
  constructor(props){
    super(props);
    this.state = {
      picks: Array(63).fill(null),
    };
  }

  teamClicked(match_id, team_id) {
    console.log('team clicked', match_id,team_id );
    const picks = this.state.picks.slice();
    picks[match_id-1] = team_id;
    this.setState({picks: picks});
    console.log(this.state);
  }

  render() {
	return (
    <div className="bracket">
      <div className="half">
      <Region region= {0} teamClicked={this.teamClicked}/>
                                <div className="region region-champ">
                                  <div className="round">
                                    <div className="matchup">
                                      <div className="team">&nbsp;</div>
                                      <div className="team">&nbsp;</div>
                                    </div>
                                  </div>
                                </div>
      <Region region={2}/>

      </div>
      <div className="final-four">
        <div className="region">
    		<Round 
          region={0} 
          round={1}
           teamClicked={this.teamClicked}
        />
          <div className="round final">
            <Matchup className="matchup final" match_id={1}teamClicked={this.teamClicked}/>
          </div>
    		<Round region={1} round={1}  teamClicked={this.teamClicked} />
        </div>
      </div>
      <div className="half">
      <Region region={1}  teamClicked={this.teamClicked}/>
                                      <div className="region region-champ">
                                        <div className="round">
                                          <div className="matchup">
                                            <div className="team">&nbsp;</div>
                                            <div className="team">&nbsp;</div>
                                          </div>
                                        </div>
                                      </div>
      <Region  region={3}  teamClicked={this.teamClicked}/>

      </div>
    </div>
  );}
}

export default Bracket
