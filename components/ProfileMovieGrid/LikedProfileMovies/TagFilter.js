import styles from '../../../styles/TagFilter.module.css'

const TagFilter = ({tagNames, filter, setFilter}) => {

    if(!tagNames) return false
    const sorted = tagNames.sort()

    function handleFilter(e){
        const clickedTag = e.target.innerHTML.trim()

        if(filter === clickedTag) setFilter(null)
        else setFilter(clickedTag)
    }

    return (
        <ul className={styles.filtered_list}>
            <h4>Filters:</h4>
            {
                sorted.map( tag => {
                    return (
                        <li
                            key={tag}
                            className={filter===tag? styles.active_genre : {}}
                            onClick={handleFilter}
                        >{tag}</li>
                    )
                })
            }
        </ul>
    )
}

export default TagFilter
