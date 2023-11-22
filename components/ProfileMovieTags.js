import { useState } from "react"

import { useGetFirebaseUser, useSetFirebaseUser } from "context/FirebaseContext"
import { add_tag, remove_tag } from "utils/firebase/tags"

export default function LikedMovieTags({ movie, liked, saved }) {
  const firebaseUser = useGetFirebaseUser()
  const setFirebaseUser = useSetFirebaseUser()

  const [tagInput, setTagInput] = useState(false)
  const [tagText, setTagText] = useState(false)

  let entries = []
  let tagsArr = []

  if (liked && firebaseUser.tags?.liked) {
    entries = Object.entries(firebaseUser.tags?.liked)
  }

  if (saved && firebaseUser.tags?.saved) {
    entries = Object.entries(firebaseUser.tags?.saved)
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

  async function addingTag(e) {
    e.preventDefault()
    setTagInput(false)

    let tagArr = []

    if (liked && firebaseUser.tags?.liked) {
      tagArr = Object.keys(firebaseUser.tags?.liked)
    }

    if (saved && firebaseUser.tags?.saved) {
      tagArr = Object.entries(firebaseUser.tags?.saved)
    }

    if (!tagArr?.find(tag => tag === tagText)) {
      if (liked) {
        setFirebaseUser(current => ({
          ...current,
          tags: {
            ...current.tags,
            liked: {
              ...current.tags.liked,
              [tagText]: [movie.id],
            },
          },
        }))

        await add_tag(tagText, movie.id, firebaseUser, false)
      }

      if (saved) {
        setFirebaseUser(current => ({
          ...current,
          tags: {
            ...current.tags,
            saved: {
              ...current.tags.saved,
              [tagText]: [movie.id],
            },
          },
        }))

        await add_tag(tagText, movie.id, firebaseUser, true)
      }
    } else {
      if (liked) {
        setFirebaseUser(current => ({
          ...current,
          tags: {
            ...current.tags,
            liked: {
              ...current.tags.liked,
              [tagText]: [...current.tags.liked[tagText], movie.id],
            },
          },
        }))

        await add_tag(tagText, movie.id, firebaseUser, false)
      }

      if (saved) {
        setFirebaseUser(current => ({
          ...current,
          tags: {
            ...current.tags,
            saved: {
              ...current.tags.saved,
              [tagText]: [...current.tags.saved[tagText], movie.id],
            },
          },
        }))

        await add_tag(tagText, movie.id, firebaseUser, true)
      }
    }
  }

  async function removingTag(e) {
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
        setFirebaseUser(current => {
          const filtered = current.tags?.liked[tag].filter(
            objtag => objtag !== movie.id,
          )

          if (filtered.length > 0) {
            return {
              ...current,
              tags: {
                ...current.tags,
                liked: {
                  ...current.tags.liked,
                  [tag]: filtered,
                },
              },
            }
          } else {
            delete current.tags.liked[tag]

            return {
              ...current,
              tags: {
                ...current.tags,
                liked: {
                  ...current.tags.liked,
                },
              },
            }
          }
        })

        await remove_tag(tag, movie.id, firebaseUser, false)
      }

      if (saved) {
        setFirebaseUser(current => {
          const filtered = current.tags?.saved[tag].filter(
            objtag => objtag !== movie.id,
          )

          if (filtered.length > 0) {
            return {
              ...current,
              tags: {
                ...current.tags,
                saved: {
                  ...current.tags.saved,
                  [tag]: filtered,
                },
              },
            }
          } else {
            delete current.tags.saved[tag]

            return {
              ...current,
              tags: {
                ...current.tags,
                saved: {
                  ...current.tags.saved,
                },
              },
            }
          }
        })

        await remove_tag(tag, movie.id, firebaseUser, true)
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
              className=''
              onChange={e => setTagText(e.target.value)}
            />
          </form>
          <button
            onClick={() => setTagInput(false)}
            className='px-3 bg-neutral-800 rounded-r'
          >
            x
          </button>
        </li>
      ) : (
        <li
          className='px-3 py-1 text-xs text-neutral-500 bg-neutral-900 rounded cursor-pointer w-fit hover:text-white'
          onClick={() => setTagInput(true)}
        >
          add tag
        </li>
      )}
    </ul>
  )
}
