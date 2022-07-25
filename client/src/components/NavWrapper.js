import { Outlet, NavLink } from "react-router-dom"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { resetSuccessMsg } from "../redux/tripSlice";
import styles from "./NavWrapper.module.css"
import Header from "./Header";

// icons
import { BiBookOpen } from "react-icons/bi"
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai"

import Confirmation from "./Confirmation";


const NavWrapper = () => {
    const { user } = useSelector(selectUser);
    const { successMsg } = useSelector(state => state.trips)
    const dispatch = useDispatch()
    const footerClass = ({isActive}) => `${styles.footer__link} ${isActive ? styles["footer__link--active"] : ""}`
    useEffect(() => {
        if (!successMsg) {
            return;
        }
        setTimeout(() => dispatch(resetSuccessMsg()), 2000)
    }, [successMsg])
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.container__outlet}>
                {successMsg ? <Confirmation>{successMsg}</Confirmation> : null}
                <Outlet/>
            </div>
            <footer className={styles.footer}>
                <nav className={styles.nav}>
                    <NavLink className={footerClass} to="/view/all"><BiBookOpen/></NavLink>
                    <NavLink className={footerClass} to="/create"><AiOutlinePlus/></NavLink>
                    <NavLink className={footerClass} to={user ? `/view/mytrips` : '/login'}><AiOutlineUser/></NavLink>
                </nav>
            </footer>
        </div>
    )
}

export default NavWrapper;