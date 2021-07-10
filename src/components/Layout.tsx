import React, { useEffect } from 'react';
import Header from './Header';
import ErrorMessage from './ErrorMessage';
import LoadingMessage from './Loading';
import InfoMessage from './InfoMessage';

const Layout: React.FC = ({ children }) => {
  useEffect(() => {
    const header = document.getElementById('myHeader');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const sticky = header.offsetTop;

    const scrollCallBack = window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        header.classList.add('sticky');
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        header.classList.remove('sticky');
      }
    });
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener('scroll', scrollCallBack);
    };
  }, []);
  return (
    <>
      <Header />
      <ErrorMessage />
      <InfoMessage />
      <LoadingMessage />
      {children}
    </>
  );
};

export default Layout;
