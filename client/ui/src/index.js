require('file?name=[name].[ext]!./index.html');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as restClient from './restclient';

class ContactsDashboard extends Component{
  constructor() {
    super();
    this.state = {
      contacts: [],
      userMessage: null,
    };

    this.handleCloseUserMessage = this.handleCloseUserMessage.bind(this);
    this.handleCreateFormSubmit = this.handleCreateFormSubmit.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.handleTrashClick = this.handleTrashClick.bind(this);
    this.refresh = this.refresh.bind(this);
    this.restSetState = this.restSetState.bind(this);
    this.restFailure = this.restFailure.bind(this);
  }

  componentDidMount(){
    this.refresh();
  }

  handleCreateFormSubmit(contact){
    this.createContact(contact);
  }

  handleCloseUserMessage(){
    this.setState({
      userMessage: null
    });
  }

  handleEditFormSubmit(contact){
    this.updateContact(contact);
  }

  handleTrashClick(contactId){
    this.deleteContact(contactId);
  }

  restFailure(error){
    console.log("Failure: " + error.message);
    let message = error.message;
    if(error.response && error.response.data){
      message = error.response.data.message;
    }

    this.setState({
      userMessage: "Failure: " + message
    });
  }

  restSetState(response){
    console.log('REST setState: setting state to:' + response.data);
    this.setState({
      contacts: response.data
    });
  }

  refresh(){
    restClient.getAll(this.restSetState, this.restFailure);
  }

  createContact(contact){
    restClient.insertContact(contact, this.refresh, this.restFailure);
  }

  deleteContact(contactId){
    restClient.deleteContact(contactId, this.refresh, this.restFailure);
  }

  updateContact(contact){
    restClient.updateContact(contact, this.refresh, this.restFailure);
  }

  render(){
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
  }
}

class UserMessages extends Component{
  render(){
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
  }
}

class EditableContactList extends Component{
  render(){
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
  }
}

class EditableContact extends Component{
  constructor(){
    super();
    this.state = {
      editFormOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(){
    this.openForm();
  }

  handleFormClose(){
    this.closeForm();
  }

  handleSubmit(contact){
    this.props.onFormSubmit(contact);
    this.closeForm();
  }

  closeForm(){
    this.setState({editFormOpen: false});
  }

  openForm(){
    this.setState({editFormOpen: true});
  }

  render(){
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
  }
}

/* This 'composition' allows using the ContactForm embedded in a <table> without getting DOM validation errors */
class TableEmbeddedContactForm extends Component{
  render(){
    return (
        <tr>
          <td>
            <ContactForm {...this.props} />
          </td>
        </tr>
    )
  }
}

class ContactForm extends Component{
  constructor(){
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    let contact = {
      firstName: this.refs.firstName.value,
      middleName: this.refs.middleName.value,
      lastName: this.refs.lastName.value,
    };

    if(this.props.contact)
      contact.id = this.props.contact.id;

    this.props.onFormSubmit(contact);
  }

  render(){
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
  }
}

class ToggleableContactForm extends Component{
  constructor(){
    super();
    this.state = {
      isOpen: false,
    };

    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleFormOpen(){
    this.setState({isOpen: true});
  }

  handleFormClose(){
    this.setState({isOpen: false});
  }

  handleFormSubmit(contact){
    this.props.onFormSubmit(contact);
    this.setState({isOpen: false});
  }

  handleRefresh(){
    this.props.onRefresh();
  }

  render(){
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
  }
}

class Contact extends Component{
  constructor(){
    super();

    this.handleTrashClick = this.handleTrashClick.bind(this);
  }

  handleTrashClick(){
    this.props.onTrashClick(this.props.contact.id);
  }

  render(){
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
  }
}

ReactDOM.render(
    <ContactsDashboard />,
    document.getElementById('container')
);