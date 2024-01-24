export const ERROR_MESSAGES = {
  NO_API_KEY: "there is no API key",
}

export const CONFIRM_MESSAGES = {
  REMOVE_ALL_DATA: "Are you sure you want to remove ALL of your data?",
  REMOVE_MOVIE_LIST:
    "Are you sure you want to remove ALL movies from this list?",
}

export const APP_FEATURES = [
  { icon: "🔎", description: "Discover new and old movies" },
  { icon: "⭐", description: "Save the movies you want to see" },
  { icon: "👍", description: "Like movies to get recommendations" },
  { icon: "🏷", description: "Add tags to find movies faster" },
  { icon: "👎", description: "Disliked movies will not be shown" },
]

export const PAGES = {
  SAVED: "saved",
  LIKED: "liked",
  DISLIKED: "disliked",
}

export const LOCAL_STORAGE_KEYS = {
  USERNAME: "username",
  LIKED_MOVIES: "liked",
  DISLIKED_MOVIES: "disliked",
  SAVED_MOVIES: "saved",
}

export const LIKED_MOVIES_LIMIT = 5

export const MOVIE_DB_URL = {
  TRENDING: "trending",
  GENRES: "genres",
  MOVIE_FROM_GENRE: "movieFromGenre",
  MOVIE_FROM_GENRE_AND_PAGE: "moviesFromGenre&page",
  SINGLE_MOVIE: "singleMovie",
  IMAGELIST: "imageList",
  VIDEOLIST: "videoList",
  RECOMMENDED_MOVIES: "recommendedMovies",
  BEST_THIS_YEAR: "bestThisYear",
  BEST_OF_2023: "bestOf2023",
  SEARCH_MOVIE: "searchMovie",
}
