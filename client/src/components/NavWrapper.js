import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import firebase from "../firebase";
import Header from "./Header";

const NavWrapper = () => {
    const { user } = useSelector(selectUser);
    return (
        <>
            <Header/>
            <Outlet/>
            <footer>
                Buttons
            </footer>
        </>
    )
}

export default NavWrapper;