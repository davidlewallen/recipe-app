import React from 'react';
import { shallow } from 'enzyme';

import Homepage from '../components';

describe('Homepage', () => {
  it('should render and match snapshot', () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper.find('Grid').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
