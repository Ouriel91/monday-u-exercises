import styles from "./Errors.module.css"

function Errors({ error}) {
  return (
    <div className={styles.errorContainer}>
        <p>{error}</p>
    </div>
  )
}

export default Errors