import React, { PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

const UserMessages = (props) => {
  let {userMessage, onClose} = props;

  if(userMessage){
    return (
      <Alert id='userMessages' bsStyle="danger" onDismiss={ onClose }>
        {userMessage}
      </Alert>
    );
  }

  return (
      <div id='userMessages' className='hidden'/>
  );
};

UserMessages.propTypes = {
  onClose: PropTypes.func.isRequired,
  userMessage: PropTypes.string
};

export default UserMessages;

