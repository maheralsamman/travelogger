import ImageUpload from "./ImageUpload";
import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import style from "./TripForm.module.css"

const EMPTY_STOP = {
    "city": "",
    "sublocation": "",
    "imageUrl": "",
    "description": ""
}

const getNewStop = () => ({...EMPTY_STOP})

const EMPTY_TRIP = {
  "country": "",
  "stops": [{...EMPTY_STOP}]
}

const TripForm = ({ firstDraft, submit }) => {

    const [stops, setStops] = useState([])
    const [country, setCountry] = useState(firstDraft?.country || '')
    const [city, setCity] = useState(firstDraft?.city || '')
    const [sublocation, setSublocation] = useState(firstDraft?.sublocation || '')
    const [details, setDetails] = useState(firstDraft?.details || '')
    const [imageUrl, setImageUrl] = useState("")
    const [counter, setCounter] = useState(stops.length || 0)

    const addStop = () => {
        if (!city || !sublocation || !details || !imageUrl) {
            return;
        }
        setStops(prev => ([...prev, {
            city,
            sublocation,
            details,
            imageUrl
        }]))
        setCity('')
        setSublocation('')
        setDetails('')
        setImageUrl('')
        
    }
    useEffect(()=> {   
        if(stops.length) setCounter(stops.length -1)
     }
    ,[stops.length])

    const removeStop = (index) => {
        stops.filter(stop => stop[index] === index)
    }

    const stepBackwards = () => {
        setCounter(prev => prev ? prev - 1 : prev);
    }

    const stepForwards = () => {
        setCounter(prev => prev === stops.length -1 ? prev  : prev +1);
    }


    useEffect(()=> {

            console.log(counter);
            const prevStop = stops[counter];
            if (prevStop) {
                setCity(prevStop.city)
                setSublocation(prevStop.sublocation)
                setDetails(prevStop.details)
                setImageUrl(prevStop.imageUrl)
            }
    },[counter])
    

    const handleSubmit = e => {
        e.preventDefault();
        // if (!country || !city || !sublocation || !details || !imageUrl) {
        //     return;
        // }
        // submit({country,stops})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={city} onChange={e => setCity(e.target.value)} />
            <input value={country} onChange={e => setCountry(e.target.value)} />
            <ImageUpload fileUrl={imageUrl} setFileUrl={setImageUrl} />
            <input value={sublocation}  onChange={e => setSublocation(e.target.value)} />
            <input value={details}  onChange={e => setDetails(e.target.value)} />
            <button type="button" onClick={removeStop}><AiOutlineMinus /></button>
            <button type="button" onClick={addStop}><AiOutlinePlus /></button>
            <button type="submit"><TiTick /></button>
            <button type="button" className={style.back} onClick={stepBackwards}><IoIosArrowBack/></button>
            <button type="button" className={style.back} onClick={stepForwards}><IoIosArrowForward/></button>
        </form>
    )
}

export default TripForm;