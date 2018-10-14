import React from 'react';
import { shallow } from 'enzyme';

import VerifyEmailPrompt from '../VerifyEmailPrompt';

describe('VerifyEmailPrompt', () => {
  it('should match snapshot', () => {
    expect(shallow(<VerifyEmailPrompt />)).toMatchSnapshot();
  });
});
