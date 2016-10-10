import React, { PropTypes } from 'react'

const UserMessages = (props) => {
  let {userMessage, onClose} = props;

  if(userMessage){
    return (
        <div className="ui warning message transition">
          <i className="close icon" onClick={onClose}/>
          {userMessage}
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
};

UserMessages.propTypes = {
  onClose: PropTypes.func.isRequired,
  userMessage: PropTypes.string
};

export default UserMessages

