import {expect} from 'chai';
import {describe, before, it}  from 'mocha';
import {messageReducer} from '../../reducers';
import {addMessageAction, removeMessageAction} from '../../actions/index';

describe('Message Reducer', () => {
  it('Should handle ADD_MESSAGE', () => {
    const newState = messageReducer('', addMessageAction('Hello User!'));
    expect(newState).to.eql('Hello User!');
  });
  it('Should handle REMOVE_MESSAGE', () => {
    const newState = messageReducer('Hello User!', removeMessageAction());
    expect(newState).to.eql('');
  });

});

