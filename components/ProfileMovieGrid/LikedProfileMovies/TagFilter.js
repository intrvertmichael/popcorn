import styles from "styles/TagFilter.module.css"
import { useGetFirebaseUser } from "context/FirebaseContext"

const TagFilter = ({ filter, setFilter }) => {
  const firebaseUser = useGetFirebaseUser()

  if (!firebaseUser.tags?.liked) return false

  const tagLabels = Object.keys(firebaseUser.tags.liked)
  const sorted = tagLabels.sort()

  function handleFilter(e) {
    const clickedTag = e.target.innerHTML.trim()

    if (filter === clickedTag) setFilter(null)
    else setFilter(clickedTag)
  }

  if (!sorted.length > 0) return false
  return (
    <ul className={styles.filtered_list}>
      <h4>Filters:</h4>

      {sorted.map(tag => {
        return (
          <li
            key={tag}
            className={filter === tag ? styles.active_genre : {}}
            onClick={handleFilter}
          >
            {tag}
          </li>
        )
      })}

      {filter && <li onClick={() => setFilter(null)}> Clear Filter </li>}
    </ul>
  )
}

export default TagFilter
