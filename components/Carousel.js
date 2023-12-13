import { useEffect } from "react"
import { useRouter } from "next/router"

const buttonStyle = "hover:text-white"

export default function Carousel({ images }) {
  const router = useRouter()

  const galleryPosition = parseInt(router.query.galleryPosition)

  useEffect(() => {
    if (galleryPosition) return

    router.replace({
      query: {
        ...router.query,
        galleryPosition: images ? Math.floor(images.length * Math.random()) : 0,
      },
    })
  }, [galleryPosition, images, router])

  if (!images) return false

  const backClicked = () => {
    router.replace({
      query: {
        ...router.query,
        galleryPosition:
          images.length > galleryPosition && galleryPosition > 0
            ? galleryPosition - 1
            : images.length - 1,
      },
    })
  }

  const nextClicked = () => {
    router.replace({
      query: {
        ...router.query,
        galleryPosition:
          galleryPosition >= 0 && galleryPosition < images.length - 1
            ? galleryPosition + 1
            : 0,
      },
    })
  }

  return (
    <div className='relative max-w-6xl mx-auto overflow-hidden bg-neutral-950'>
      <div
        className='aspect-[16/9] cursor-pointer relative'
        onClick={nextClicked}
      >
        {images[galleryPosition]}
      </div>

      {images.length > 1 && (
        <div className='absolute top-0 right-0 flex gap-2 p-3 text-neutral-400 rounded-bl-xl bg-neutral-950'>
          <button onClick={backClicked} className={buttonStyle}>
            ◀
          </button>

          <div>
            <span className='text-white'>{galleryPosition}</span> /{" "}
            {images.length}
          </div>

          <button onClick={nextClicked} className={buttonStyle}>
            ▶
          </button>
        </div>
      )}
    </div>
  )
}
