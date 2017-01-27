import React, { Component, PropTypes } from 'react';
import EditableContact from './EditableContact';

export default class EditableContactList extends Component{
  render(){
    const contacts = this.props.contacts.map((contact) => (
        <EditableContact
            key={contact.get('id')}
            contact={contact}
            onFormSubmit={this.props.onFormSubmit}
            onTrashClick={this.props.onTrashClick}
        />
    ));
    return (
        <table className="table table-striped table-hover">
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

EditableContactList.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onTrashClick: PropTypes.func.isRequired,
  contacts: PropTypes.object
};
