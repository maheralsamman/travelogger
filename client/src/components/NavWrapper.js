import { Outlet, NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import styles from "./NavWrapper.module.css"
import Header from "./Header";

// icons
import { BiBookOpen } from "react-icons/bi"
import { AiOutlinePlus, AiOutlineUser } from "react-icons/ai"


const NavWrapper = () => {
    const { user } = useSelector(selectUser);
    const footerClass = ({isActive}) => `${styles.footer__link} ${isActive ? styles["footer__link--active"] : ""}`
    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.container__outlet}>
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