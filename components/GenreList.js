import Link from "next/link"

export default function GenreList({ genres }) {
  return (
    <ul className='grid grid-cols-5 p-5'>
      {genres?.map((genre, key) => (
        <Link key={key} href={"/genre/" + genre.id} passHref>
          <li className='text-white hover:text-neutral-500'>{genre.name}</li>
        </Link>
      ))}
    </ul>
  )
}
