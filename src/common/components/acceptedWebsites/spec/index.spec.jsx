import React from 'react';
import { shallow } from 'enzyme';

import AcceptedWebsites from '../components';

import genKey from '../../../utils/randomKeys';

describe('AcceptedWebsites', () => {
  const mockProps = {
    show: true,
    handleAcceptedModal: jest.fn(),
    acceptedWebsites: ['test', 'test2'],
  };

  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<AcceptedWebsites {...mockProps} />);
    instance = wrapper.instance();
  });

  it('should render and match snapshot', () => {
    expect(wrapper.find('Modal').exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('should generate keys from website text', () => {
    expect(
      wrapper
        .find('Col')
        .at(1)
        .key()
    ).toBe(genKey(mockProps.acceptedWebsites[0]));
  });
});
