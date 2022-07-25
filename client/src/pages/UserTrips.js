import { useSelector, useDispatch } from "react-redux";
import { getAlltrips } from "../redux/tripSlice"
import { useEffect } from "react";
import TripCard from "../components/TripCard";

const UserTrips = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAlltrips())
    }, []);

    const { trips } = useSelector(state => state.trips)
    const { user } = useSelector(state => state.user)
    const id = user.uid;
    const userTrips = trips.filter(trip => trip.userId === 'Maheriscool4') //hardcoded id of course
    console.log(userTrips)

    return (
        <div>{userTrips.map(trip => <TripCard key={trip._id} trip={trip} userTrip={true} />)}</div>
    )
}

export default UserTrips;