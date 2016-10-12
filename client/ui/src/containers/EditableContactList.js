import React, { Component } from 'react';
import EditableContact from './EditableContact';

export default class EditableContactList extends Component{
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

