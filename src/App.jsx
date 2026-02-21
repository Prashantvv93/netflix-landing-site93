import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import MyList from './pages/MyList';
import MovieModal from './components/MovieModal';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

// Protected Route Wrapper
const RequireAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  console.log('RequireAuth check - User:', user); // Debug log

  if (!user) {
    console.log('Redirecting to login...');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Layout for protected pages (with Navbar/Footer)
const Layout = ({ children, onMovieSelect }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  // Check if we are on a public route to skip intro if desired,
  // but for now, we'll keep it simple.

  return (
    <div className="app">
      {/* Intro only shows on mount, handled by component internal state mostly */}

      <Router>
        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <RequireAuth>
              {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}
              <Layout>
                <Home onMovieSelect={setSelectedMovie} />
              </Layout>
            </RequireAuth>
          } />

          <Route path="/search" element={
            <RequireAuth>
              <Layout>
                <Search onMovieSelect={setSelectedMovie} />
              </Layout>
            </RequireAuth>
          } />

          <Route path="/mylist" element={
            <RequireAuth>
              <Layout>
                <MyList onMovieSelect={setSelectedMovie} />
              </Layout>
            </RequireAuth>
          } />

        </Routes>

        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            closeModal={() => setSelectedMovie(null)}
          />
        )}
      </Router>
    </div>
  );
}

export default App;
