import React, { useState, FC } from 'react';
import axios from 'axios';
import Button from '../Button/Button';

const UploadFile: FC = () => {
  const [file, setFile] = useState(null);

  const onChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const fileUpload = (f: any) => {
    const url = '';
    const formData = new FormData();
    formData.append('file', f);

    return axios.post(url, formData, {
      onUploadProgress: (progressEvent) => {
        console.log(
          `Updaload Progress +
            ${Math.round((progressEvent.loaded / progressEvent.total) * 100)} +
            %`,
        );
      },
    });
  };

  const onFormSubmit = (e: any) => {
    e.preventDefault(); // Stop form submit
    fileUpload(file).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <form onSubmit={onFormSubmit} style={{ padding: '10px' }}>
      <input type="file" onChange={onChange} accept=".xls,.xlsx" />
      <Button classN="btn btn-primary btn-header" disabled={file == null}>
        Upload
      </Button>
    </form>
  );
};

export default UploadFile;
