import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import Verify from '..';

import { Account } from '../../../../common/utils/api';

const mock = new MockAdapter(axios);

describe('Verify', () => {
  let wrapper = null;
  let instance = null;
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      history: { replace: jest.fn() },
      userId: '1',
      verificationKey: 'test',
    };

    mock
      .onGet(
        Account.endpoints.verify(mockProps.userId, mockProps.verificationKey)
      )
      .reply(200);

    wrapper = shallow(<Verify {...mockProps} />);
    instance = wrapper.instance();
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('should call verifyEmail', () => {
      const spy = jest.spyOn(instance, 'verifyEmail');

      instance.componentDidMount();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('verifyEmail', () => {
    it('should set state.verificationState to "verified" if successful', async () => {
      wrapper.setState({ verificationState: 'checking' });

      await instance.verifyEmail();

      expect(wrapper.state('verificationState')).toEqual('verified');
    });

    it('should set state.verificationState to "resend" if status === 400 && verificationExpired is true', async () => {
      mock
        .onGet(
          Account.endpoints.verify(mockProps.userId, mockProps.verificationKey)
        )
        .reply(400, { verificationExpired: true });

      wrapper.setState({ verificationState: 'checking' });

      await instance.verifyEmail();

      expect(wrapper.state('verificationState')).toEqual('resend');
    });

    it('should set state.verificationState to "resend" if status === 400 && nonMatchingKey is true', async () => {
      mock
        .onGet(
          Account.endpoints.verify(mockProps.userId, mockProps.verificationKey)
        )
        .reply(400, { nonMatchingKey: true });

      wrapper.setState({ verificationState: 'checking' });

      await instance.verifyEmail();

      expect(wrapper.state('verificationState')).toEqual('nonMatching');
    });

    it('should redirect to "/dashboard" after 5 seconds if successful', async () => {
      jest.useFakeTimers();

      await instance.verifyEmail();

      jest.advanceTimersByTime(6000);

      expect(mockProps.history.replace).toHaveBeenCalledWith('/dashboard');
    });
  });

  describe('handleResendVerification', () => {
    it('should set verificiationState to "resent"', async () => {
      mock
        .onGet(Account.endpoints.resendVerification(mockProps.userId))
        .reply(200);

      await instance.handleResendVerification();

      expect(wrapper.state('verificationState')).toEqual('resent');
    });
  });
});
