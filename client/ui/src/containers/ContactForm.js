import React, { Component, PropTypes } from 'react';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button, Checkbox } from 'react-bootstrap';

export default class ContactForm extends Component{
  constructor() {
    super();

    console.log('ContactForm.ctor()');

    this.state = {
      contact: this.createContact()
    };
  }

  createContact = () => {
    return {
      firstName: '',
      lastName: '',
      middleName: '',
    };
  };

  componentDidMount() {
    console.log('componentDidMount() ==> ' + this.props.contact);
    let contact = this.props.contact || this.createContact();
    this.setState({contact});
  }

  /**
   * This is a pretty cool way to have a single handler that can be used for many fields.
   * @param e
   */
  handleChange = (e) => {
    console.log('handleChange() name = ' + e.target.name + " value = " + e.target.value);

    let contact = this.state.contact;
    contact[e.target.name] = e.target.value;
    this.setState({contact});
  };

  handleCheckboxChange = (e) => {
    console.log('handleCheckboxChange() name = ' + e.target.name + " value = " + e.target.checked);

    let contact = this.state.contact;
    contact[e.target.name] = e.target.checked;
    this.setState({contact});
  };

  handleSubmit = () => {
    this.props.onFormSubmit(this.state.contact);
  };

  render() {
    let contact = this.state.contact;
    const submitText = contact.id ? 'Update' : 'Create';

    return (
      <Form horizontal>
        <FormGroup controlId="FirstName">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={10}>
            <FormControl name='firstName' type="text" placeholder="First Name" value={contact.firstName} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="MiddleName">
          <Col componentClass={ControlLabel} sm={2}>
            Middle Name
          </Col>
          <Col sm={10}>
            <FormControl name="middleName" type="text" placeholder="Middle Name" value={contact.middleName} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="LastName">
          <Col componentClass={ControlLabel} sm={2}>
            Last Name
          </Col>
          <Col sm={10}>
            <FormControl name='lastName' type="text" placeholder="Last Name" value={contact.lastName} onChange={this.handleChange}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="gender">
          <Col componentClass={ControlLabel} sm={2}>
            Gender
          </Col>
          <Col sm={10}>
            <FormControl name='gender' componentClass="select" placeholder="Select..." value={contact.gender} onChange={this.handleChange}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup controlId="deceased">
          <Col smOffset={2} sm={10}>
            <Checkbox name='deceased' checked={contact.deceased} onChange={this.handleCheckboxChange}>
              Deceased
            </Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.handleSubmit}>{submitText}</Button>
            <Button onClick={this.props.onFormClose}>Cancel</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  contact: PropTypes.object
};
