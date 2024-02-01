import Link from "next/link"

export default function GenreList({ genres }) {
  return (
    <ul className='flex flex-col px-12 py-6 gap-y-2 md:grid md:grid-cols-5 bg-neutral-950'>
      {genres?.map((genre, key) => (
        <Link key={key} href={"/genre/" + genre.id} passHref className='w-fit'>
          <li className='hover:text-white text-neutral-500'>{genre.name}</li>
        </Link>
      ))}
    </ul>
  )
}
