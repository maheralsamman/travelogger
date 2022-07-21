import ImageUpload from "./ImageUpload";
import { useState, useEffect, useReducer } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import style from "./TripForm.module.css";

const EMPTY_STOP = {
  city: "",
  sublocation: "",
  imageUrl: "",
  description: "",
};

const getNewStop = () => ({ ...EMPTY_STOP });

const EMPTY_TRIP = {
  country: "",
  stops: [{ ...EMPTY_STOP }],
};

const TripForm = ({ firstDraft, submit }) => {
  const initialState = {
    counter: 0,
  };
  const action = {
    type: "decrease",
    type: "increase",
    type: "setCounter",
  };

  function reducer(state, action) {
    let newState;
    switch (action.type) {
      case "setCounter":
        console.log("action.payload ", action.payload);
        newState = { counter: action.payload };
        break;
      case "setCounterAfterRemove":
        console.log("action.payload ", action.payload);
        newState = { counter: action.payload };
        break;
      case "increase":
        newState = { counter: state.counter + 1 };
        break;
      case "decrease":
        newState = { counter: state.counter - 1 };
        break;
      default:
        throw new Error();
    }
    return newState;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [stops, setStops] = useState([]);
  const [country, setCountry] = useState(firstDraft?.country || "");
  const [city, setCity] = useState(firstDraft?.city || "");
  const [sublocation, setSublocation] = useState(firstDraft?.sublocation || "");
  const [details, setDetails] = useState(firstDraft?.details || "");
  const [imageUrl, setImageUrl] = useState("");

  const addStop = () => {
    if (!city || !sublocation || !details || !imageUrl) {
      return;
    }
    setStops((prev) => [
      ...prev,
      {
        city,
        sublocation,
        details,
        imageUrl,
      },
    ]);
    setCity("");
    setSublocation("");
    setDetails("");
    setImageUrl("");
  };
  useEffect(() => {
    if (stops.length) dispatch({ type: "setCounter", payload: stops.length });
  }, [stops.length]);

  const removeStop = () => {
      stops.splice(state.counter,1)
      setStops([...stops])
      if(!stops.length) 
      {
          setCountry("")
        }
      setCity("");
      setSublocation("");
      setDetails("");
      setImageUrl("");
  };

  const stepBackwards = () => {
    if (state.counter) dispatch({ type: "decrease" });
  };

  const stepForwards = () => {
    if (state.counter !== stops.length - 1) dispatch({ type: "increase" });
  };

  useEffect(() => {
      console.log("state.counter: ",state.counter)
    const prevStop = stops[state.counter];
    if (prevStop) {
      setCity(prevStop.city);
      setSublocation(prevStop.sublocation);
      setDetails(prevStop.details);
      setImageUrl(prevStop.imageUrl);
    }
  }, [state.counter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({country,stops})
    // if (!country || !city || !sublocation || !details || !imageUrl) {
    //     return;
    // }
    // submit({country,stops})
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={city} onChange={(e) => setCity(e.target.value)} />
      <input value={country} onChange={(e) => setCountry(e.target.value)} />
      <ImageUpload fileUrl={imageUrl} setFileUrl={setImageUrl} />
      <input
        value={sublocation}
        onChange={(e) => setSublocation(e.target.value)}
      />
      <input value={details} onChange={(e) => setDetails(e.target.value)} />
      <button type="button" onClick={removeStop}>
        <AiOutlineMinus />
      </button>
      <button type="button" onClick={addStop}>
        <AiOutlinePlus />
      </button>
      <button type="submit">
        <TiTick />
      </button>
      <button type="button" className={style.back} onClick={stepBackwards}>
        <IoIosArrowBack />
      </button>
      <button type="button" className={style.back} onClick={stepForwards}>
        <IoIosArrowForward />
      </button>
    </form>
  );
};

export default TripForm;
