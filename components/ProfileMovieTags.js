import { useState } from "react"

export default function LikedMovieTags({ movie, liked, saved }) {
  const [tagInput, setTagInput] = useState(false)
  const [tagText, setTagText] = useState(false)

  // TODO: need to add tags

  let entries = []
  let tagsArr = []

  if (liked && []) {
    entries = Object.entries([])
  }

  if (saved && []) {
    entries = Object.entries([])
  }

  if (entries.length > 0) {
    tagsArr = entries.filter(tag => {
      const exists = tag[1].length
        ? tag[1]?.find(tag => tag === movie.id)
        : tag[1] === movie.id
      if (exists) return true
    })
  }

  const tagsUsed = tagsArr.map(tag => tag[0])

  const addingTag = async e => {
    e.preventDefault()
    setTagInput(false)

    let tagArr = []

    if (liked && []) {
      tagArr = Object.keys([])
    }

    if (saved && []) {
      tagArr = Object.entries([])
    }

    if (!tagArr?.find(tag => tag === tagText)) {
      if (liked) {
      }

      if (saved) {
      }
    } else {
      if (liked) {
      }

      if (saved) {
      }
    }
  }

  const removingTag = async e => {
    e.preventDefault()

    const tag = e.target.innerHTML

    let message

    if (liked) {
      message = `Are you sure you want to remove ${tag} tag from ${movie.original_title}?`
    }

    if (saved) {
      message = `Are you sure you want to remove ${tag} tag from ${movie.original_title}?`
    }

    if (confirm(message)) {
      if (liked) {
      }

      if (saved) {
      }
    }
  }

  return (
    <ul className='flex flex-wrap gap-3'>
      {tagsUsed?.map(tag => {
        return (
          <li
            key={tag}
            onClick={removingTag}
            className='text-sm cursor-pointer hover:text-red-500'
          >
            {tag}
          </li>
        )
      })}

      {tagInput ? (
        <li className='flex items-stretch'>
          <form onSubmit={addingTag}>
            <input
              type='text'
              autoFocus
              className='text-black'
              onChange={e => setTagText(e.target.value)}
            />
          </form>
          <button
            onClick={() => setTagInput(false)}
            className='px-3 rounded-r bg-neutral-800'
          >
            x
          </button>
        </li>
      ) : (
        <li
          className='px-3 py-1 text-xs rounded cursor-pointer text-neutral-500 bg-neutral-900 w-fit hover:text-white'
          onClick={() => setTagInput(true)}
        >
          add tag
        </li>
      )}
    </ul>
  )
}
