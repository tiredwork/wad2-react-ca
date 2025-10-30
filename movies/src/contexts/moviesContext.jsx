import React, { useEffect, useState } from "react";

export const MoviesContext = React.createContext(null);

const safeParse = (val) => {
  try {
    return JSON.parse(val);
  } catch (e) {
    return null;
  }
};

const MoviesContextProvider = (props) => {
  // initialize favorites from localStorage (support both id arrays and movie object arrays)
  const initialFavorites = (() => {
    if (typeof window === 'undefined') return [];
    const raw = safeParse(localStorage.getItem('favorites') || '[]') || [];
    // raw might be array of ids or array of movie objects
    return raw
      .map((item) => (typeof item === 'number' ? item : item && item.id))
      .filter((id) => typeof id === 'number');
  })();

  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    // persist favorites as array of ids
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      // ignore localStorage errors
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (!prev.includes(movie.id)) {
        return [...prev, movie.id];
      }
      return prev;
    });
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => prev.filter((mId) => mId !== movie.id));
  };

  // Playlist: store array of movie ids (mirror favorites behavior)
  const initialPlaylist = (() => {
    if (typeof window === 'undefined') return [];
    const raw = safeParse(localStorage.getItem('playlist') || '[]') || [];
    return raw
      .map((item) => (typeof item === 'number' ? item : item && item.id))
      .filter((id) => typeof id === 'number');
  })();

  const [playlist, setPlaylist] = useState(initialPlaylist);

  useEffect(() => {
    try {
      localStorage.setItem('playlist', JSON.stringify(playlist));
    } catch (e) {
      // ignore
    }
  }, [playlist]);

  const addToPlaylist = (movie) => {
    setPlaylist((prev) => {
      if (!prev.includes(movie.id)) {
        return [...prev, movie.id];
      }
      return prev;
    });
  };

  const removeFromPlaylist = (movie) => {
    setPlaylist((prev) => prev.filter((mId) => mId !== movie.id));
  };

  const [myReviews, setMyReviews] = useState({});
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
