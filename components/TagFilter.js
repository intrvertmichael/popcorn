import { isEmpty, sortedUniq } from "lodash"

export default function TagFilter({ filter, setFilter, movies }) {
  const allTags = sortedUniq(
    movies?.reduce(
      (acc, curr) => (!isEmpty(curr.tags) ? [...acc, ...curr.tags] : acc),
      [],
    ),
  )

  const sorted = allTags.sort()

  const handleFilter = e => {
    const clickedTag = e.target.innerHTML.trim()

    if (filter === clickedTag) setFilter(null)
    else setFilter(clickedTag)
  }

  if (isEmpty(sorted)) return <></>

  return (
    <ul className='flex flex-wrap gap-6 p-3 mb-3 border rounded text-neutral-500 border-neutral-900 bg-neutral-950'>
      <h4 className='text-white'>Tags:</h4>

      {sorted.map(tag => (
        <li
          key={tag}
          className={`cursor-pointer hover:text-white ${
            filter === tag ? "text-white" : ""
          }`}
          onClick={handleFilter}
        >
          {tag}
        </li>
      ))}

      {filter && (
        <li
          onClick={() => setFilter(null)}
          className='px-3 text-white rounded cursor-pointer bg-neutral-900 hover:bg-neutral-800'
        >
          Clear Filter
        </li>
      )}
    </ul>
  )
}
