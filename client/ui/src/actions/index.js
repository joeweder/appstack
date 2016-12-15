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

export const setContactsAction = (contacts) => {
  return {
    type: 'SET_CONTACTS',
    contacts: contacts
  };
};

export const insertContactAction = (contact) => {
  return {
    type: 'INSERT_CONTACT',
    contact: contact
  };
};

export const updateContactAction = (index, contact) => {
  return {
    type: 'UPDATE_CONTACT',
    index: index,
    contact: contact
  };
};

export const removeContactAction = (index) => {
  return {
    type: 'REMOVE_CONTACT',
    index: index
  };
};

