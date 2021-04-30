import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AnimeView(props) {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/details/?url=${props.location.state.url}`)
      .then((res) => {
        setEpisodes(res.data.episodes);
      });
  }, []);
  return (
    <div>
      <div className="episode-list">
        {episodes.map((episode) => {
          return (
            <div key={episode.id} className="episode">
              <h1>{episode.episode}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
