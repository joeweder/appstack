import React, { Component, PropTypes } from 'react';

export default class ContactForm extends Component{
  constructor() {
    super();

    console.log('ContactForm.ctor()');

    this.state = {
      contact: this.createContact()
    };
  }

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
    contact: PropTypes.object
  };

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
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="firstName" className="col-sm-2 control-label">First Name</label>
          <div className="col-sm-10">
            <input id="firstName" className="form-control" name="firstName" type="text" placeholder="First Name" value={contact.firstName} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="middleName" className="col-sm-2 control-label">Middle Name</label>
          <div className="col-sm-10">
            <input id="middleName" className="form-control" name="middleName" type="text" placeholder="Middle Name" value={contact.middleName} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="col-sm-2 control-label">Last Name</label>
          <div className="col-sm-10">
            <input id="lastName" className="form-control" name="lastName" type="text" placeholder="Last Name" value={contact.lastName} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="gender" className="col-sm-2 control-label">Gender</label>
          <div className="col-sm-10">
            <select className="form-control" name='gender' placeholder="Select..." value={contact.gender} onChange={this.handleChange}>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select >
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-10 col-sm-offset-2">
            <div className="checkbox">
              <label><input name="deceased" type="checkbox" checked={contact.deceased} onChange={this.handleCheckboxChange}/>Deceased</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-10 col-sm-offset-2">
            <button type="button" className="btn btn-default" onClick={this.handleSubmit}>{submitText}</button>
            <button type="button" className="btn btn-default" onClick={this.props.onFormClose}>Cancel</button>
          </div>
        </div>

      </form>
    );
  }
}
