import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';
import SkeletonLoader from './SkeletonLoader';

function Banner({ onMovieSelect }) {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const results = request.data.results;

                if (results && results.length > 0) {
                    setMovies(results.slice(0, 5));
                }
            } catch (error) {
                console.error("Banner Error:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (movies.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % movies.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [movies]);

    const movie = movies[currentIndex];

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const addToMyList = (e) => {
        e.stopPropagation();
        if (!movie) return;
        const currentList = JSON.parse(localStorage.getItem('myList')) || [];
        const isAlreadyAdded = currentList.find(item => item.id === movie.id);

        if (!isAlreadyAdded) {
            const newList = [...currentList, movie];
            localStorage.setItem('myList', JSON.stringify(newList));
            alert("Added to My List!");
        } else {
            alert("Already in My List!");
        }
    };

    if (loading) return <SkeletonLoader type="banner" />;
    if (!movie) return <header className="banner" style={{ minHeight: '448px' }} />;

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
                backgroundPosition: "center center",
                transition: "background-image 0.5s ease-in-out"
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <button className="banner__button" onClick={() => onMovieSelect && onMovieSelect(movie)}>Play</button>
                    <button className="banner__button" onClick={addToMyList}>My List</button>
                </div>

                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner;
