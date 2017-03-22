import React, { Component, PropTypes } from 'react';
// import { Button } from 'react-bootstrap';

export default class Contact extends Component{
  constructor() {
    super();
  }

  static propTypes = {
    onTrashClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    contact: PropTypes.object
  };

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
          <td>
            <button type="button" className="btn btn-default glyphicon glyphicon-pencil" onClick={this.props.onEditClick}/>
            <button type="button" className="btn btn-default glyphicon glyphicon-trash" onClick={this.handleTrashClick}/>
          </td>
        </tr>
    );
  }
}



