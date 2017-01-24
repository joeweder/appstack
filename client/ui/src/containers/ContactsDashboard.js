import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as restClient from './restclient';
import {addMessageAction, setContactsAction, insertContactAction, removeContactAction, updateContactAction} from '../actions/index';
import ToggleableContactForm from './ToggleableContactForm';
import EditableContactList from './EditableContactList';
import UserMessageContainer from './UserMessages';

class ContactsDashboardComponent extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    restClient.getAll(this.setContacts, this.restFailure);
  };

  handleCreateFormSubmit = (contact) => {
    restClient.insertContact(contact, this.insertContact, this.restFailure);
  };

  handleEditFormSubmit = (contact) => {
    restClient.updateContact(contact, this.updateContact, this.restFailure);
  };

  handleTrashClick = (contactId) => {
    restClient.deleteContact(contactId, this.deleteContact, this.restFailure);
  };

  setContacts = (contacts) => {
    // console.log('Setting contacts list: ' + contacts);
    this.props.dispatch(setContactsAction(contacts));
  };

  restFailure = (error) => {
    // console.log("Failure: " + error.message);
    let message = error.message;
    if(error.response && error.response.data){
      message = error.response.data.message;
    }

    this.props.dispatch(addMessageAction("Failure: " + message));
  };

  insertContact = (contact) => {
    this.props.dispatch(insertContactAction(contact));
  };

  updateContact = (contact) => {
    let index = this.findIndexInListById(this.props.contacts, contact.id);
    if(-1 != index) {
      this.props.dispatch(updateContactAction(index, contact));
    }
  };

  deleteContact = (contactId) => {
    // console.log("remove contact by ID: " + contactId);
    let index = this.findIndexInListById(this.props.contacts, contactId);
    if(-1 != index) {
      this.props.dispatch(removeContactAction(index));
    }
  };

  findIndexInListById = (list, id) => {
    return list.findIndex(value => {
      return value.get('id') === id;
    });
  };

  render() {
    // console.log("ContactsDashboard render()...");
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

const mapStateToProps = (state) => ({
    contacts: state.contacts,
    userMessage: state.userMessage,
});

ContactsDashboardComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  contacts: PropTypes.object
};

const ContactsDashboard = connect(mapStateToProps)(ContactsDashboardComponent);

export default ContactsDashboard;