import React, { useState } from 'react';
import { useCreatePost } from '../hooks/useCreatePost';
import { SingleFileUploader } from './FileUploader';

interface AddContentProps {
  isOpen: boolean;
  toggleModal: () => void;
}

const AddContent: React.FC<AddContentProps> = ({ isOpen, toggleModal }) => {
  const [file, setFile] = useState<File | undefined>();
  const [disableComments, setDisableComments] = useState<boolean>(false);
  const [disableLikes, setDisableLikes] = useState<boolean>(false);
  const [description, setDescription] = useState<string | undefined>();

  const { createPost, loading } = useCreatePost();

  const handleChange = (file: File) => {
    setFile(file);
  };

  const submitFile = async () => {
    if (file && !loading) {
      const res = await createPost({
        file,
        disableComments,
        disableLikes,
        description: description ?? '',
      });

      if (res) {
        handleToggleModal();
      }
    }
  };

  const handleToggleModal = () => {
    setFile(undefined);
    setDescription(undefined);
    setDisableComments(false);
    setDisableLikes(false);
    toggleModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-[rgb(59,57,57)] p-4 w-1/3 aspect-square rounded-lg ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white">Upload file</h2>
            <button onClick={handleToggleModal} className="text-white">
              X
            </button>
          </div>
          {!file && (
            <div className="custom-class-file-upload h-2/5 mb-4 w-full">
              <SingleFileUploader handleChange={handleChange} />
            </div>
          )}
          {file && (
            <div className="flex flex-col space-y-2 mb-4">
              <p className="text-white mb-4">{file.name}</p>
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mb-4"
              />
              <label className="flex items-center space-x-2 mb-4">
                <button
                  className="py-1 px-3 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setFile(undefined)}
                >
                  Select another file
                </button>
              </label>
              <textarea
                className="p-2 border rounded-md bg-[rgb(59,57,57)] text-white mb-4"
                placeholder="Add a description..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {/* <label className="flex items-center space-x-2 mb-4">
                <input name="disableComments" onClick={() => setDisableComments(!disableComments)} type="checkbox" className="bg-[rgb(59,57,57)]" />
                <span className="text-white">Disable Comments</span>
              </label>
              <label className="flex items-center space-x-2 mb-4">
                <input name="disableLikes" onClick={() => setDisableLikes(!disableLikes)} type="checkbox" className="bg-[rgb(59,57,57)]" />
                <span className="text-white">Disable Likes</span>
              </label> */}
            </div>
          )}
          <button
            disabled={loading}
            onClick={() => submitFile()}
            type="button"
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4"
          >
            Submit
          </button>
        </div>
      </div>
    )
  );
};

export { AddContent };
