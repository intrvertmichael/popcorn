import { useGetFirebaseUser } from "context/FirebaseContext"

export default function TagFilter({ filter, setFilter, saved }) {
  const firebaseUser = useGetFirebaseUser()

  if (saved && !firebaseUser.tags?.saved) return false
  if (!firebaseUser.tags?.liked) return false

  const tagLabels = Object.keys(
    saved ? firebaseUser.tags?.saved : firebaseUser.tags.liked,
  )
  const sorted = tagLabels.sort()

  function handleFilter(e) {
    const clickedTag = e.target.innerHTML.trim()

    if (filter === clickedTag) setFilter(null)
    else setFilter(clickedTag)
  }

  if (!sorted.length > 0) return false
  return (
    <ul className='flex flex-wrap gap-6 p-3 mb-3 text-neutral-500 border border-neutral-900 rounded bg-neutral-950'>
      <h4 className='text-white'>Tags:</h4>

      {sorted.map(tag => (
        <li
          key={tag}
          className='cursor-pointer hover:text-white'
          onClick={handleFilter}
        >
          {tag}
        </li>
      ))}

      {filter && (
        <li
          onClick={() => setFilter(null)}
          className='px-3 text-white bg-neutral-900 rounded cursor-pointer hover:bg-neutral-800'
        >
          Clear Filter
        </li>
      )}
    </ul>
  )
}
