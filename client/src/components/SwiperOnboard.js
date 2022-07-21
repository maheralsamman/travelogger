import styles from "./SwiperOnboard.module.css"

const SwiperOnboard = () => {
    return (
        <>
            <div className={styles.container}/>
            <div className={styles.arrowContainer}>
                <div className={styles.arrow}>
                    <div className={styles.point}/>
                    <div className={styles.line}/>
                </div>
            </div>
        </>
    )
}

export default SwiperOnboard;