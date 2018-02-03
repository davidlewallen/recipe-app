import React from 'react';
import { shallow } from 'enzyme';

import HomepageContainer from '../container/HomepageContainer';

describe('HomepageContainer', () => {
  it('should render', () => {
    const wrapper = shallow(<HomepageContainer />);
    expect(wrapper.find('Homepage').exists()).toBe(true);
  });
});
