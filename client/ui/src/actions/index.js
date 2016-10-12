export const addMessageAction = (text) => {
  return {
    type: 'ADD_MESSAGE',
    text: text
  };
};

export const removeMessageAction = () => {
  return {
    type: 'REMOVE_MESSAGE',
    text: null
  };
};

export const refreshContactsAction = (contacts) => {
  return {
    type: 'SET_CONTACTS',
    contacts: contacts
  };
};

