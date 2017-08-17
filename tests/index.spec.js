/* eslint-disable no-var */

import React from 'react';
import FrontendPage from '../src/components/FrontendPage/FrontendPage.js';
import {expect} from 'chai';
import {shallow} from 'enzyme';

describe('FrontendPage tag test', () => {
  const wrapper = shallow(<FrontendPage />);
  it('should be a <div> tag', () => {
    expect(wrapper.type()).to.eql('div');
  });
});
