import React, { Component }  from 'react';
import Round from './Round.js'
import matchups from './data/matchups.json'
import Region from './Region.js'
class Bracket extends Component {
  constructor(props){
    super(props);
  }
  handleEvent(){
    console.log(this.props);
  }
  render() {
	return (
<div className="bracket">
  <div className="half">
  <Region matchups={matchups} region={0}/>
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
		<Round region={0} round={2} matchups={[0]}/>
      <div className="round final">
        <div className="matchup final">
          <div className="team">&nbsp;0</div>
     
          <div className="team">&nbsp;0</div>
       <div className="team champion">Duke</div>
        </div>
      </div>
		<Round region={0} round={2} matchups={[0]}/>
    </div>
  </div>
  <div className="half">
  <Region region={1}/>

    <div className="region region-champ">
      <div className="round">
        <div className="matchup">
          <div className="team">&nbsp;</div>
          <div className="team">&nbsp;</div>
        </div>
      </div>
    </div>
  <Region  region={3}/>

  </div>
</div>
);}}
	export default Bracket
