import React from 'react';

// import classes from './Button.css';

const button = (props: any) => {
  const { disabled, classN, clicked, children, title } = props;
  return (
    <button
      type="button"
      disabled={disabled}
      className={classN}
      onClick={clicked}
      title={title}
    >
      {children}
    </button>
  );
};
export default button;
