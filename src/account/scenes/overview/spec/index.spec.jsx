import React from 'react';
import { shallow } from 'enzyme';

import Overview from '../components';

describe('Overview', () => {
  it('should render and match snapshot', () => {
    const wrapper = shallow(
      <Overview
        user={{
          username: 'testName',
          email: 'test',
          verification: { status: true },
        }}
      />
    );
    expect(wrapper.find('Grid').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
