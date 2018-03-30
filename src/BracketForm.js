import React, { Component }  from 'react';

class BracketForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: this.props.name
    };
  }

  renderButton() {
    if (this.props.bracket.canEdit) {
      return <button onClick={() => this.props.onSubmit()}> Submit</button>
    }
  }
  
  render() {
    return (
    <div className="bracket_form">
      <fieldset>
        <label > Bracket Name </label><br/>
        <input value = {this.props.bracket.name} onChange={() => {this.props.updateName()}} disabled={!this.props.canEdit} />
        </fieldset>
        {this.renderButton()}
    </div>
    );  
  }
}
export default BracketForm;
