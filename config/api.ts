import axios from "axios";

export const getDiscoverMovies = async () => {
  try {
    console.log("hi");
    const configurationObject = {
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };
    return await axios(configurationObject);
  } catch (err) {
    console.error(err);
  }
};

export const getTopRatedMovies = async () => {
  try {
    const configurationObject = {
      method: "get",
      url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };
    return await axios(configurationObject);
  } catch (err) {
    console.error(err);
  }
};
export const getUpcomingMovies = async () => {
  try {
    const configurationObject = {
      method: "get",
      url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };
    return await axios(configurationObject);
  } catch (err) {
    console.error(err);
  }
};

export const getTrendingMovies = async () => {
  try {
    const configurationObject = {
      method: "get",
      url: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };
    return await axios(configurationObject);
  } catch (err) {
    console.error(err);
  }
};
export const getCredits = async (movie_id: number) => {
  try {
    const configurationObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };
    return await axios(configurationObject);
  } catch (err) {
    console.error(err, "eer");
  }
};

export const getSimilarMovies = async (movie_id: number) => {
  try {
    const configurationObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };
    return await axios(configurationObject);
  } catch (err) {
    console.error(err, "eer");
  }
};
export const getMovieDetails = async (movie_id: number) => {
  try {
    const configurationObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };

    return await axios(configurationObject);
  } catch (err) {
    console.error(err, "eer");
  }
};
export const getPerson = async (person_id: number) => {
  try {
    const configurationObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/person/${person_id}?language=en-US`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };

    return await axios(configurationObject);
  } catch (err) {
    console.error(err, "eer");
  }
};
export const getPersonMovies = async (person_id: number) => {
  try {
    const configurationObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/person/${person_id}/movie_credits?language=en-US`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };

    return await axios(configurationObject);
  } catch (err) {
    console.error(err, "eer");
  }
};
export const searchMovies = async (query: string) => {
  try {
    const configurationObject = {
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
      },
    };

    return await axios(configurationObject);
  } catch (err) {
    console.error(err, "eer");
  }
};
// discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

export type MovieItem = {
  adult: boolean;
  backdrop_path: string;
  // genre_ids: GenreIds[]
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type DiscoverMoviesPayload = {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};
