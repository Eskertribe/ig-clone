import React from 'react';

const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'video/mp4'];

const SingleFileUploader: React.FC<{ handleChange: (file: File) => void }> = ({ handleChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && !ALLOWED_FILE_TYPES.includes(e.target.files[0].type)) {
      alert('Invalid file type'); //TODO: TOAST?
      return;
    }

    if (e.target.files) {
      handleChange(e.target.files[0]);
    }
  };

  return (
    <div className="input-group">
      <input id="file" type="file" onChange={handleFileChange} />
    </div>
  );
};

export { SingleFileUploader };