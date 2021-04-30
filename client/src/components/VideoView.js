import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
export default function VideoView(props) {
  const [videoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:4000/download/?epUrl=${props.location.state.url}`)
      .then((res) => {
        setVideoUrl(res.data);
      });
  }, [props.location.state]);
  return (
    <div className="container">
      <h1>{props.location.state.name}</h1>
      <ReactPlayer url={videoUrl} controls />
    </div>
  );
}
