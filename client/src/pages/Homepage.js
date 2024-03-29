import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Background from "../components/Background";
import style from "./Homepage.module.css"

const Homepage = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user);
    const directToLogin = () => {
        user ? navigate("/create") : navigate("/login")
    }
    const directToBrowse = () => {
        navigate("/view/all")
    }
    return (
        <div className={style.homepage}>
            <Header />
            <Background/>
            <main className={style.main}>
            <h3 className={style.main__title}>Where will we take you today?</h3>
            <button className={style.main__createButton} onClick={directToLogin}>Create a trip</button>
            <button className={style.main__browseButton} onClick={directToBrowse}>Browse trips</button>
            </main>
        </div>
    )
}

export default Homepage;