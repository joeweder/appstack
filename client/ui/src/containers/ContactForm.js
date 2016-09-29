import React, { Component } from 'react';

export default class ContactForm extends Component{
  constructor(){
    super();
  }

  createContact() {
    return {
      firstName: '',
      lastName: '',
      middleName: '',
    };
  }

  handleSubmit = () =>{
    let contact = {
      firstName: this.refs.firstName.value,
      middleName: this.refs.middleName.value,
      lastName: this.refs.lastName.value,
    };

    if(this.props.contact)
      contact.id = this.props.contact.id;

    this.props.onFormSubmit(contact);
  };

  render(){
    let contact = this.props.contact;

    if(!contact)
      contact = this.createContact({});

    console.log("ContactForm.render() contact = " + contact);
    const submitText = contact.id ? 'Update' : 'Create';
    return (
        <div className='ui centered card'>
          <div className='content'>
            <div className='ui form'>
              <div className='field'>
                <label>First Name</label>
                <input type='text' ref='firstName'
                       defaultValue={contact.firstName}/>
              </div>
              <div className='field'>
                <label>Middle Name</label>
                <input type='text' ref='middleName'
                       defaultValue={contact.middleName}/>
              </div>
              <div className='field'>
                <label>Last Name</label>
                <input type='text' ref='lastName'
                       defaultValue={contact.lastName}/>
              </div>
              <div className='ui two bottom attached buttons'>
                <button className='ui basic blue button'
                        onClick={this.handleSubmit}>
                  {submitText}
                </button>
                <button className='ui basic red button'
                        onClick={this.props.onFormClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
