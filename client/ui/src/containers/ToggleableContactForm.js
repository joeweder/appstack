import React, { Component } from 'react';
import ContactForm from './ContactForm'

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
