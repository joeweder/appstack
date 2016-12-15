import {expect} from 'chai';
import {describe, before, it}  from 'mocha';
import {contactsReducer} from '../../reducers';
import {setContactsAction, insertContactAction, removeContactAction, updateContactAction} from '../../actions/index';
import {List, Map, fromJS} from 'immutable';

describe('Contacts Reducer', () => {

  it('Should handle an unknown message', () => {
    const newState = contactsReducer(undefined, {type: 'UNKNOWN'});
    expect(newState).to.be.an.instanceof(List);
    expect(newState).to.eql(List());
  });

  it('Should handle SET_CONTACTS', () => {
    const newState = contactsReducer(undefined, setContactsAction([{id: 1},{id: 2}]));
    expect(newState).to.eql(fromJS([{id: 1},{id: 2}]));
  });

  it('Should handle INSERT_CONTACT', () => {
    const initialState = fromJS([{id: 1},{id: 2}]);
    const newState = contactsReducer(initialState, insertContactAction({id: 3}));
    expect(newState.size).to.equal(3);
    expect(newState.get(2)).to.eql(Map({id: 3}));
  });

});

