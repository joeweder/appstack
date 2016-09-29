import React, { Component } from 'react';
import Contact from './Contact'
import TableEmbeddedContactForm from './TableEmbeddedContactForm'

export default class EditableContact extends Component{
  constructor(){
    super();
    this.state = {
      editFormOpen: false,
    };
  }

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
