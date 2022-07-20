import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'

const EMPTY_STOP = {
    "city": "",
    "sublocation": "",
    "imageUrl": "",
    "description": ""
}

const EMPTY_TRIP = {
  "country": "",
  "stops": [{...EMPTY_STOP}]
}


const TripForm = ({ firstDraft, submit }) => {
    const [currentDraft, setCurrentDraft] = useState(firstDraft || EMPTY_TRIP)
    const [country, setCountry] = useState(currentDraft.country)
    const [city, setCity] = useState(currentDraft.city)
    const [subLocation, setSubLocation] = useState(currentDraft.subLocation)
    const [details, setDetails] = useState(currentDraft.details)
    const [fileUrl, setFileUrl] = useState("")

    const handleSubmit = e => {
        e.preventDefault();
        // submit(trip)
    }

 
    return (
        <form onSubmit={handleSubmit}>
            <input value={country} onChange={e => setCountry(e.target.value)} />
            <input value={city}  onChange={e => setCity(e.target.value)} />
            <ImageUpload fileUrl={fileUrl} setFileUrl={setFileUrl} />
            <input value={subLocation}  onChange={e => setSubLocation(e.target.value)} />
            <input value={details}  onChange={e => setDetails(e.target.value)} />
            <button ><AiOutlineMinus /></button>
            <button ><AiOutlinePlus /></button>
            <button type="submit"><TiTick /></button>
        </form>
    )
}

export default TripForm;