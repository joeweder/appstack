import React, { Component } from 'react';
import ContactForm from './ContactForm';

/* This 'composition' allows using the ContactForm embedded in a <table> without getting DOM validation errors */
export default class TableEmbeddedContactForm extends Component{
  render(){
    return (
        <tr>
          <td>
            <ContactForm {...this.props} />
          </td>
        </tr>
    );
  }
}
