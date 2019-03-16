import React, { Component }  from 'react';

class BracketForm extends Component {
  constructor(props){
    super(props);
  }

  renderButton() {
    if (this.props.bracket.canEdit) {
      return <button onClick={() => this.props.onSubmit()} disabled={this.props.isValid}> Submit</button>
    }
  }
  renderError() {
    if (this.props.bracket.error) {
      return <div className="error"> Please complete all required fields</div>
    }
  }


  render() {
    var errored = this.props.bracket.errors.name ? 'errored' : ''

    return (
    <div className={"bracket_form "}>
      <fieldset>
        <label > Bracket Name </label><br/>
        <input className={errored} defaultValue = {this.props.bracket.name} onChange={(e) => {this.props.setBracketName(e)}} disabled={false} />
        {this.renderError()}
        </fieldset>
        {this.renderButton()}
    </div>
    );
  }
}
export default BracketForm;
