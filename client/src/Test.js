import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Test() {
  const [images, setImage] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/manga/chapter/?chapterUrl=https://mangadex.tv/chapter/kxqh9261558062112/chapter_9"
      )
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {images.map((image) => {
        return <img src={image} alt="hey" />;
      })}
    </div>
  );
}
