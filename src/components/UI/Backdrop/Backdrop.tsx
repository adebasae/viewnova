import React from 'react';

type Props = {
  show: boolean;
  clicked: () => void;
};

const backdrop: React.FC<Props> = ({ show, clicked }) => {
  return show ? (
    <div role="presentation" className="Backdrop" onClick={clicked} />
  ) : null;
};

export default backdrop;
