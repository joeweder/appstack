import React, { Component } from 'react';

export default class Contact extends Component{
  constructor() {
    super();
  }

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.contact.get('id'));
  };

  render() {
    let contact = this.props.contact;
    return (
        <tr>
          <td>{contact.get('lastName')}</td>
          <td>{contact.get('firstName')}</td>
          <td>{contact.get('middleName')}</td>
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


