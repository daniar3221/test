import React from 'react';
import './header.css'
import { useEffect } from 'react';


const Header = ({ setFilterMode, filterMode, setCurrentPage }) => {


    useEffect(() => {
        setCurrentPage(1)
        const btns = document.querySelector('.header-filter').querySelectorAll('button')
        btns.forEach(btn => btn.classList.remove('active'))
        document.getElementById(`${filterMode}Btn`).classList.add('active')
    }, [filterMode, setCurrentPage])


    return (
        <div className='header'>
            <ul className='header-filter'>
                <button id='popularBtn' onClick={() => setFilterMode('popular')}>Popular</button>
                <button id='nowBtn' onClick={() => setFilterMode('now')}>Now</button>
                <button id='topBtn' onClick={() => setFilterMode('top')}>Top rated</button>
                <button id='upcomingBtn' onClick={() => setFilterMode('upcoming')}>Upcoming</button>
                <button id='ratedBtn' onClick={() => setFilterMode('rated')}>Rated</button>
            </ul>
        </div>
    )
}

export { Header }