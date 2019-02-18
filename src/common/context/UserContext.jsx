import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';

import { Account } from '../utils/api';

const UserContext = React.createContext();

const { Provider, Consumer } = UserContext;

const propTypes = { children: node.isRequired };

const UserProvider = React.memo(({ children }) => {
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
    const {
      data: { isAuth: authStatus },
    } = await Account.auth();

    setUserAuth(authStatus);

    if (authStatus) {
      await getUser();
    } else {
      setUserLoading(false);
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (userAuth) {
      getUser();
    }
  }, [userAuth]);

  return (
    <Provider value={{ user, setUser, userAuth, setUserAuth }}>
      {children}
    </Provider>
  );
});

UserProvider.propTypes = propTypes;

export { UserProvider, Consumer as UserConsumer };
export default UserContext;
