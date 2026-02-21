import React, { useState, useEffect } from 'react';
import './MyList.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function MyList({ onMovieSelect }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        // Load from local storage
        const storedList = JSON.parse(localStorage.getItem('myList')) || [];
        setList(storedList);
    }, []);

    const removeFromList = (movie) => {
        const newList = list.filter(item => item.id !== movie.id);
        setList(newList);
        localStorage.setItem('myList', JSON.stringify(newList));
    };

    return (
        <div className="mylist">
            <h1>My List</h1>
            {list.length === 0 ? (
                <div className="mylist__empty">
                    <p>Your list is empty.</p>
                </div>
            ) : (
                <div className="mylist__grid">
                    {list.map(movie => (
                        <div key={movie.id} className="mylist__card">
                            <img
                                className="mylist__poster"
                                src={`${base_url}${movie.poster_path || movie.backdrop_path}`}
                                alt={movie.name}
                                onClick={() => onMovieSelect && onMovieSelect(movie)}
                            />
                            <button className="mylist__remove" onClick={() => removeFromList(movie)}>Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyList;
