import React, { Component } from 'react';
import { firebase } from '../../firebase';
import { withRouter } from 'react-router';

import FormField from '../ui/formFields';
import { validate } from '../ui/misc';

class SignIn extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'jdoe@gmail.com'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: '123456'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  };

  updateForm(element) {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.event.target.value;

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          debugger;
          this.props.history.push('/admin_races');
        })
        .catch(error => {
          this.setState({
            formError: true
          });
        });
    } else {
      this.setState({
        formError: true
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{ margin: '100px' }}>
          <form onSubmit={event => this.submitForm(event)}>
            <h2>Please Login</h2>
            <p>You can use the following test account:</p>

            <FormField id={'email'} formdata={this.state.formdata.email} change={element => this.updateForm(element)} />

            <FormField
              id={'password'}
              formdata={this.state.formdata.password}
              change={element => this.updateForm(element)}
            />
            {this.state.formError ? <div className="error_label">The provided credentials are not valid.</div> : null}
            <button onClick={event => this.submitForm(event)}>Log in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignIn);
