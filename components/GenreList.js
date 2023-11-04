import Link from "next/link"

import styles from "styles/Header.module.css"

export default function GenreList({ genres }) {
  return (
    <ul className={styles.genre_list}>
      {genres?.map((genre, key) => (
        <Link key={key} href={"/genre/" + genre.id} passHref>
          <li>{genre.name}</li>
        </Link>
      ))}
    </ul>
  )
}
