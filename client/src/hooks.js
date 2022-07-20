import { useState } from "react";

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

const useForm = firstDraft => {
    // logic
    const updateCurrentDraft = (key, text) => {
        // logic
    }
    return [
        currentDraft,
        updateCurrentDraft
    ]
}