import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const LoadingMessage: React.FC = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      {promiseInProgress && (
        <div className="modal modal--small is-active loading">
          <p>imagen</p>
        </div>
      )}
    </>
  );
};
export default LoadingMessage;
