import Link from "next/link"

export default function GenrePageControl({
  showLink,
  label,
  page,
  genreLabel,
}) {
  if (showLink) {
    return (
      <Link href={"/genre/" + genreLabel.id + "?page=" + page}>{label}</Link>
    )
  }

  return <p>{label}</p>
}
