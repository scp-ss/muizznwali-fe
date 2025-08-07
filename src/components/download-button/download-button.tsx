import React from 'react';
import './download-button.css';



interface DownloadButtonProps {
  label?: string;
  fileName: string;
  fileUrl: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  label = 'Download File',
  fileName,
  fileUrl,
}) => {
  const handleDownload = () => {
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = fileName
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      {label}
    </button>
  );
};

export default DownloadButton;
