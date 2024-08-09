import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({
  videoUrl = "b8c9e05eac803a20448e69247349442e",
  title,
}) => {
  console.log("🚀 ~ videoUrl:", videoUrl);
  const [videoData, setVideoData] = useState<{
    otp: string;
    playbackInfo: string;
  }>({
    otp: "",
    playbackInfo: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVideoData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/getVdoCipherOTP",
          {
            videoId: "b8c9e05eac803a20448e69247349442e",
          }
        );
        if (isMounted) {
          setVideoData(response.data);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to load video data.");
          console.error("Error fetching video data:", error);
        }
      }
    };

    if (videoUrl) {
      fetchVideoData();
    }

    return () => {
      isMounted = false; // Clean up to avoid setting state on an unmounted component
    };
  }, [videoUrl]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}
    >
      {videoData.otp && videoData.playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=Ub9OiZXIOeUXH0Nv`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
          allowFullScreen
          allow="encrypted-media"
          title={title}
        />
      )}
    </div>
  );
};

export default CoursePlayer;
