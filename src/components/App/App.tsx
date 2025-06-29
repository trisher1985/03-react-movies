import React from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { Movie } from "../../types/movie";

import "modern-normalize/modern-normalize.css";
import styles from "./App.module.css"; // імпортуємо як module

export default function App() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  const fetchMovies: (query: string) => Promise<void> = async (query) => {
    if (!query.trim()) {
      toast.error("Please enter your search query.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: { query },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      });

      const results = response.data.results;
      setMovies(results);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }
    } catch (err) {
      setError("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.appContainer}>
      <SearchBar onSubmit={fetchMovies} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
