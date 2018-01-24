import React from 'react';
import { shallow } from 'enzyme';

import Header from '../components';

describe('Header component', () => {
  it('should match snapshot', () => {
    const component = shallow(<Header logout={jest.fn()} handleModalOpen={jest.fn()} />);
    expect(component).toMatchSnapshot();
  });
});
