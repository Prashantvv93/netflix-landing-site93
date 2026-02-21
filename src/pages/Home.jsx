import React from 'react';
import Row from '../components/Row';
import Banner from '../components/Banner';
import requests from '../api/requests';

function Home({ onMovieSelect }) {
    return (
        <div className="home">
            <Banner onMovieSelect={onMovieSelect} />

            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow
                onMovieSelect={onMovieSelect}
            />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieSelect={onMovieSelect} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onMovieSelect={onMovieSelect} />
            <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onMovieSelect={onMovieSelect} />
            <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} onMovieSelect={onMovieSelect} />
            <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} onMovieSelect={onMovieSelect} />
            <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} onMovieSelect={onMovieSelect} />
            <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} onMovieSelect={onMovieSelect} />
        </div>
    );
}

export default Home;
