import React, { Component }  from 'react';
// import teams from './data/teams.json'

class FlashMessage extends Component {
    constructor(props){
      super(props);
    }
  render() {
        let styles =  ['flashMessage', this.props.flash_message.type]
    return (
      <div className={styles.join(' ')}>
      {this.props.flash_message.message}
      <a href="#" className="close" onClick={this.props.timeout}>x</a>
      </div>
    );

    }
}
export default  FlashMessage
