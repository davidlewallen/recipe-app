import React from 'react';
import { shallow } from 'enzyme';

import Login from '../';

describe('Login component snapshot test', () => {
  const props = {
    username: 'testUsername',
    handleUsername: () => {},
    password: 'testPassword',
    handlePassword: () => {},
    error: { value: false, message: '' },
    login: () => {},
  };

  it('should match snapshot', () => {
    const component = shallow(<Login {...props} />);

    expect(component).toMatchSnapshot();
  });
});
