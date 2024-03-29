/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { isEmpty } from "lodash"

import { createMovieImageURL } from "utils/movie.api"

const buttonStyle = "hover:text-white"

export default function Carousel({ images }) {
  const router = useRouter()

  const galleryPosition = parseInt(router.query.galleryPosition)

  const setGalleryPosition = useCallback(
    pos => {
      router.replace({
        query: {
          ...router.query,
          galleryPosition: pos,
        },
      })
    },
    [router],
  )

  useEffect(() => {
    if (
      (galleryPosition && galleryPosition < images.length) ||
      galleryPosition === 0
    ) {
      return
    }

    setGalleryPosition(
      isEmpty(images) ? 0 : Math.floor(images.length * Math.random()),
    )
  }, [galleryPosition, images, router, setGalleryPosition])

  const GALLERY_START = 0
  const GALLERY_END = images.length - 1
  const GALLERY_CHANGE = 1

  const nextClicked = () => {
    setGalleryPosition(
      galleryPosition >= GALLERY_START && galleryPosition < GALLERY_END
        ? galleryPosition + GALLERY_CHANGE
        : GALLERY_START,
    )
  }

  return (
    <>
      <Head>
        <meta
          name='image'
          property='og:image'
          content={createMovieImageURL(images[galleryPosition]?.file_path)}
        />
      </Head>

      <div className='relative max-w-5xl mx-auto overflow-hidden bg-neutral-950'>
        <div
          className='aspect-[16/9] cursor-pointer relative'
          onClick={nextClicked}
        >
          {images[galleryPosition] && (
            <img
              alt={images[galleryPosition].file_path}
              src={createMovieImageURL(images[galleryPosition].file_path)}
            />
          )}
        </div>

        {images.length > 1 && (
          <div className='absolute top-0 right-0 flex gap-2 p-3 sm:text-neutral-400 rounded-bl-xl sm:bg-neutral-950'>
            <button
              className={buttonStyle}
              onClick={() => {
                setGalleryPosition(
                  images.length > galleryPosition &&
                    galleryPosition > GALLERY_START
                    ? galleryPosition - GALLERY_CHANGE
                    : GALLERY_END,
                )
              }}
            >
              ◀
            </button>

            <div>
              <span className='text-white'>{galleryPosition || 0}</span> /{" "}
              {images.length - 1}
            </div>

            <button className={buttonStyle} onClick={nextClicked}>
              ▶
            </button>
          </div>
        )}
      </div>
    </>
  )
}
