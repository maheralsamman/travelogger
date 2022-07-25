import { useState } from "react";

const getId = () => new Array(15).fill().map(() => String.fromCharCode(65 + (Math.floor(Math.random() * 26)))).join("")

const EMPTY_STOP = {
    city: "",
    sublocation: "",
    imageUrl: "",
    description: ""
}

const getNewStop = city => ({...EMPTY_STOP, city: city || ''})

const getNewTrip = () =>({ country: "", stops: [getNewStop()]});


export const useForm = priorTrip => {
    const firstTrip = priorTrip || getNewTrip();
    const firstTripWithIds = {
        ...firstTrip,
        stops: firstTrip.stops.map(stop => ({...stop, id: `${getId()}`}))
    }
    const [draftTrip, setDraftTrip] = useState(firstTripWithIds);
    const [stopId, setStopId] = useState(firstTripWithIds.stops[0].id);

    const currentStopIndex = draftTrip.stops.findIndex(stop => stop.id === stopId)

    const updateId = cb => {
        const nextStopIndex = cb(currentStopIndex);
        setStopId(draftTrip.stops[nextStopIndex].id)
    }
    
    const index = {
        back() {
            updateId(i => i > 0 ? i - 1 : 0);
        },
        forwards() {
            updateId(i => i < draftTrip.stops.length - 1 ? i + 1 : i);
        }
    }

    const draftTripWithoutStopIds = {
        ...draftTrip,
        stops: draftTrip.stops.map(stop =>
            Object.fromEntries(
                Object.entries(stop)
                .filter(([key]) => key !== 'id')
            )
        )
    }

    const checkIfFull = stop => Object.values(stop).every(str => str.trim())
    const tripFull = Boolean(draftTrip.country.trim() && draftTrip.stops.every(checkIfFull));
    const isEdited = JSON.stringify(priorTrip) !== JSON.stringify(draftTripWithoutStopIds)

    const validate = {
        canAdd: tripFull && currentStopIndex === draftTrip.stops.length - 1,
        canRemove: draftTrip.stops.length > 1,
        canSubmit: tripFull && isEdited,
        canGoBack: currentStopIndex > 0,
        canGoForwards: currentStopIndex < draftTrip.stops.length - 1
    }

    const editCountry = country => {
        setDraftTrip(prev => ({...prev, country}))
    }

    const updateStops = cb => {
        setDraftTrip(prev => ({...prev, stops: cb(prev.stops)}))
    }

    const editStop = (key, val) => {
        updateStops(stops => stops.map((stop) => {
            if (stop.id === stopId) {
                return {
                    ...stop,
                    [key]: val
                }
            }
            return stop
        }))
    }

    const addStop = () => {
        const newStop = {...getNewStop(draftTrip.stops.at(-1).city), id: getId()};
        updateStops(stops => {
            if (Object.values(stops[stops.length - 1]).every(val => !val)) {
                return stops
            }
            return [...stops, newStop]
    })
        setStopId(newStop.id)
    }

    const removeStop = () => {
        const prevStopId = draftTrip.stops[currentStopIndex ? currentStopIndex - 1 : currentStopIndex + 1].id
        updateStops(stops => stops.filter(stop => stop.id !== stopId))
        setStopId(prevStopId)
    }

    return {
        trip: draftTrip,
        currentStop: draftTrip.stops.find(stop => stop.id === stopId),
        update: {
            country: editCountry,
            stop: editStop,
            remove: removeStop,
            add: addStop
        },
        validate,
        index
    }
}