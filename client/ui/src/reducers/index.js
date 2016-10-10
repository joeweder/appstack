import {combineReducers} from 'redux';

const messageReducer = (state = '', action) => {
  console.log('messageReducer was called with state', state, 'and action', action);
  switch (action.type) {
    case 'ADD_MESSAGE':
      return action.text;
    case 'REMOVE_MESSAGE':
      return '';
    default:
      return state;
  }
};

const contactsReducer = (state = [], action) => {
  console.log('contactsReducer was called with state', state, 'and action', action);
  switch (action.type) {
    case 'SET_CONTACTS':
      return action.contacts;
    default:
      return state;
  }
};

const rootReducer = combineReducers ({
  contacts: contactsReducer,
  userMessage: messageReducer
});

export default rootReducer