import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [popular, setPopular] = useState([]);
  const [recent, setRecent] = useState([]);

  async function getTrending() {
    try {
      var res = await axios.get("http://localhost:4000/recent");
      setRecent(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function getPopular() {
    try {
      var res = await axios.get("http://localhost:4000/popular");
      setPopular(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getTrending();
    getPopular();
  }, []);
  return (
    <div className="container">
      <h1>Home</h1>
      <h1>Recent</h1>
      {recent.length === 0 ? (
        <h5>Loading</h5>
      ) : (
        <div id="recent" className="align_horizon">
          {recent.map((anime) => {
            return (
              <div key={anime.animeName}>
                <Link
                  to={{
                    pathname: "/video",
                    state: { url: anime["videoUrl"], name: anime.animeName },
                  }}
                >
                  <img
                    src={anime.imgUrl}
                    height="300px"
                    width="150px"
                    alt={anime.animeName}
                  />
                </Link>

                <h3>{anime.animeName}</h3>
                <h4>Episode : {anime["extra"]}</h4>
              </div>
            );
          })}
        </div>
      )}
      <h1>Popular</h1>
      {recent.length === 0 ? (
        <h5>Loading</h5>
      ) : (
        <div id="popular" className="align_horizon">
          {popular.map((anime) => {
            return (
              <div key={anime.animeName}>
                <Link
                  to={{
                    pathname: "/anime",
                    state: {
                      url: anime.videoUrl,
                    },
                  }}
                >
                  <img
                    src={anime.imgUrl}
                    height="300px"
                    width="150px"
                    alt={anime.animeName}
                  />
                  <h3>{anime.animeName}</h3>
                  <h4>Year : {anime["extra"]}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
