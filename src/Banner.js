import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Banner.css";
import requests from "./request";
const Banner = () => {
  const [movie, setMovie] = useState([]);
  const truncate = (str,n)=>{
      if(str.length > n)
        return str.substr(0,n)+'...'
    return str

  }
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  return (
    <header
      className="banner"
      style={
        movie && {
          backgroundSize: "cover",
          backgroundImage: `url(
            "https://image.tmdb.org/t/p/original${movie?.poster_path}"
        )`,
          backgroundPosition: "center center",
        }
      }
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.original_title || movie?.name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <div className="banner__description">
          {/* <p>{truncate(movie?.overview,300)}</p> */}
          {movie?.overview && truncate(movie?.overview,150)}
        </div>
      </div>
    </header>
  );
};

export default Banner;