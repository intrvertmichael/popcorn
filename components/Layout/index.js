import Header from '../Header'
import styles from '../../styles/Layout.module.css'

const Layout = ({ children }) => {
	return (
		<div className={styles.container}>
			<Header />
			<div>{children}</div>
		</div>
	)
}

export default Layout
