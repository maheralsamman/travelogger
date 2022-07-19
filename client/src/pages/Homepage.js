import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Homepage = () => {
    const { user } = useSelector(state => state.user);
    return (
        <div>
            <Link to={user ? "/create" : "/login"}>Create a trip</Link>
            <Link to="/view/all">Browse trips</Link>
        </div>
    )
}

export default Homepage;