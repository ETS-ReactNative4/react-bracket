import React, { Component }  from 'react';
import Round from './Round.js'
class Region extends Component {
    renderRound(i) {
      return <Round
          region = {this.props.region}
          round = {i}
          teamClicked = {this.props.teamClicked}
          picks = {this.props.picks}
          master = {this.props.master}
        />
    }
    render() {
      return (
      <div className={"region region"}>
          {this.renderRound(5)}
            {this.renderRound(4)}
            {this.renderRound(3)}
            {this.renderRound(2)}
      </div>
    );
  }
}
export default Region
