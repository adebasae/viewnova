import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from 'i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Cookies from 'js-cookie';
import { getCookies } from '../api/api';
import { configAccessType } from '../types/Types/Types';

export type AppContextType = {
  lang: string;
  access: configAccessType;
  changeLang: (val: string) => void;
  getLangMenu: () => string;
  setUserAccess: (acc: configAccessType) => void;
  closeSession: () => void;
  setNotifications: () => void;
};

type Props = {
  children: React.ReactElement;
};
let defaultLang = getCookies().get('i18n') || 'es';
const dataAccess =
  JSON.parse(sessionStorage.getItem('userData') as string) || null;

if (typeof dataAccess === 'object' && dataAccess !== null) {
  if (dataAccess.configAccess) defaultLang = dataAccess.configAccess.locale;
}

export const defaultContextValue = {
  lang: defaultLang,
  access: (dataAccess !== null
    ? dataAccess.configAccess
    : null) as configAccessType,
};

export const AppContext = createContext<AppContextType>(
  defaultContextValue as AppContextType,
);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [lang, setLang] = useState(defaultContextValue.lang);
  const [access, setAccess] = useState(defaultContextValue.access);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const parseQueryString = (queryString: string) => {
    const params = Object();
    const queries = queryString.split('&');
    queries.forEach((indexQuery: string) => {
      const indexPair = indexQuery.split('=');
      const queryKey = decodeURIComponent(indexPair[0]);
      const queryValue = decodeURIComponent(
        indexPair.length > 1 ? indexPair[1] : '',
      );
      params[queryKey] = queryValue;
    });

    return params;
  };

  const closeAuth = () => {
    sessionStorage.removeItem('userData');
    Cookies.remove('token');
    sessionStorage.clear();
    document.location.href = `${process.env.REACT_APP_API}/${lang}/logout`;

    // api
    //   .post(`/rest/${lang}/logout`)
    //   .then(() => {
    //     sessionStorage.removeItem('userData');
    //     Cookies.remove('token');
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //     // @ts-ignore
    //     document.location.href = `${process.env.REACT_APP_API}/${lang}/nlrHome`;
    //   })
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   .catch((error) => {
    //     console.log('error');
    //     // Promise.reject(error);
    //   });
  };

  const cleanNotifications = () => {
    console.log('clean notifications');
    const acc = dataAccess;
    acc.configAccess.notificacionPojo.numero = 0;
    console.log('sessionStorage.setItem(userData)');
    // sessionStorage.setItem('userData', JSON.stringify(acc));
  };

  useEffect(() => {
    Cookies.set('i18next', lang);
    i18n.changeLanguage(lang);
    i18n.dir(lang);
    i18n.options.fallbackLng = lang;
  }, [lang]);

  const getLangMenuApp = () => {
    return access.locale;
  };

  const value: AppContextType = {
    lang,
    access,
    changeLang: (newLang: string) => {
      setLang(newLang);
    },
    getLangMenu: () => {
      return getLangMenuApp();
    },
    setUserAccess: (acc: configAccessType) => {
      setAccess(acc);
    },
    closeSession: () => {
      closeAuth();
    },
    setNotifications: () => {
      cleanNotifications();
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppStore(): AppContextType {
  return useContext(AppContext);
}
