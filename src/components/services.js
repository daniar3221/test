const api_key = '80ddb0119ef97691044dae9aad3d1bef'

export const getPopularMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`)
    const data = await response.json()
    return data
}


export const getNowPlayingMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3//movie/now_playing?api_key=${api_key}&language=en-US&page=${page}`)
    const data = await response.json()
    return data
}

export const getTopRatedMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3//movie/top_rated?api_key=${api_key}&language=en-US&page=${page}`)
    const data = await response.json()
    return data
}

export const getUpcomingMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3//movie/upcoming?api_key=${api_key}&language=en-US&page=${page}`)
    const data = await response.json()
    return data
}


export const getGuestToken = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${api_key}`)
    const token = await response.json()
    return token
}

export const rateMovie = async (id, guestToken, rateValue) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestToken}&api_key=${api_key}` ,
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rateValue }),
      }
      )
    const answer = await response.json()
    return answer
}

export const getRatedMovies = async(token) => {
    const response = await fetch(`https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=${api_key}`)
    const data = await response.json()
    return data
}



