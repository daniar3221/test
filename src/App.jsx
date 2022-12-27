import React, { useEffect, useState } from 'react';
import './App.css';
import Movielist from './components/movielist/movielist';
import { Pagination } from 'antd';
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies
} from './components/services';
import { Header } from './components/header/header';
import Spinner from './components/spinner/spinner';
import { getGuestToken, rateMovie, getRatedMovies } from './components/services';



function App() {

  const [filterMode, setFilterMode] = useState('popular')
  const [movieData, setMovieData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [onLoading, setOnLoading] = useState(true)
  const [guestToken, setGuestToken] = useState('')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY)
    })
  }, [])


  useEffect(() => {
    setOnLoading(true)
    switch (filterMode) {
      case 'popular':
        getPopularMovies(currentPage)
          .then((data) => {
            setMovieData(data.results)
            setOnLoading(false)
          })
        break;

      case 'upcoming':
        getUpcomingMovies(currentPage)
          .then((data) => {
            setMovieData(data.results)
            setOnLoading(false)
          })
        break;

      case 'now':
        getNowPlayingMovies(currentPage)
          .then((data) => {
            setMovieData(data.results)
            setOnLoading(false)
          })
        break;


      case 'top':
        getTopRatedMovies(currentPage)
          .then((data) => {
            setMovieData(data.results)
            setOnLoading(false)
          })
        break;

      case 'rated':
        getRatedMovies(guestToken)
          .then(data => {
            setMovieData(data.results)
            setOnLoading(false)
          })

        break


      default:
        break;
    }
  }, [filterMode, currentPage, guestToken])

  useEffect(() => {
    getGuestToken()
      .then(token => setGuestToken(token.guest_session_id))
  }, [setGuestToken])

  const onRateMovie = (id, value) => {
    sessionStorage.setItem(id, value)
    rateMovie(id, guestToken, value)
      .then(answer => console.log(answer))
  }

  const EmptyDiv = () => {
    return (
      <div className='empty-div'>
        <h1>There is nothing we can find</h1>
      </div>
    )
  }


  return (
    <div className="app">

      <button className={scrollY < 300 ? "back-header-hide" : "back-header-show"} onClick={() => window.scrollTo(0, 0)}>Up</button>


      <Header setFilterMode={setFilterMode} filterMode={filterMode} setCurrentPage={setCurrentPage} />
      {onLoading ?
        <Spinner /> :
        movieData.length ?
          <Movielist movieData={movieData}
            onRate={(id, value) => onRateMovie(id, value)}
          /> :
          EmptyDiv()
      }
      <div className='pagination-block'>
        <Pagination className='pagination'
          total={10000}
          current={currentPage}
          onChange={(page) => {
            setOnLoading(true)
            setCurrentPage(page)
          }}
          pageSize={20}
        />
      </div>

    </div>
  );
}

export default App;
