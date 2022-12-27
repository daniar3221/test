import React from 'react';
import './movieitem.css'
import { Button, Popover } from 'antd';
import { getDate, parseISO, getYear, format } from 'date-fns'
import { Rate } from 'antd';
import { useState } from 'react';


const MovieItem = ({ movie, onRate }) => {

    const [rate, setRate] = useState(0)

    const overviewText = () => {
        if (movie.overview.length < 285) {
            return movie.overview
        } else {
            return <div>
                {movie.overview.slice(0, 285) + '...'}
                <Popover overlayInnerStyle={{ fontSize: '14px' }}
                    overlayStyle={{ width: '300px' }}
                    content={movie.overview} trigger="focus">
                    <Button className='more-btn'>Read more</Button>
                </Popover>
            </div>
        }

    }

    const releaseDate = () => {
        if (!movie.release_date) return ''
        const parsedDate = parseISO(movie.release_date)
        const month = format(new Date(parsedDate), 'MMM')
        const day = getDate(parsedDate)
        const year = getYear(parsedDate)
        return `${month} ${day} ${year}`
    }

    const putValue = () => {
        if (sessionStorage.getItem(movie.id)) {
            return JSON.parse(sessionStorage.getItem(movie.id) || '0')
        }
        const defaultValue = movie.rating ? movie.rating : rate
        return defaultValue
    }

    return (
        <div className='movie-item'>
            <div className='left'>
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
            </div>
            <div className='right'>
                <h3>{movie.title}</h3>
                <span className='realese-date'>{releaseDate()}</span>
                <div className='overview-text'>{overviewText()}</div>

                <div className='rate-movie'>
                    <Rate count={10}
                        value={putValue()}
                        onChange={(value) => {
                            setRate(value)
                            onRate(movie.id, value)
                        }} />
                </div>


            </div>
        </div>
    )
}

export default MovieItem