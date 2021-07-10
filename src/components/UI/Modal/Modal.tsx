import React from 'react';

// import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

type Props = {
  show: boolean;
  modalClosed: any;
  classN: any;
};

const Modal: React.FC<Props> = ({ show, modalClosed, children, classN }) => {
  const modal: any = ['Modal'];

  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classN !== '' ? classN : modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0',
        }}
      >
        {children}
      </div>
    </>
  );
};
export default Modal;
