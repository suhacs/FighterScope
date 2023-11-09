import { createContext } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  userRole: null,
});

export default AuthContext;
