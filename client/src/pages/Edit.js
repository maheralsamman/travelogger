import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../redux/userSlice"
import TripForm from "../components/TripForm"

const Edit = () => {
    const navigate = useNavigate()
    const {user} = useSelector(selectUser);
    useEffect(() => {
      if (!user) {
        navigate("/login")
      }
    }, [user])
    const submit = trip => {
      // POST
    }
    return <TripForm submit={submit}/>
}

export default Edit;