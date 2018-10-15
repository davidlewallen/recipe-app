import React from 'react';
import { shallow } from 'enzyme';

import Register from '../components';

describe('Register component snapshot test', () => {
  const props = {
    password: 'testPassword',
    passwordConf: 'testPassword',
    email: 'test@email.com',
    register: jest.fn(),
    error: { value: false, message: '' },
    handleInputChange: jest.fn(),
  };

  it('should match snapshot', () => {
    const component = shallow(<Register {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('should display error messages', () => {
    const component = shallow(
      <Register {...props} error={{ value: true, message: 'testError' }} />
    );

    expect(component).toMatchSnapshot();
  });
});
