import { formatRating } from "utils/general"

export default function Rating({ score, count }) {
  const roundedScore = formatRating(score)

  if (count <= 50 || roundedScore === 0) return false

  let color = "from-yellow-600 to-yellow-400"
  if (roundedScore >= 8) color = "from-green-600 to-green-400"
  if (roundedScore <= 5) color = "from-red-600 to-red-400"

  return (
    <div
      className={`p-3 text-center text-black rounded pointer-events-auto bg-gradient-to-t ${color}`}
    >
      <span className='text-5xl'>{roundedScore}</span>
      <p className='pt-3 font-thin '>{count} votes</p>
    </div>
  )
}
