// src/common/hooks/useAPIError/index.js
import { useContext } from 'react';
import { APIErrorContext } from '../store/APIErrorContext';

function useAPIError() {
  const { error, addError, removeError, errorBack, addErrorBack } =
    useContext(APIErrorContext);
  return { error, addError, removeError, errorBack, addErrorBack };
}

export default useAPIError;
