/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { getTrending } from "utils/movie.api"
import { makeArray } from "utils/general"

export default function Trending() {
  const { isLoading, data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  })

  if (isLoading) {
    return (
      <div className='grid grid-cols-10 gap-1'>
        {makeArray(10).map(key => (
          <div
            key={key}
            className='aspect-[1/1.5] bg-neutral-900 animate-pulse'
          />
        ))}
      </div>
    )
  }

  return (
    <ul className='grid grid-cols-10'>
      {trending?.map(movie => (
        <Link
          key={movie.id}
          href={"/movie/" + movie.id}
          passHref
          className='aspect-[1/1.5] relative'
        >
          <img src={movie.image} alt={movie.title} fill={true} />
        </Link>
      ))}
    </ul>
  )
}
