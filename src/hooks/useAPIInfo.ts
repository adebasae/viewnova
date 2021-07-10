// src/common/hooks/useAPIError/index.js
import { useContext } from 'react';
import { APIInfoContext } from '../store/APIInfoContext';

function useAPIInfo() {
  const { addInfo, infoMsg, removeInfo, infoCount, setInfoCount } =
    useContext(APIInfoContext);
  return { addInfo, infoMsg, removeInfo, infoCount, setInfoCount };
}

export default useAPIInfo;
