import React, { useState, useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InfoType, InfoProviderType } from '../types/Types/Types';

export const defaultInfoValue = {};

export const APIInfoContext = React.createContext<InfoProviderType>(
  defaultInfoValue as InfoProviderType,
);

type Props = {
  children: React.ReactElement;
};

export const APIInfoProvider: React.FC<Props> = ({ children }) => {
  const [infoMsg, setInfoMsg] = useState<InfoType>({ message: '' } as InfoType);
  const [infoCount, setInfoCount] = useState(0);

  const removeInfo = () => {
    setInfoMsg({} as InfoType);
  };

  const addInfo = (message: string) => setInfoMsg({ message });

  const contextValue = {
    infoMsg,
    infoCount,
    setInfoCount,
    addInfo: useCallback((message: string) => addInfo(message), []),
    removeInfo: useCallback(() => removeInfo(), []),
  } as InfoProviderType;

  return (
    <APIInfoContext.Provider value={contextValue}>
      {children}
    </APIInfoContext.Provider>
  );
};
