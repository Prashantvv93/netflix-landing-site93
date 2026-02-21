import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Row.css";
import SkeletonLoader from "./SkeletonLoader";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow, onMovieSelect }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.error("Error fetching row:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {loading ? (
                    <SkeletonLoader type="poster" />
                ) : (
                    movies.map(
                        (movie) =>
                            (movie.poster_path) && (
                                <div
                                    key={movie.id}
                                    className="row__posterContainer row__posterContainerLarge"
                                    onClick={() => onMovieSelect && onMovieSelect(movie)}
                                >
                                    <img
                                        className="row__poster row__posterLarge"
                                        src={`${base_url}${movie.poster_path}`}
                                        alt={movie.name}
                                    />
                                    <p className="row__posterName">
                                        {movie.title || movie.name || movie.original_name}
                                    </p>
                                </div>
                            )
                    )
                )}
            </div>
        </div>
    );
}

export default Row;
