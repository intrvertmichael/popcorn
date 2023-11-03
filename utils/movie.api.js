import { ERROR_MESSAGES } from "../constants/general";
import { isEmpty } from "lodash";

function getURL(type, id, page) {
  const baseURL = "https://api.themoviedb.org/3";
  const key = process.env.MOVIE_KEY;
  const keyPath = "?api_key=" + key;

  if (isEmpty(key)) throw new Error(ERROR_MESSAGES.NO_API_KEY);

  const year = new Date().getFullYear();

  switch (type) {
    case "trending":
      return baseURL + "/trending/movie/week" + keyPath;

    case "genres":
      return baseURL + "/genre/movie/list" + keyPath;

    case "moviesFromGenre":
      return baseURL + "/discover/movie" + keyPath + "&with_genres=" + id;

    case "moviesFromGenre&page":
      return (
        baseURL +
        "/discover/movie" +
        keyPath +
        "&with_genres=" +
        id +
        "&page=" +
        page
      );

    case "singleMovie":
      return baseURL + "/movie/" + id + keyPath;

    case "imageList":
      return baseURL + "/movie/" + id + "/images" + keyPath;

    case "search":
      return (
        baseURL + "/search/movie/" + keyPath + "&query=" + id + "&page=" + page
      );

    case "recommendedMovies":
      return baseURL + "/movie/" + id + "/recommendations" + keyPath;

    case "bestThisYear":
      return (
        baseURL +
        "/discover/movie" +
        keyPath +
        "&primary_release_year=" +
        year +
        "&certification_country=US&certification=R&vote_count.gte=500&sort_by=vote_average.desc"
      );
  }
}

export function createMovieImageURL(path) {
  return "https://image.tmdb.org/t/p/original/" + path;
}

export async function getTrending() {
  const url = getURL("trending");
  const res = await fetch(url);
  const data = await res.json();

  const movies = [];

  for (let i = 0; i < 10; i++) {
    let movie = data.results[i];
    const imagePath = createMovieImageURL(movie.poster_path);
    movies.push({
      id: movie.id,
      title: movie.original_title,
      image: imagePath,
    });
  }

  return movies;
}

export async function getGenres() {
  const url = getURL("genres");
  const res = await fetch(url);
  const data = await res.json();
  return data.genres;
}

export async function getGenreLabel(id) {
  const url = getURL("genres");
  const res = await fetch(url);
  const data = await res.json();
  const genreLabel = data.genres?.find(
    (genre) => genre.id.toString() === id.toString()
  );
  return genreLabel;
}

export async function getMoviesFromGenre(genreID, page) {
  let url;
  if (page) url = getURL("moviesFromGenre&page", genreID, page);
  else url = getURL("moviesFromGenre", genreID);

  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getSingleMovie(id) {
  const url = getURL("singleMovie", id);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getImageList(id) {
  const url = getURL("imageList", id);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function searchForMovie(query, page = 1) {
  const url = getURL("search", query, page);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getRecommendedMovies(id) {
  const url = getURL("recommendedMovies", id);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getBestThisYear() {
  const url = getURL("bestThisYear");
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
