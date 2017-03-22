import React, { Component, PropTypes } from 'react';
import Contact from './Contact';
import TableEmbeddedContactForm from './TableEmbeddedContactForm';

export default class EditableContact extends Component{
  constructor(){
    super();
    this.state = {
      editFormOpen: false,
    };
  }

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onTrashClick: PropTypes.func.isRequired,
    contact: PropTypes.object
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (contact) => {
    this.props.onFormSubmit(contact);
    this.closeForm();
  };

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
              contact={this.props.contact.toJS()}
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
