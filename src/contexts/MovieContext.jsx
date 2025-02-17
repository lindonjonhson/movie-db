import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

    const [favourites, setFavourites] = useState([])

    // Verifying if there are any stored favourite movies
    useEffect(() => {
        const storedFavs = localStorage.getItem("favourites")

        if(storedFavs) setFavourites(JSON.parse(storedFavs))

    }, [])

    // Storing the favourites everytime the favourite state is changed
    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites))
    }, [favourites])

    const addToFavourites = () => {
        setFavourites(prev => [...prev, movie])
    }

    const removeFromFavourites = (movieId) =>{
        setFavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourite = (movieId) => {
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}