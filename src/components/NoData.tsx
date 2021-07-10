import React from 'react';

const NoData: React.FC = ({ children }) => {
  return (
    <>
      <div id="noData" style={{ padding: '100px 0px' }}>
        {children}
      </div>
    </>
  );
};

export default NoData;
