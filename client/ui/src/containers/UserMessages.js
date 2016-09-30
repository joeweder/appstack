import React, { Component } from 'react';
import { connect } from 'react-redux'

import {removeMessageAction} from '../actions/index'
import UserMessages from '../components/UserMessages'

const mapStateToProps = (state) => (
{
  userMessage: state.userMessage,
}
);

const mapDispatchToProps = (dispatch) => (
{
  onClose: () => {dispatch(removeMessageAction())}
}
);

const UserMessageContainer = connect(mapStateToProps, mapDispatchToProps)(UserMessages);

export default UserMessageContainer

