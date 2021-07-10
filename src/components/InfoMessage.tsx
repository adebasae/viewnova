import React from 'react';
// import { useTranslation } from 'react-i18next';
import useAPIInfo from '../hooks/useAPIInfo';
// import { ErrorArgsType } from '../types/Types';
// import { IconX } from '../Icons';

const InfoMessage: React.FC = () => {
  const { infoMsg, infoCount } = useAPIInfo();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t } = useTranslation();

  // const handleSubmit = () => {
  //   removeInfo();
  // };

  let count = infoCount;
  if (count < 0) count = 0;

  const infoDiv =
    count > 0 ? (
      <div className="alert info fixed-alert-info">
        <span className="closebtn">×</span>
        <strong>Info!</strong> {infoMsg!.message}
      </div>
    ) : null;

  return infoDiv;
};
export default InfoMessage;
