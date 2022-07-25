import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../redux/userSlice"
import TripForm from "../components/TripForm"
import { updateTrip, selectTrip } from "../redux/tripSlice"


const Edit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(selectUser);
    const {tripId} = useParams()
    const thisTrip = useSelector(selectTrip(tripId))
    console.log(thisTrip)

    useEffect(() => {
      if (!user) {
        navigate("/login")
      }
    }, [user])
    if (!thisTrip || thisTrip.userId !== user.uid) {
      navigate("/view/all")
    }

    const submit = async trip => {
      // PUT
      await dispatch(updateTrip(trip))
      console.log("SUCCESS")
      navigate('/view/mytrips')
    }
    return <TripForm submit={submit} firstDraft={thisTrip}/>
}

export default Edit;