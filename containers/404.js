/* eslint-disable @next/next/no-img-element */
import Link from "next/link"

export default function notFound() {
  return (
    <div className='bg-white mx-auto text-center py-5 px-10'>
      <img src='/404.jpg' width='500' height='500' alt='dvd case' />
      <p className='text-black text-3xl'>Not Found</p>
      <Link href='/'>Go back home</Link>
    </div>
  )
}
