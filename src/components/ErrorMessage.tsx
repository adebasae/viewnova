import React from 'react';
import { useTranslation } from 'react-i18next';
import useAPIError from '../hooks/useAPIError';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ErrorArgsType } from '../types/Types/Types';

const ErrorMessage: React.FC = () => {
  const { error, removeError, errorBack } = useAPIError();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();
  // console.log('error --->', error, typeof error);
  // console.log('error --->', errorBack, typeof errorBack);
  const handleSubmit = () => {
    removeError();
  };

  const titleModal = () => {
    let title = '';
    // eslint-disable-next-line no-unused-expressions
    errorBack?.title?.forEach((err: ErrorArgsType) => {
      if (err.key) {
        if (err.arguments)
          title = `${title} ${t(err.key.split('.').join('-'), {
            key: err.arguments,
          })}`;
        title = `${title} ${t(err.key.split('.').join('-'))}`;
      }
    });

    return title;
  };

  const userMessageModal = () => {
    let text = '';
    // eslint-disable-next-line no-unused-expressions
    errorBack?.userMessage?.forEach((err: ErrorArgsType) => {
      if (err.key) {
        if (err.arguments)
          text = `${text} ${t(err.key.split('.').join('-'), {
            key: err.arguments,
          })}`;
        text = `${text} ${t(err.key.split('.').join('-'))}`;
      }
    });

    return text;
  };
  return (
    <>
      <div
        className={`modal modal--small ${
          error?.message || errorBack?.errorCode ? 'is-active' : ''
        }`}
        id="modal-error"
      >
        <div className="modal__background" />
        <div className="modal__card u-text-center">
          <header className="modal__card-head u-flex">
            {error?.message ? (
              <div className="modal__card-title">{error?.message}</div>
            ) : (
              <div className="modal__card-title">{titleModal()}</div>
            )}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          </header>
          <section className="modal__card-body">
            {error?.message ? <p /> : <p>{userMessageModal()}</p>}
            <div className="modal__botonera">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                href="#"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSubmit();
                }}
              >
                Entendido
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default ErrorMessage;
