import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as restClient from './restclient';
import {addMessageAction, refreshContactsAction} from '../actions/index'
import ToggleableContactForm from './ToggleableContactForm'
import EditableContactList from './EditableContactList'
import UserMessageContainer from './UserMessages'

class ContactsDashboardComponent extends Component{
  constructor() {
    super();
  }

  componentDidMount(){
    this.refresh();
  }

  handleCreateFormSubmit = (contact) => {
    this.createContact(contact);
  };

  handleEditFormSubmit = (contact) => {
    this.updateContact(contact);
  };

  handleTrashClick = (contactId) => {
    this.deleteContact(contactId);
  };

  restFailure = (error) => {
    console.log("Failure: " + error.message);
    let message = error.message;
    if(error.response && error.response.data){
      message = error.response.data.message;
    }

    this.props.dispatch(addMessageAction("Failure: " + message));
  };

  restSetState = (response) => {
    console.log('REST setState: setting state to:' + response.data);
    this.props.dispatch(refreshContactsAction(response.data));
  };

  refresh = () => {
    restClient.getAll(this.restSetState, this.restFailure);
  };

  createContact = (contact) => {
    restClient.insertContact(contact, this.refresh, this.restFailure);
  };

  deleteContact = (contactId) => {
    restClient.deleteContact(contactId, this.refresh, this.restFailure);
  };

  updateContact = (contact) => {
    restClient.updateContact(contact, this.refresh, this.restFailure);
  };

  render(){
    console.log("ContactsDashboard render()...");
    return (
        <div>
          <UserMessageContainer />
          <ToggleableContactForm
              onFormSubmit={this.handleCreateFormSubmit}
              onRefresh={this.refresh}
          />
          <EditableContactList
              contacts={this.props.contacts}
              onFormSubmit={this.handleEditFormSubmit}
              onTrashClick={this.handleTrashClick}
          />
        </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    contacts: state.contacts,
    userMessage: state.userMessage,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    dispatch: dispatch,
  }
);

const ContactsDashboard = connect(mapStateToProps, mapDispatchToProps)(ContactsDashboardComponent);

export default ContactsDashboard