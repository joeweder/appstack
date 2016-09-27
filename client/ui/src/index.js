require('file?name=[name].[ext]!./index.html');

import React from 'react';
import ReactDOM from 'react-dom';
import * as restClient from './restclient';

const ContactsDashboard = React.createClass({
  getInitialState: function(){
    return {
      contacts: [],
      userMessage: null,
    };
  },
  componentDidMount: function(){
    this.refresh();
  },
  handleCreateFormSubmit: function(contact){
    this.createContact(contact);
  },
  handleCloseUserMessage: function(){
    this.setState({
      userMessage: null
    });
  },
  handleEditFormSubmit: function(contact){
    this.updateContact(contact);
  },
  handleTrashClick: function(contactId){
    this.deleteContact(contactId);
  },
  restFailure: function(error){
    console.log("Failure: " + error.message);
    let message = error.message;
    if(error.response && error.response.data){
      message = error.response.data.message;
    }

    this.setState({
      userMessage: "Failure: " + message
    });
  },
  restSetState: function(response){
    console.log('REST setState: setting state to:' + response.data);
    this.setState({
      contacts: response.data
    });
  },
  refresh: function(){
    restClient.getAll(this.restSetState, this.restFailure);
  },
  createContact: function(contact){
    restClient.insertContact(contact, this.refresh, this.restFailure);
  },
  deleteContact: function(contactId){
    restClient.deleteContact(contactId, this.refresh, this.restFailure);
  },
  updateContact: function(contact){
    restClient.updateContact(contact, this.refresh, this.restFailure);
  },
  render: function(){
    return (
        <div>
          <UserMessages
              message={this.state.userMessage}
              onClose={this.handleCloseUserMessage}
          />
          <ToggleableContactForm
              onFormSubmit={this.handleCreateFormSubmit}
              onRefresh={this.refresh}
          />
          <EditableContactList
              contacts={this.state.contacts}
              onFormSubmit={this.handleEditFormSubmit}
              onTrashClick={this.handleTrashClick}
          />
        </div>
    );
  },
});

const UserMessages = React.createClass({
  render: function(){
    if(this.props.message){
      return (
          <div className="ui warning message transition">
            <i className="close icon" onClick={this.props.onClose}/>
            {this.props.message}
            <div className="header">
            </div>
          </div>
      )
    }
    else{
      return (
          <div className="ui warning message transition hidden">
            <i className="close icon"/>
            <div className="header">
            </div>
          </div>
      )
    }
  },
});

const EditableContactList = React.createClass({
  render: function(){
    const contacts = this.props.contacts.map((contact) => (
        <EditableContact
            key={contact.id}
            contact={contact}
            onFormSubmit={this.props.onFormSubmit}
            onTrashClick={this.props.onTrashClick}
        />
    ));
    return (
        <table className="ui compact celled striped table">
          <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {contacts}
          </tbody>
        </table>
    );
  },
});

const EditableContact = React.createClass({
  getInitialState: function(){
    return {
      editFormOpen: false,
    };
  },
  handleEditClick: function(){
    this.openForm();
  },
  handleFormClose: function(){
    this.closeForm();
  },
  handleSubmit: function(contact){
    this.props.onFormSubmit(contact);
    this.closeForm();
  },
  closeForm: function(){
    this.setState({editFormOpen: false});
  },
  openForm: function(){
    this.setState({editFormOpen: true});
  },
  render: function(){
    if(this.state.editFormOpen){
      return (
          <TableEmbeddedContactForm
              contact={this.props.contact}
              onFormSubmit={this.handleSubmit}
              onFormClose={this.handleFormClose}
          />
      );
    }else{
      return (
          <Contact
              contact={this.props.contact}
              onEditClick={this.handleEditClick}
              onTrashClick={this.props.onTrashClick}
          />
      );
    }
  },
});

/* This 'composition' allows using the ContactForm embedded in a <table> without getting DOM validation errors */
const TableEmbeddedContactForm = React.createClass({
  render: function(){
    return (
        <tr>
          <td>
            <ContactForm {...this.props} />
          </td>
        </tr>
    )
  }
});

const ContactForm = React.createClass({
  handleSubmit: function(){
    let contact = {
      firstName: this.refs.firstName.value,
      middleName: this.refs.middleName.value,
      lastName: this.refs.lastName.value,
    };

    if(this.props.contact)
      contact.id = this.props.contact.id;

    this.props.onFormSubmit(contact);
  },
  render: function(){
    let contact = this.props.contact;

    if(!contact)
      contact = restClient.newContact({});

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
  },
});

const ToggleableContactForm = React.createClass({
  getInitialState: function(){
    return {
      isOpen: false,
    };
  },
  handleFormOpen: function(){
    this.setState({isOpen: true});
  },
  handleFormClose: function(){
    this.setState({isOpen: false});
  },
  handleFormSubmit: function(contact){
    this.props.onFormSubmit(contact);
    this.setState({isOpen: false});
  },
  handleRefresh: function(){
    this.props.onRefresh();
  },
  render: function(){
    if(this.state.isOpen){
      return (
          <ContactForm
              onFormSubmit={this.handleFormSubmit}
              onFormClose={this.handleFormClose}
          />
      );
    }else{
      return (
          <div className='ui small content center aligned segment'>
            <div className='ui icon button' onClick={this.handleFormOpen}>
              <i className='plus icon'/>
            </div>
            <button className='ui button icon' onClick={this.handleRefresh}>
              <i className='refresh icon'/>
            </button>
          </div>
      );
    }
  },
});

const Contact = React.createClass({
  handleTrashClick: function(){
    this.props.onTrashClick(this.props.contact.id);
  },
  render: function(){
    let contact = this.props.contact;
    return (
        <tr>
          <td>{contact.lastName}</td>
          <td>{contact.firstName}</td>
          <td>{contact.middleName}</td>
          <td className="collapsing">
            <div className='ui buttons'>
              <button className='ui basic blue button'
                      onClick={this.props.onEditClick}>
                <i className='edit icon'/>
              </button>
              <button className='ui basic red button'
                      onClick={this.handleTrashClick}>
                <i className='trash icon'/>
              </button>
            </div>
          </td>
        </tr>
    );
  },
});

ReactDOM.render(
    <ContactsDashboard />,
    document.getElementById('container')
);