import React, { createContext, useState, useContext, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Access, AuthContextType } from '../types/Types/Types'; // './../types/Types';
import api, { routes, getCookies } from '../api/api';

type Props = {
  children: React.ReactElement;
};

export const defaultContextValue: AuthContextType = {
  userLogin: {
    username: '',
    userrol: '',
  },
  token: '',
};

export const AuthContext = createContext<AuthContextType>(
  defaultContextValue as AuthContextType,
);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType>(defaultContextValue);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [shop, setShop] = useState<number | undefined>(0);
  const [access, setAccess] = useState<Array<Access>>(new Array<Access>());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // const logout = () => {
  //   // setUser({});
  //   // removeBearerToken();
  //   // redirectAfterLogout();
  // };

  const updateUser = async (token: string) => {
    const UserDataEmpty: AuthContextType = {
      userLogin: {
        username: '',
        userrol: '',
      },
      token: '',
    };

    if (token === '') {
      setUser(UserDataEmpty);
    } else {
      await api
        .post(routes.me)
        .then((response) => {
          const objUser: AuthContextType = {
            userLogin: { ...response.data.pojo },
            token,
          };
          // console.log('getAccessMenu desde el update');
          // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
          getAccessMenu(objUser.userLogin.userrol);
          sessionStorage.setItem(
            'userData',
            JSON.stringify({
              ...objUser,
            }),
          );
          setUser(objUser);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  function getCookie(cname: string) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  useEffect(() => {
    const token = getCookie('token');
    setIsAdmin(user.userLogin.userrol === 'ADMIN');

    setIsAuthenticated(token !== '');
  }, [user]);

  useEffect(() => {
    if (user.userLogin.username !== '')
      sessionStorage.setItem(
        'userData',
        JSON.stringify({
          ...user,
          shop,
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);

  useEffect(() => {
    const token = getCookies().get('token');
    if (token !== undefined) {
      window.history.replaceState(null, '', window.location.pathname);
      const dataUser =
        JSON.parse(sessionStorage.getItem('userData') as string) || null;

      if (dataUser !== null) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define,no-use-before-define
        getAccessMenu(dataUser.userLogin.userrol);
        setUser(dataUser);
      } else {
        updateUser(token);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setToken = async (token: string) => {
    const now = new Date();
    const minutos = 12 * 60;
    now.setTime(now.getTime() + minutos * 60 * 1000);
    document.cookie = `token=${token}; expires=${now.toUTCString()};path=/;`;
    await updateUser(token);
  };

  // const updateToken = async (params: {}) => {
  // await api
  //   .post(routes.login, params)
  //   .then((token) => {
  //     if (token.data) {
  //       setToken(token.data);
  //       window.history.replaceState(
  //         null,
  //         '',
  //         window.location.href.split('?')[0],
  //       );
  //     } else {
  //       window.location.href = `${process.env.REACT_APP_API}/${
  //         i18n.language || 'es'
  //       }${process.env.REACT_APP_SERVER_AUTH_PATH}`;
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     logout();
  //   });
  // };

  const getAccessMenu = (rol: string) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const route = require('../i18n/router/access.json');
    // eslint-disable-next-line no-console
    // console.log('route', user.userLogin, route, rol);
    const routerFinal = new Array<Access>();
    route.access.forEach((obj: Access) => {
      const links = obj.links.filter((o: { role: string[] }) =>
        o.role.includes(rol.toUpperCase()),
      );
      if (links.length > 0) {
        routerFinal.push({ ...obj, links });
      }
    });
    // eslint-disable-next-line no-console
    // console.log(routerFinal);
    setAccess(routerFinal);
  };

  const valueContext: any = {
    user,
    setToken,
    isAdmin,
    isAuthenticated,
    shop,
    setShop,
    access,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export function useAuthStore(): any {
  return useContext(AuthContext);
}
