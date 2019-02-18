import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';

import { Account } from '../utils/api';

const UserContext = React.createContext();

const { Provider, Consumer } = UserContext;

const propTypes = { children: node.isRequired };

function UserProvider({ children }) {
  console.log('UserProvider rendered');
  const [user, setUser] = useState({ username: '', email: '', _id: '' });
  const [userLoading, setUserLoading] = useState(true);
  const [userAuth, setUserAuth] = useState(false);

  async function getUser() {
    const { data } = await Account.getUser();

    if (!userLoading) {
      setUserLoading(true);
    }

    setUser(data);
    setUserLoading(false);
  }

  async function initialize() {
    console.log(2);
    const {
      data: { isAuth: authStatus },
    } = await Account.auth();

    setUserAuth(authStatus);

    console.log('authStatus', authStatus);

    if (authStatus) {
      await getUser();
    } else {
      console.log(4);
      setUserLoading(false);
    }
  }

  useEffect(() => {
    console.log('1');
    initialize();
  }, []);

  useEffect(() => {
    console.log(3);
    if (userAuth) {
      console.log(5);
      getUser();
    }
  }, [userAuth]);

  return (
    <Provider value={{ user, setUser, userAuth, setUserAuth }}>
      {children}
    </Provider>
  );
}

UserProvider.propTypes = propTypes;

export { UserProvider, Consumer as UserConsumer };
export default UserContext;
