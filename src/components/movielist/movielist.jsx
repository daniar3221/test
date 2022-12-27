import React from 'react';
import './movielist.css'
import MovieItem from '../movieitem/movieitem';

const Movielist = ({ movieData, onRate }) => {
    console.log(movieData);
    const movies = movieData.map((movie) =>
        <MovieItem key={movie.id} movie={movie} onRate={(id, value) => onRate(id, value)} />)

    return (
        <div className='movie-list'>
            {movies}
        </div>
    )
}


export default Movielist
