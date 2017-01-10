export const addMessageAction = (text) => {
  return {
    type: 'ADD_MESSAGE',
    text
  };
};

export const removeMessageAction = () => {
  return {
    type: 'REMOVE_MESSAGE',
    text: null
  };
};

export const setContactsAction = (contacts) => {
  return {
    type: 'SET_CONTACTS',
    contacts
  };
};

export const insertContactAction = (contact) => {
  return {
    type: 'INSERT_CONTACT',
    contact
  };
};

export const updateContactAction = (index, contact) => {
  return {
    type: 'UPDATE_CONTACT',
    index,
    contact
  };
};

export const removeContactAction = (index) => {
  return {
    type: 'REMOVE_CONTACT',
    index
  };
};

