import { useState } from "react"

const buttonStyle = "hover:text-white"

export default function Carousel({ images }) {
  const [pos, setPos] = useState(
    images ? Math.floor(images.length * Math.random()) : 0,
  ) // TODO: keep image pos on the url so when shared can share with specific picture

  if (!images) return false

  const backClicked = () =>
    setPos(curr =>
      images.length > curr && curr > 0 ? curr - 1 : images.length - 1,
    )

  const nextClicked = () =>
    setPos(curr => (curr >= 0 && curr < images.length - 1 ? curr + 1 : 0))

  return (
    <div className='relative max-w-6xl mx-auto overflow-hidden bg-neutral-950'>
      <div
        className='aspect-[16/9] cursor-pointer relative'
        onClick={nextClicked}
      >
        {images[pos]}
      </div>

      {images.length > 1 && (
        <div className='absolute top-0 right-0 flex gap-2 p-3 text-neutral-400 rounded-bl-xl bg-neutral-950'>
          <button onClick={backClicked} className={buttonStyle}>
            ◀
          </button>

          <div>
            <span className='text-white'>{pos + 1}</span> / {images.length}
          </div>

          <button onClick={nextClicked} className={buttonStyle}>
            ▶
          </button>
        </div>
      )}
    </div>
  )
}
