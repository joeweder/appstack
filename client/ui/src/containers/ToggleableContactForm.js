import React, { Component, PropTypes } from 'react';
import ContactForm from './ContactForm';
import { Button } from 'react-bootstrap';

export default class ToggleableContactForm extends Component{
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  handleFormOpen = () => {
    this.setState({isOpen: true});
  };

  handleFormClose = () => {
    this.setState({isOpen: false});
  };

  handleFormSubmit = (contact) => {
    this.props.onFormSubmit(contact);
    this.setState({isOpen: false});
  };

  handleRefresh = () => {
    this.props.onRefresh();
  };

  render() {
    if(this.state.isOpen){
      return (
          <ContactForm
              onFormSubmit={this.handleFormSubmit}
              onFormClose={this.handleFormClose}
          />
      );
    }else{
      return (
          <div>
            <Button id='openAddContactFormButton' className="glyphicon glyphicon-plus" onClick={this.handleFormOpen}/>
            <Button id='refreshButton' className="glyphicon glyphicon-refresh" onClick={this.handleRefresh}/>
          </div>
      );
    }
  }
}

ToggleableContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired
};
