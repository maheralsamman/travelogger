import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../redux/userSlice"
import { postTrip } from "../redux/tripSlice"
import TripForm from "../components/TripForm"

const Create = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(selectUser);
    useEffect(() => {
      if (!user) {
        navigate("/login")
      }
    }, [user])
    const submit = async trip => {
      // POST
      await dispatch(postTrip(trip))
      navigate('/view/mytrips')
    }
    return <TripForm submit={submit}/>
}

export default Create;