import { useNavigate } from "react-router-dom"
import style from "./TripForm.module.css"

// icons
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import {IoIosArrowBack} from 'react-icons/io'
import {BiRightArrow, BiLeftArrow} from 'react-icons/bi'

// hooks
import { useForm } from "../hooks";

// redux
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice"

// components
import ImageUpload from "./ImageUpload";

const TripForm = ({ firstDraft, submit }) => {
    const navigate = useNavigate();
    const { user } = useSelector(selectUser);

    const { trip, currentStop, update, index, validate } = useForm(firstDraft);

    const handleSubmit = e => {
        e.preventDefault();
        const readyTrip = {
          ...trip,
          stops: trip.stops.map(stop => {
            const clonedStop = {...stop};
            delete clonedStop.id;
            return clonedStop
          })
        }
        try {
            submit(readyTrip);
        } catch(e) {
            // keep user on the page to tell them something went wrong
        }
    }

    const handleChange = cb => e => cb(e.target.value);
    const handleUpdateCountry = handleChange(update.country)
    const handleUpdateStop = key => handleChange(val => update.stop(key, val))
    const handleUpdateDescription = e => {
      const value = e.target.value;
      if (/\n/g.test(value)) {
        return
      }
      update.stop("description", value)
    }
    const handleUpdateImage = url => update.stop("imageUrl", url)

    const backgroundStyle = { backgroundImage: `url(${currentStop.imageUrl})` };

    return (
      <>
        {currentStop.imageUrl ? <div style={backgroundStyle} className={style.background}/> : null}
           <button
              type="button"
              className={`${style.arrow} ${style['arrow--left']}`}
              onClick={index.back}
              disabled={!validate.canGoBack}
          >
              <BiLeftArrow/>
          </button>
          <button
              type="button"
              className={`${style.arrow} ${style['arrow--right']}`}
              onClick={index.forwards}
              disabled={!validate.canGoForwards}
          >
              <BiRightArrow/>
          </button>
          <div className={style.backButton} onClick={() => navigate(-1)}>
                <IoIosArrowBack/>
            </div>
        <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.headerContainer}>
              <input
                  value={currentStop.city}
                  onChange={handleUpdateStop("city")}
                  className={style.city}
                  placeholder="Add city"
                  maxLength={12}

              />
              <input
                  value={trip.country}
                  onChange={handleUpdateCountry}
                  disabled={validate.canGoBack}
                  className={style.country}
                  placeholder="Add country"
                  maxLength={20}
              />
            </div>
            <div className={style.imageContainer}>
                <ImageUpload
                    fileUrl={currentStop.imageUrl}
                    setFileUrl={handleUpdateImage}
                />
            </div>
            <input
                value={currentStop.sublocation}
                onChange={handleUpdateStop("sublocation")}
                className={style.sublocation}
                placeholder="Add location"
                maxLength={28}
            />
            <textarea
                value={currentStop.description}
                onChange={handleUpdateDescription}
                className={style.description}
                maxLength={200}
                placeholder="Add description"
            />
            <div className={style.buttonContainer}>
              <button
                  type="button"
                  onClick={update.remove}
                  disabled={!validate.canRemove}
              >
                  <AiOutlineMinus />
                  <span className={style.buttonText}>Remove stop</span>
              </button>
              <button
                  type="button"
                  onClick={update.add}
                  disabled={!validate.canAdd}
              >
                  <AiOutlinePlus />
                  <span className={style.buttonText}>Add stop</span>

              </button>
              <button
                  type="submit"
                  disabled={!validate.canSubmit}
                  className={style.submit}
              >
                  <TiTick />
                  <span className={style.buttonText}>Save trip</span>
              </button>
            </div>
        </form>
          </>
    )
}

export default TripForm;

// import ImageUpload from "./ImageUpload";
// import { useState, useEffect, useReducer } from "react";
// import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
// import { TiTick } from "react-icons/ti";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import style from "./TripForm.module.css";

// /* const EMPTY_STOP = {
//   city: "",
//   sublocation: "",
//   imageUrl: "",
//   description: "",
// };

// const getNewStop = () => ({ ...EMPTY_STOP });

// const EMPTY_TRIP = {
//   country: "",
//   stops: [{ ...EMPTY_STOP }],
// };
//  */
// const TripForm = ({ firstDraft, submit }) => {
//   const initialState = {
//     counter: 0,
//   };
//   const action = {
//     type: "setCounter",
//     type: "decrease",
//     type: "increase",
//   };

//   function reducer(state, action) {
//     let newState;
//     switch (action.type) {
//       case "setCounter":
//         console.log("action.payload ", action.payload);
//         newState = { counter: action.payload };
//         break;
//       case "increase":
//         newState = { counter: state.counter + 1 };
//         break;
//       case "decrease":
//         newState = { counter: state.counter - 1 };
//         break;
//       default:
//         throw new Error();
//     }
//     return newState;
//   }

//   const [state, dispatch] = useReducer(reducer, initialState);

//   const [stops, setStops] = useState(firstDraft?.stops || []);
//   const [country, setCountry] = useState(firstDraft?.country || "");
//   const [city, setCity] = useState(firstDraft?.stops[0].city || "");
//   const [sublocation, setSublocation] = useState(
//     firstDraft?.stops[0].sublocation || ""
//   );
//   const [details, setDetails] = useState(firstDraft?.stops[0].details || "");
//   const [imageUrl, setImageUrl] = useState(firstDraft?.stops[0].imageUrl || "");

//   const addStop = () => {
//     if (!city || !sublocation || !details || !imageUrl) {
//       return alert("All fields should be filled");
//     }
//     setStops((prev) => [
//       ...prev,
//       {
//         city,
//         sublocation,
//         details,
//         imageUrl,
//       },
//     ]);
//     setCity("");
//     setSublocation("");
//     setDetails("");
//     setImageUrl("");
//   };
//   useEffect(() => {
//     if (stops.length && !firstDraft)
//       dispatch({ type: "setCounter", payload: stops.length - 1 });
//   }, [stops.length]);

// /*   useEffect(() => {
//     //console.log("from useEffect", city,sublocation,details,imageUrl)
// /*     console.log("state.counter: ", state.counter);
//     console.log("stops.length: ", stops.length);
 
//     // if(stops.length >= state.counter +1)
//      if (city && sublocation && details && imageUrl && stops.length > state.counter) 
//     {
//       console.log("stops.length: ", stops.length);    
//       console.log(city, sublocation, details, imageUrl);
//       console.log("logged  !firstDraft state.counter", state.counter);

//       const copiedStop = [...stops]

//       copiedStop[state.counter].city = city;
//       copiedStop[state.counter].sublocation = sublocation;
//       copiedStop[state.counter].details = details;
//       copiedStop[state.counter].imageUrl = imageUrl; 
//       setStops(copiedStop)
//     }
//   }, [city, sublocation, details, imageUrl]);
//  */
//   const removeStop = () => {
//     stops.splice(state.counter, 1);
//     setStops([...stops]);
//     if (!stops.length) {
//       setCountry("");
//     }
//     setCity("");
//     setSublocation("");
//     setDetails("");
//     setImageUrl("");
//   };

//   const stepBackwards = () => {
//     if (state.counter) dispatch({ type: "decrease" });
//   };

//   const stepForwards = () => {
//     if (state.counter !== stops.length - 1) dispatch({ type: "increase" });
//   };

//   useEffect(() => {
//     console.log("state.counter: ", state.counter);
//     console.log("stops.length: ", stops.length);
//     //  if(stops.length >)
//     const prevStop = stops[state.counter];
//     if (prevStop) {
//       setCity(prevStop.city);
//       setSublocation(prevStop.sublocation);
//       setDetails(prevStop.details);
//       setImageUrl(prevStop.imageUrl);
//     }
//   }, [state.counter]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ country, stops });
//     // if (!country || !city || !sublocation || !details || !imageUrl) {
//     //     return;
//     // }
//     // submit({country,stops})
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={city} onChange={(e) => setCity(e.target.value)} />
//       <input value={country} onChange={(e) => setCountry(e.target.value)} />
//       <ImageUpload fileUrl={imageUrl} setFileUrl={setImageUrl} />
//       <input
//         value={sublocation}
//         onChange={(e) => setSublocation(e.target.value)}
//       />
//       <input value={details} onChange={(e) => setDetails(e.target.value)} />
//       <button type="button" onClick={removeStop}>
//         <AiOutlineMinus />
//       </button>
//       <button type="button" onClick={addStop}>
//         <AiOutlinePlus />
//       </button>
//       <button type="submit">
//         <TiTick />
//       </button>
//       {state.counter !== 0 && (
//         <button type="button" className={style.back} onClick={stepBackwards}>
//           <IoIosArrowBack />
//         </button>
//       )}
//       {state.counter !== stops.length - 1 && (
//         <button type="button" className={style.back} onClick={stepForwards}>
//           <IoIosArrowForward />
//         </button>
//       )}
//     </form>
//   );
// };

// export default TripForm;