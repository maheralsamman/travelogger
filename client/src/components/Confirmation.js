import style from "./Confirmation.module.css"

const Confirmation = ({children}) => {
    return (
        <p className={style.text}>{children}</p>
    )
}

export default Confirmation