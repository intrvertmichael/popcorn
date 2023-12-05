import { useUserActions } from "hooks"

const styles = {
  votingButtons:
    "pointer-events-auto text-3xl py-2 px-3 rounded border border-transparent hover:border-neutral-500",
  selectedButton: "border-white",
}

export default function VoteButtons({ movie }) {
  const {
    isSaved,
    isLiked,
    isDisliked,
    addToSaved,
    removeFromSaved,
    addToLiked,
    removeFromLiked,
    addToDisliked,
    removeFromDisliked,
  } = useUserActions(movie)

  async function handleLikedButton() {
    if (isSaved) removeFromSaved(movie)
    if (isDisliked) removeFromDisliked(movie)
    if (isLiked) removeFromLiked(movie)
    else addToLiked(movie)
  }

  async function handleDisikedButton() {
    if (isSaved) removeFromSaved(movie)
    if (isLiked) removeFromLiked(movie)
    if (isDisliked) removeFromDisliked(movie)
    else addToDisliked(movie)
  }

  async function handleSaveButton() {
    if (isLiked) removeFromLiked(movie)
    if (isDisliked) removeFromDisliked(movie)
    if (isSaved) removeFromSaved(movie)
    else addToSaved(movie)
  }

  return (
    <>
      <button
        onClick={handleLikedButton}
        className={`${styles.votingButtons} ${
          isLiked && styles.selectedButton
        }`}
      >
        👍
      </button>

      <button
        onClick={handleSaveButton}
        className={`${styles.votingButtons} ${
          isSaved && styles.selectedButton
        }`}
      >
        ⭐
      </button>

      <button
        onClick={handleDisikedButton}
        className={`${styles.votingButtons} ${
          isDisliked && styles.selectedButton
        }`}
      >
        👎
      </button>
    </>
  )
}
