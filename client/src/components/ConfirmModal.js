import style from "./ConfirmModal.module.css"

const ConfirmModal = ({confirm, children}) => {
    const closeModal = () => confirm(false)
    const handleClickWhitespace = e => e.preventDefault()
    return (
        <>
            <div className={style.background} onClick={closeModal}>
            </div>
            <div className={style.card} onClick={handleClickWhitespace}>
                {children}
                <div className={style.buttonContainer}>
                    <button className={`${style.button} ${style["button--cancel"]}`} onClick={closeModal}>Cancel</button>
                    <button className={`${style.button} ${style["button--confirm"]}`} onClick={() => confirm(true)}>Confirm</button>
                </div>
            </div>
        </>
    )
}

export default ConfirmModal