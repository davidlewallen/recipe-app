import React from 'react';
import { shallow } from 'enzyme';
import VerifyEmail, { Verifying, Verified, Resend, Resent, Invalid } from '..';

describe('VerifyEmail Component', () => {
  let wrapper = null;
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      verificationState: '',
      handleResendVerification: jest.fn(),
    };

    wrapper = shallow(<VerifyEmail {...mockProps} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <Verifying /> if verificationState = "checking"', () => {
    wrapper.setProps({ verificationState: 'checking' });

    expect(wrapper.find('Verifying').exists()).toBe(true);
  });

  it('should render <Verified /> if verificationState = "verified"', () => {
    wrapper.setProps({ verificationState: 'verified' });

    expect(wrapper.find('Verified').exists()).toBe(true);
  });

  it('should render <Resend /> if verificationState = "resend"', () => {
    wrapper.setProps({ verificationState: 'resend' });

    expect(wrapper.find('Resend').exists()).toBe(true);
  });

  it('should render <Invalid /> if verificationState = "nonMatching"', () => {
    wrapper.setProps({ verificationState: 'nonMatching' });

    expect(wrapper.find('Invalid').exists()).toBe(true);
  });
  it('should render <Resent /> if verificationState = "resent"', () => {
    wrapper.setProps({ verificationState: 'resent' });

    expect(wrapper.find('Resent').exists()).toBe(true);
  });
});

describe('Verifying', () => {
  it('should matchsnapshot', () => {
    expect(shallow(<Verifying />)).toMatchSnapshot();
  });
});

describe('Verified', () => {
  it('should matchsnapshot', () => {
    expect(shallow(<Verified />)).toMatchSnapshot();
  });
});

describe('Resend', () => {
  it('should matchsnapshot', () => {
    expect(
      shallow(<Resend handleResendVerification={jest.fn()} />)
    ).toMatchSnapshot();
  });
});

describe('Resent', () => {
  it('should matchsnapshot', () => {
    expect(shallow(<Resent />)).toMatchSnapshot();
  });
});

describe('Invalid', () => {
  it('should matchsnapshot', () => {
    expect(shallow(<Invalid />)).toMatchSnapshot();
  });
});
