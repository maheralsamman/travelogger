import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import firebase from "../firebase";

const NavWrapper = () => {
    const { user } = useSelector(selectUser);
    return (
        <>
            <header>
                <Link to="/">Travelogger</Link>
                {user
                    ? <button onClick={() => firebase.client.auth().signOut()}>Sign out</button>
                    : <Link to="/login">Sign in</Link>}
            </header>
            <Outlet/>
            <footer>
                Buttons
            </footer>
        </>
    )
}

export default NavWrapper;