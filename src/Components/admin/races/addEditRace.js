import React, { Component } from 'react';
import moment from 'moment';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebaseRiders, firebaseDB, firebaseRaces } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class AddEditRace extends Component {
  state = {
    raceId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    riders: [],
    formdata: {
      bestBoraRider: {
        element: 'select',
        value: '',
        config: {
          label: 'Select a rider',
          name: 'select_rider',
          type: 'select',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: false
      },
      date: {
        element: 'input',
        value: '', //moment().format('YYYY-MM-DD'),
        config: {
          label: 'Race date',
          name: 'date_input',
          type: 'date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      bestBoraResult: {
        element: 'input',
        value: '',
        config: {
          label: 'Result best Bora rider',
          name: 'result_best_bora',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: false
      },
      raceName: {
        element: 'input',
        value: '',
        config: {
          label: 'Name of the race',
          name: 'race_name_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      location: {
        element: 'select',
        value: '',
        config: {
          label: 'Race location',
          name: 'select_race_location',
          type: 'select',
          options: [
            { key: 'Australia', value: 'Australia' },
            { key: 'Austria', value: 'Austria' },
            { key: 'Belgium', value: 'Belgium' },
            { key: 'France', value: 'France' },
            { key: 'Germany', value: 'Germany' },
            { key: 'Italy', value: 'Italy' },
            { key: 'Netherlands', value: 'Netherlands' },
            { key: 'Spain', value: 'Spain' },
            { key: 'Switzerland', value: 'Switzerland' },
            { key: 'UK', value: 'UK' },
            { key: 'USA', value: 'USA' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
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

  updateFields(race, riderOptions, riders, type, raceId) {
    const newFormdata = {
      ...this.state.formdata
    };
    for (let key in newFormdata) {
      if (race) {
        newFormdata[key].value = race[key];
        newFormdata[key].valid = true;
      }
      if (key === 'bestBoraRider') {
        newFormdata[key].config.options = riderOptions;
      }
    }

    this.setState({
      raceId,
      formType: type,
      formdata: newFormdata,
      riders
    });
  }

  componentDidMount() {
    const raceId = this.props.match.params.id;

    const getRiders = (race, type) => {
      firebaseRiders
        .orderByChild('lastname')
        .once('value')
        .then(snapshot => {
          const riders = firebaseLooper(snapshot);
          const riderOptions = [];

          snapshot.forEach(childSnapshot => {
            riderOptions.push({
              key: childSnapshot.val().firstname + ' ' + childSnapshot.val().lastname,
              value: childSnapshot.val().firstname + ' ' + childSnapshot.val().lastname
            });
          });

          this.updateFields(race, riderOptions, riders, type, raceId);
        });
    };

    if (!raceId) {
      getRiders(false, 'Add Race');
    } else {
      firebaseDB
        .ref(`races/${raceId}`)
        .once('value')
        .then(snapshot => {
          const race = snapshot.val();
          getRiders(race, 'Edit Race');
        });
    }
  }

  successForm(message) {
    this.setState({
      formSuccess: message
    });

    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000);
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    debugger;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (this.state.formType === 'Edit Race') {
        firebaseDB
          .ref(`races/${this.state.raceId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('Updated correctly');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebaseRaces
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_races');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  render() {
    return (
      <AdminLayout>
        <div className="editrace_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <div>
                <FormField
                  id={'raceName'}
                  formdata={this.state.formdata.raceName}
                  change={element => this.updateForm(element)}
                />

                <FormField
                  id={'location'}
                  formdata={this.state.formdata.location}
                  change={element => this.updateForm(element)}
                />
              </div>

              <FormField id={'date'} formdata={this.state.formdata.date} change={element => this.updateForm(element)} />

              <div className="select_team_layout split_fields">
                <div className="label_inputs">Best placed Bora rider</div>
                <div className="wrapper">
                  <div className="left">
                    <FormField
                      id={'bestBoraRider'}
                      formdata={this.state.formdata.bestBoraRider}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div>
                    <FormField
                      id={'bestBoraResult'}
                      formdata={this.state.formdata.bestBoraResult}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
              </div>

              <div className="success_label">{this.state.formSuccess}</div>
              {this.state.formError ? <div className="error_label">Something is wrong</div> : ''}
              <div className="admin_submit">
                <button onClick={event => this.submitForm(event)}>{this.state.formType}</button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AddEditRace;
