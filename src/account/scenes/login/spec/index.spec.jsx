import React from 'react';
import { shallow } from 'enzyme';

import Login from '../components';

describe('Login component snapshot test', () => {
  const props = {
    password: 'testPassword',
    email: 'test@email.com',
    error: { value: false, message: '' },
    login: jest.fn(),
    handleInputChange: jest.fn(),
  };

  it('should match snapshot', () => {
    const component = shallow(<Login {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('should display error message', () => {
    const component = shallow(
      <Login {...props} error={{ value: true, message: 'test error' }} />
    );

    expect(component).toMatchSnapshot();
  });
});
