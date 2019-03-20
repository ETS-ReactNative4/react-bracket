import React, { Component }  from 'react';
// import teams from './data/teams.json'

class FlashMessage extends Component {
  render() {
        let styles =  ['flashMessage', this.props.flash_message.type]
    return (
      <div className={styles.join(' ')}>
      {this.props.flash_message.message}
      <input type="button"  className="close" onClick={this.props.timeout} value="x"></input>
      </div>
    );

    }
}
export default  FlashMessage
