import { useState } from "react"

import { useUserContext } from "context"

export default function LikedMovieTags({ movie, liked, saved }) {
  const { setSavedMovies, setLikedMovies } = useUserContext()

  const [showInput, setShowInput] = useState(false)
  const [tagText, setTagText] = useState(false)

  const addTag = async e => {
    e.preventDefault()
    setShowInput(false)

    const addTagToList = curr => {
      return curr.map(m =>
        m.id === movie.id
          ? {
              ...m,
              tags:
                m.tags && !m.tags.find(t => t === tagText)
                  ? [...m.tags, tagText]
                  : [tagText],
            }
          : m,
      )
    }

    if (liked) setLikedMovies(addTagToList)
    if (saved) setSavedMovies(addTagToList)
  }

  const removeTag = async e => {
    e.preventDefault()

    const tag = e.target.innerHTML

    const removeTagFromList = curr => {
      return curr.map(m =>
        m.id === movie.id ? { ...m, tags: m.tags.filter(t => t !== tag) } : m,
      )
    }

    const message =
      (liked || saved) &&
      `Are you sure you want to remove ${tag} tag from ${movie.original_title}?`

    if (confirm(message)) {
      if (liked) setLikedMovies(removeTagFromList)
      if (saved) setSavedMovies(removeTagFromList)
    }
  }

  return (
    <ul className='flex flex-wrap gap-3'>
      {movie.tags?.map(tag => {
        return (
          <li
            key={tag}
            onClick={removeTag}
            className='text-sm cursor-pointer hover:text-red-500'
          >
            {tag}
          </li>
        )
      })}

      {showInput ? (
        <li className='flex items-stretch'>
          <form onSubmit={addTag}>
            <input
              type='text'
              autoFocus
              className='text-black'
              onChange={e => setTagText(e.target.value)}
            />
          </form>
          <button
            onClick={() => setShowInput(false)}
            className='px-3 rounded-r bg-neutral-800'
          >
            x
          </button>
        </li>
      ) : (
        <li
          className='px-3 py-1 text-xs rounded cursor-pointer text-neutral-500 bg-neutral-900 w-fit hover:text-white'
          onClick={() => setShowInput(true)}
        >
          add tag
        </li>
      )}
    </ul>
  )
}
