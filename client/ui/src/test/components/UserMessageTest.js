import React from 'react';
import {describe, before, it}  from 'mocha';
import { shallow } from 'enzyme';
import { should, assert, expect } from 'chai';
import sinon from 'sinon';
import UserMessages from '../../components/UserMessages';

describe("<UserMessages />", () => {
  it('should render', () => {
    //setup: create test data
    const message = 'Hello User!';

    //exercise: render the data into a component
    const item = shallow(<UserMessages userMessage={message} />);

    //verify: rendered DOM values are what we expect
    assert(item.hasClass('ui'));
    assert(item.hasClass('warning'));
    assert(item.hasClass('message'));
    assert(item.hasClass('transition'));
    expect(item.text()).to.equal(message);
  });
  it('should react to onCloseClick', () => {
    //setup: create test data
    const message = 'Hello User!';
    const onCloseClick = sinon.spy();

    //exercise: render the data into a component
    const item = shallow(<UserMessages userMessage={message} onClose={onCloseClick}/>);

    item.find('i').simulate('click');
    expect(onCloseClick).to.have.property('callCount', 1);
  });
});