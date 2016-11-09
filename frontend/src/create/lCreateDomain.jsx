import React, { PropTypes } from 'react';
import PureComponent from '../lib/PureComponent';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import { reduxForm } from 'redux-form';
import browserHistory from 'react-router/lib/browserHistory';

class CreateDomain extends PureComponent {
  constructor(props) {
    super(props);
    this.chainBind(['saveDomain']);
  }

  saveDomain(values) {
    console.log(values);
    browserHistory.push('/');

  }

  render() {
    const { fields: { dname, regent, display, abbr, treasury }, handleSubmit } = this.props;
    const formContainerClass = 'container login';
    const formClass = `${formContainerClass} form`;
    const toolbarClass = `${formContainerClass} toolbar`;

    return (

      <Paper zdepth={1} className={formContainerClass} >
        <Toolbar className={toolbarClass} >
          <ToolbarGroup >
            <ToolbarTitle text="Enter Domain details" />
          </ToolbarGroup>
        </Toolbar>
        <form className={formClass} onSubmit={handleSubmit(this.saveDomain)} >
          <TextField id="dname" hintText="domain name" {...dname} />
          <br /><br />
          <TextField id="regent" hintText="regent" {...regent} />
          <br /><br />
          <TextField id="abbr" hintText="abbr" {...abbr} />
          <br /><br />
          <TextField id="treasury" hintText="treasury" {...treasury} />
          <br /><br />
          <TextField id="display" hintText="display" {...display} />
          <br /><br />
          <RaisedButton label="Save" type="submit" primary style={{ margin: 12 }} />
        </form>
      </Paper>
    )
      ;
  }

}

const CreateDomainContainer = reduxForm({
  form: 'createDomain',
  fields: ['dname', 'regent', 'display', 'abbr', 'treasury'],
})(CreateDomain);

export default CreateDomainContainer;
