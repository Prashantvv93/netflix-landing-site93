import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { API_KEY } from '../api/requests';
import './Search.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Search({ onMovieSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length > 0) {
                try {
                    const url = `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
                    const request = await axios.get(url);
                    setResults(request.data.results);
                } catch (error) {
                    console.error("Search Error:", error);
                    setResults([]);
                }
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div className="search-page">
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="search-results">
                {results.map((movie) => (
                    (movie.poster_path || movie.backdrop_path) && (
                        <img
                            key={movie.id}
                            className="search-poster"
                            src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
                            alt={movie.name}
                            onClick={() => onMovieSelect(movie)}
                        />
                    )
                ))}
                {query.length > 0 && results.length === 0 && (
                    <div className="no-results">No results found for "{query}"</div>
                )}
            </div>
        </div>
    );
}

export default Search;
