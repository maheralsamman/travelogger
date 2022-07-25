import { useSelector, useDispatch } from "react-redux";
import { getAlltrips } from "../redux/tripSlice"
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import TripCard from "../components/TripCard";
import style from './UserTrip.module.css'

const UserTrips = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAlltrips())
    }, []);

    const { trips } = useSelector(state => state.trips)
    const { user } = useSelector(state => state.user)
    if (!user) {
        navigate("/login")
    }

    const id = user.uid;
    const userTrips = trips.filter(trip => trip.userId === id)

    return userTrips.length ? (
        <div className={style.tripContainer}>{userTrips.map(trip => <TripCard key={trip._id} trip={trip}/>)}</div>
    ) : (
        <p className={style.failedUserTrips}>You haven't added any trips yet!<br/><Link className={style.link} to="/create">Get started</Link></p>
    )
}

export default UserTrips;