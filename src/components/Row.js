import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

import './Row.css'

import axios from '../api/axios'
import { BASE_URL } from '../api/requests'

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  const handleClick = (movie) => {
    console.log(movie)
    if (trailerUrl) setTrailerUrl('')
    else {
      movieTrailer(movie?.name || movie?.title || movie?.original_title || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch((err) => console.log(err.message))
    }
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setMovies(request.data.results)
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies &&
          movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${BASE_URL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              className={`row__poster ${isLargeRow && 'row__poster-large'}`}
            />
          ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
