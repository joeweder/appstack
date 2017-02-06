import React from 'react';
import {describe, before, it}  from 'mocha';
import { shallow } from 'enzyme';
import { should, assert, expect } from 'chai';
// import 'chai/should';
import sinon from 'sinon';
import ToggleableContactForm from '../../containers/ToggleableContactForm';

describe("<ToggleableContactForm />", () => {
  it('should render', () => {
    //setup: create test data
    const message = 'Hello User!';

    //exercise: render the data into a component
    const handleCreateFormSubmit = sinon.spy();
    const refresh = sinon.spy();
    const item = shallow(<ToggleableContactForm
        onFormSubmit={handleCreateFormSubmit}
        onRefresh={refresh}
    />);

    //verify: rendered DOM values are what we expect
    // assert(item.hasClass('ui'));

    const button = item.find('#refreshButton');
    expect(button, "We should have found the #refreshButton").to.not.be.null;
    button.simulate('click');
    expect(refresh).to.have.property('callCount', 1);

  });
/*
  it('should react to onCloseClick', () => {
    //setup: create test data
    const message = 'Hello User!';
    const onCloseClick = sinon.spy();

    //exercise: render the data into a component
    const item = shallow(<UserMessages userMessage={message} onClose={onCloseClick}/>);

    item.find('i').simulate('click');
    expect(onCloseClick).to.have.property('callCount', 1);
  });
*/
});