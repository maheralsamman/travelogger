import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../redux/userSlice"
import TripForm from "../components/TripForm"


const Create = () => {
    const navigate = useNavigate()
    const {user} = useSelector(selectUser);
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])
    /*

    - Create form fields
    - Update form fields on edit
    - On blur, update current working trip
    - If a new stop is added, add a new empty stop
    - When validated, display a 'Finish' button which POSTS the entire trip
    - After successful submission, return to user trips

    REUSABILITY

    - Create a FORM component
    - The logic in Create or Edit components is just
      - Find and pass down as props the relevant trip if necessary
      - Pass down as props the 'submit' function with post or put logic

    */
    return <TripForm/>
}

export default Create;