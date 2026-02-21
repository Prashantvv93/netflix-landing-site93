import React, { useEffect, useState } from "react";
import "./MovieModal.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const MovieModal = ({ movie, closeModal }) => {
    const [trailerUrl, setTrailerUrl] = useState("");

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        if (movie) {
            setTimeout(() => {
                movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                    .then((url) => {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get("v"));
                    })
                    .catch((error) => console.log(error));
            }, 500); // Slight delay for trailer search safety
        }
    }, [movie]);

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

    if (!movie) return null;

    return (
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-btn" onClick={closeModal}>
                    &times;
                </span>
                <div className="modal-body">
                    {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> : (
                        <div className="modal-backdrop-image" style={{
                            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")`,
                            height: "390px",
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }} />
                    )}
                    <div className="modal-info">
                        <div className="modal-header">
                            <h2>{movie?.title || movie?.name || movie?.original_name}</h2>
                            <button className="modal-add-btn" onClick={addToMyList}>+ My List</button>
                        </div>
                        <p className="modal-overview">{movie?.overview}</p>
                        <p className="modal-rating">Rating: {movie.vote_average}</p>
                        <p className="modal-release">Release Date: {movie.release_date || movie.first_air_date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
