import { createContext, useContext, useState, useCallback } from 'react';

const PROVIDER_USER_KEY = 'providerUser';

/**
 * @typedef {Object} ProviderUser
 * @property {number} id - The unique identifier of the user.
 * @property {string} name - The name of the user.
 * @property {string|null} email - The email of the user (can be null).
 * @property {string|null} phone - The phone number of the user (can be null).
 * @property {number} status - The status of the user (e.g., 1 = active).
 */

/**
 * @typedef {Object} ProviderUserData
 * @property {ProviderUser} user - The authenticated user information.
 * @property {string} token_type - The type of the token (e.g., "Bearer").
 * @property {string} access_token - The access token string.
 */

/**
 * @typedef {Object} AuthProviderUserContextType
 * @property {ProviderUserData|null} user - The authenticated user or null
 */

/**
 * @param {ProviderUserData} data
 */

// eslint-disable-next-line
export function setProviderUser(data) {
  localStorage.setItem(PROVIDER_USER_KEY, JSON.stringify(data));
}

/**
 * @returns {ProviderUserData | null}
 */
// eslint-disable-next-line
export function getProviderUser() {
  const user = localStorage.getItem(PROVIDER_USER_KEY);

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
}

// eslint-disable-next-line
export function clearProviderUser() {
  localStorage.removeItem(PROVIDER_USER_KEY);
}

/** @type {React.Context<AuthProviderUserContextType>} */
const AuthProviderUserContext = createContext({
  user: null,
  /**
   * @param {ProviderUserData} data
   */
  // eslint-disable-next-line no-unused-vars
  login: (data) => { },
  logout: () => { },
});

export const AuthProviderUser = ({ children }) => {
  const [user, setUser] = useState(getProviderUser());

  const login = useCallback(
    /**
     * @param {ProviderUserData} userData
     */
    (userData) => {
      setUser(userData);
      setProviderUser(userData);
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    clearProviderUser();
  }, []);

  return (
    <AuthProviderUserContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthProviderUserContext.Provider>
  );
}

// eslint-disable-next-line
export const useAuthProviderUser = () => useContext(AuthProviderUserContext);
