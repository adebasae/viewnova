// src/common/hooks/useAPIError/index.js
import { useContext } from 'react';
import { APILoadingContext } from '../store/APILoadingContext';

function useAPILoading() {
  const { apiLoading, setApiLoading } = useContext(APILoadingContext);
  return { apiLoading, setApiLoading };
}

export default useAPILoading;
