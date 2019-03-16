import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import Fileuploader from '../../ui/fileuploader';
import { firebaseRiders, firebaseDB, firebase } from '../../../firebase';

class AddEditRiders extends Component {
  state = {
    riderId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formdata: {
      firstname: {
        element: 'input',
        value: '',
        config: {
          label: 'Firstname',
          name: 'firstname_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '', // 'Please provide a value for the firstname field',
        showlabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Lastname',
          name: 'lastname_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      ranking: {
        element: 'input',
        value: '',
        config: {
          label: 'UCI Ranking',
          name: 'ranking_input',
          type: 'text'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      speciality: {
        element: 'select',
        value: '',
        config: {
          label: 'Speciality',
          name: 'select_speciality',
          type: 'select',
          options: [
            { key: 'Allrounder', value: 'Allrounder' },
            { key: 'Sprinter', value: 'Sprinter' },
            { key: 'Climber', value: 'Climber' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showlabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    }
  };

  updateFields = (rider, riderId, formType, defaultImg) => {
    const newFormdata = { ...this.state.formdata };

    for (let key in newFormdata) {
      newFormdata[key].value = rider[key];
      newFormdata[key].valid = true;
    }

    this.setState({
      riderId,
      defaultImg,
      formType,
      formdata: newFormdata
    });
  };

  componentDidMount() {
    const riderId = this.props.match.params.id;

    if (!riderId) {
      this.setState({
        formType: 'Add Rider'
      });
    } else {
      firebaseDB
        .ref(`riders/${riderId}`)
        .once('value')
        .then(snapshot => {
          const riderData = snapshot.val();

          firebase
            .storage()
            .ref('riders')
            .child(riderData.image)
            .getDownloadURL()
            .then(url => {
              this.updateFields(riderData, riderId, 'Edit Rider', url);
            })
            .catch(e => {
              this.updateFields(
                {
                  ...riderData,
                  image: ''
                },
                riderId,
                'Edit Rider',
                ''
              );
            });
        });
    }
  }

  updateForm(element, content = '') {
    const newFormdata = { ...this.state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if (content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;

    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  successForm = message => {
    this.setState({
      formSuccess: message
    });
    setTimeout(() => {
      this.setState({
        formSuccess: ''
      });
    }, 2000);
  };

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      debugger;
      if (this.state.formType === 'Edit Rider') {
        firebaseDB
          .ref(`riders/${this.state.riderId}`)
          .update(dataToSubmit)
          .then(() => {
            this.successForm('The rider information was updated');
          })
          .catch(e => {
            this.setState({ formError: true });
          });
      } else {
        firebaseRiders
          .push(dataToSubmit)
          .then(() => {
            this.props.history.push('/admin_riders');
          })
          .catch(e => {
            this.setState({
              formError: true
            });
          });
      }
    } else {
      this.setState({
        formError: true
      });
    }
  }

  resetImage = () => {
    const newFormdata = { ...this.state.formdata };
    newFormdata['image'].value = '';
    newFormdata['image'].valid = false;

    this.setState({
      defaultImg: '',
      formdata: newFormdata
    });
  };

  storeFilename = filename => {
    //debugger;
    this.updateForm({ id: 'image' }, filename);
  };

  render() {
    return (
      <AdminLayout>
        <div className="editriders_dialog_wrapper">
          <h2>{this.state.formType}</h2>
          <div>
            <form onSubmit={event => this.submitForm(event)}>
              <Fileuploader
                dir="riders"
                tag={'Rider image'}
                defaultImg={this.state.defaultImg}
                defaultImgName={this.state.formdata.image.value}
                resetImage={() => this.resetImage()}
                filename={filename => this.storeFilename(filename)}
              />
              <p style={{ color: 'red' }}>File upload/delete has been disabled!</p>

              <FormField
                id={'firstname'}
                formdata={this.state.formdata.firstname}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={'lastname'}
                formdata={this.state.formdata.lastname}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={'speciality'}
                formdata={this.state.formdata.speciality}
                change={element => this.updateForm(element)}
              />

              <FormField
                id={'ranking'}
                formdata={this.state.formdata.ranking}
                change={element => this.updateForm(element)}
              />

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

export default AddEditRiders;
