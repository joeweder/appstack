import React, { Component } from 'react';

export default class UserMessages extends Component{
  render(){
    if(this.props.message){
      return (
          <div className="ui warning message transition">
            <i className="close icon" onClick={this.props.onClose}/>
            {this.props.message}
            <div className="header">
            </div>
          </div>
      )
    }
    else{
      return (
          <div className="ui warning message transition hidden">
            <i className="close icon"/>
            <div className="header">
            </div>
          </div>
      )
    }
  }
}

