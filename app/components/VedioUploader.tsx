import React, { useState } from "react";
import axios from "axios";

const VideoUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);

    try {
      // Replace with your VdoCipher API URL and required parameters
      const apiUrl = "https://api.vdocipher.com/v3/videos"; // Example endpoint
      const apiKey = "your-api-key"; // Replace with your actual API key

      // Step 1: Get the upload URL from VdoCipher
      const { data: { uploadUrl, videoId } } = await axios.post(apiUrl, null, {
        headers: {
          Authorization: `Apisecret ${apiKey}`,
        },
      });

      // Step 2: Upload the video file to the provided upload URL
      const formData = new FormData();
      formData.append("file", selectedFile);

      await axios.put(uploadUrl, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setUploadProgress(progress);
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadSuccess(true);
      setSelectedFile(null);
      alert(`Video uploaded successfully! Video ID: ${videoId}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Video to VdoCipher</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {uploading && <p>Uploading: {uploadProgress}%</p>}
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Uploading..." : "Upload Video"}
      </button>
      {uploadSuccess === true && <p>Upload successful!</p>}
      {uploadSuccess === false && <p>Upload failed. Please try again.</p>}
    </div>
  );
};

export default VideoUploader;
