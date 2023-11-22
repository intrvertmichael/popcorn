import firebase from "utils/firebase/config"
import { getGenreMovies } from "utils/general"
import "firebase/database"

const db = firebase.firestore()

export async function getFirebaseData(uid, setFirebaseUser) {
  // getting movies
  const fb_movie_res = await db.collection("movies").doc(uid).get()
  const fb_movie_data = fb_movie_res.data()

  // getting tags
  const fb_tags_res = await db.collection("tags").doc(uid).get()
  const fb_tags_data = fb_tags_res.data()

  // getting tags
  const fb_genre_res = await db.collection("genres").doc(uid).get()
  const fb_genre_data = fb_genre_res.data()

  const data = {
    uid: uid,
    saved: fb_movie_data ? fb_movie_data.saved : [],
    disliked: fb_movie_data ? fb_movie_data.disliked : [],
    liked: fb_movie_data ? fb_movie_data.liked : [],
    tags: fb_tags_data ? fb_tags_data : [],
    genres: fb_genre_data ? fb_genre_data : [],
  }

  setFirebaseUser(data)
}

export async function getUserMovies(firebaseUser) {
  // getting liked Movies
  const fb_movies_res = await db
    .collection("movies")
    .doc(firebaseUser.uid)
    .get()

  const fb_movies_data = fb_movies_res.data()
}

export async function getFavGenres(firebaseUser, setfavGenreMovies) {
  // sorting the entries by fav Genres
  const keysValues = firebaseUser.genres
    ? Object.entries(firebaseUser.genres)
    : []
  const sorted_list = keysValues.sort((a, b) => a[1] < b[1])
  const limited_list = sorted_list.slice(0, 5)

  // getting the movies from each sorted entry
  limited_list.map(async entry => {
    const genreID = entry[0]
    const genreMovies = await getGenreMovies(genreID)

    setfavGenreMovies(curr => {
      return {
        ...curr,
        [genreID]: { count: entry[1], movies: genreMovies },
      }
    })
  })
}

export const updateSavedMovies = (current, movie) => {
  const filteredSaves = current.saved.filter(
    liked => liked.movie_id !== movie.id,
  )
  const tagsObj = current.tags.saved
  const tagsArr = tagsObj ? Object.entries(tagsObj) : []

  tagsArr.forEach(tag => {
    const exists = tag[1] && tag[1].find(id => id === movie.id)
    if (exists) {
      const filtered = tag[1].filter(id => id !== movie.id)
      if (filtered.length > 0) tagsObj[tag[0]] = filtered
      else delete tagsObj[tag[0]]
    }
  })

  return {
    ...current,
    saved: filteredSaves,
    tags: {
      ...current.tags,
      saved: tagsObj,
    },
  }
}

export const updateLikedMovies = (current, movie) => {
  const filteredLikes = current.liked.filter(
    liked => liked.movie_id !== movie.id,
  )
  const tagsObj = current.tags.liked
  const tagsArr = tagsObj ? Object.entries(tagsObj) : []

  tagsArr?.forEach(tag => {
    const exists = tag[1] && tag[1].find(id => id === movie.id)
    if (exists) {
      const filtered = tag[1].filter(id => id !== movie.id)
      if (filtered.length > 0) tagsObj[tag[0]] = filtered
      else delete tagsObj[tag[0]]
    }
  })

  const updatedLikes = {
    ...current,
    liked: filteredLikes,
    tags: {
      ...current.tags,
      liked: tagsObj,
    },
  }

  return updatedLikes
}

export const updateDislikedMovies = (current, movie) => {
  const filtered = current.disliked.filter(
    disliked => disliked.movie_id !== movie.id,
  )
  const updatedLikes = { ...current, disliked: filtered }
  return updatedLikes
}
