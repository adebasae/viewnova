import React, { useState, useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LoadingProviderType } from '../types/Types/Types';

export const defaultLoadingValue = {};

export const APILoadingContext = React.createContext<LoadingProviderType>(
  defaultLoadingValue as LoadingProviderType,
);

type Props = {
  children: React.ReactElement;
};

export const APILoadingProvider: React.FC<Props> = ({ children }) => {
  const [apiLoading, setLoading] = useState(false);

  const setLoad = (val: boolean) => setLoading(val);

  const contextValue = {
    apiLoading,
    setApiLoading: useCallback((val: boolean) => setLoad(val), []),
  } as LoadingProviderType;

  return (
    <APILoadingContext.Provider value={contextValue}>
      {children}
    </APILoadingContext.Provider>
  );
};
