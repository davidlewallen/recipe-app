import React from 'react';
import { shallow } from 'enzyme';

import Register from '../';

describe('Register component snapshot test', () => {
  const props = {
    username: 'testUsername',
    handleUsername: () => {},
    password: 'testPassword',
    handlePassword: () => {},
    email: 'test@email.com',
    handleEmail: () => {},
    register: () => {},
    error: { value: false, message: '' },
  };

  it('should match snapshot', () => {
    const component = shallow(<Register {...props} />);

    expect(component).toMatchSnapshot();
  });

  it('should display error messages', () => {
    const component = shallow(<Register {...props} error={{ value: true, message: 'testError' }} />);

    expect(component).toMatchSnapshot();
  });
});
