import React, { PropTypes } from 'react';
// import { Alert } from 'react-bootstrap';

const UserMessages = (props) => {
  let {userMessage, onClose} = props;

  if(userMessage){
    return (
      <div className="alert alert-danger" role="alert" id='userMessages' onClick={ onClose }>
        {userMessage}
      </div>
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

