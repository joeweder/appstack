import {combineReducers} from 'redux';
import {List, fromJS} from 'immutable';

export const messageReducer = (state = '', action) => {
  // console.log('messageReducer was called with state', state, 'and action', action);
  switch (action.type) {
    case 'ADD_MESSAGE':
      return action.text;
    case 'REMOVE_MESSAGE':
      return '';
  }

  return state;
};

export const contactsReducer = (state = List(), action) => {
  // console.log('contactsReducer was called with state: ', state, ' and action: ', action);
  switch (action.type) {
    case 'SET_CONTACTS':
      return fromJS(action.contacts);
    case 'INSERT_CONTACT':
      return state.push(fromJS(action.contact));
    case 'UPDATE_CONTACT':
      return state.set(action.index, fromJS(action.contact));
    case 'REMOVE_CONTACT':
      return state.delete(action.index);
  }

  return state;
};

const rootReducer = combineReducers ({
  contacts: contactsReducer,
  userMessage: messageReducer
});

export default rootReducer;