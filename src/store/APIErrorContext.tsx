import React, { useState, useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  BackErrorType,
  ErrorProviderType,
  ErrorType,
} from '../types/Types/Types';

export const defaultErrorValue = {};

export const APIErrorContext = React.createContext<ErrorProviderType>(
  defaultErrorValue as ErrorProviderType,
);

type Props = {
  children: React.ReactElement;
};

export const APIErrorProvider: React.FC<Props> = ({ children }) => {
  const [error, setError] = useState<ErrorType>({} as ErrorType);
  const [errorBack, setErrorBack] = useState<BackErrorType>(
    {} as BackErrorType,
  );

  const removeError = () => {
    setError({} as ErrorType);
    setErrorBack({} as BackErrorType);
  };

  const addError = (message: string, status: string) =>
    setError({ message, status });

  const addErrorBack = (err: BackErrorType) => setErrorBack(err);

  const contextValue = {
    error,
    errorBack,
    addError: useCallback(
      (message: string, status: string) => addError(message, status),
      [],
    ),
    addErrorBack: useCallback((err: BackErrorType) => addErrorBack(err), []),
    removeError: useCallback(() => removeError(), []),
  } as ErrorProviderType;

  return (
    <APIErrorContext.Provider value={contextValue}>
      {children}
    </APIErrorContext.Provider>
  );
};
