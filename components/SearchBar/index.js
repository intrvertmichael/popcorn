import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/SeachBar.module.css'
import Results from './Results'

const SearchBar = () => {
	const router = useRouter()
	const { asPath } = useRouter()

	const [searchText, setSearchText] = useState()
	const [results, setResults] = useState()
	const [timer, setTimer] = useState()

	async function fetchResults(requested_page) {
		let res
		if (requested_page)
			res = await fetch('/api/search', {
				headers: { searchTerm: searchText.value, page: requested_page },
			})
		else
			res = await fetch('/api/search', {
				headers: { searchTerm: searchText.value },
			})

		const data = await res.json()
		const page = data.page
		const total_pages = data.total_pages

		setResults({ movies: data.results, page, total_pages })
	}

	async function searchSubmitted(e) {
		clearTimeout(timer)
		if (searchText?.value === '') setResults(null)
		else {
			await fetchResults(1)
			router.push(`${asPath}/#results`)
		}
	}

	function typing(e) {
		e.preventDefault()
		setSearchText({ value: e.target.value })

		clearTimeout(timer)
		const timer_id = setTimeout(searchSubmitted, 1000)
		setTimer(timer_id)
	}

	return (
		<div className={styles.search}>
			<form
				className={styles.search_bar}
				onSubmit={(e) => {
					e.preventDefault()
					searchSubmitted()
				}}>
				<input
					type='text'
					placeholder='Search for a movie...'
					onKeyUp={typing}
					onChange={typing}
					value={searchText ? searchText.value : ''}
				/>
				<button> 🔎 </button>
			</form>

			<Results
				{...{
					results,
					searchText,
					setSearchText,
					setResults,
					fetchResults,
				}}
			/>
		</div>
	)
}

export default SearchBar
