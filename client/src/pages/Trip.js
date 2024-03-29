import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { onboard, selectUser } from '../redux/userSlice';
import { selectTrip } from '../redux/tripSlice';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from "swiper";
import 'swiper/css';
import "swiper/css/effect-fade";

// icons
import {IoIosArrowBack} from 'react-icons/io'
import { VscDebugRestart } from 'react-icons/vsc';

// styles
import styles from "./Trip.module.css";

// components
import Progress from '../components/Progress';
import SwiperOnboard from '../components/SwiperOnboard';

// const DUMMY = {
//     userId: "s0m3Us3riD",
//     country: "England",
//     stops: [
//         {
//             city: "London",
//             sublocation: "The London Eye",
//             imageUrl: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg",
//             description: "I went to the London Eye and had a totally wonderful time. Oh my God, you don't know how awesome a time I had. It went round and I was really high and then it went down again. Magic.",
//         },
//         {
//             city: "London",
//             sublocation: "Piccadilly Circus",
//             imageUrl: "https://i.guim.co.uk/img/media/ca46db3a6170eebc0644c3b947cc87d0e19ae999/0_0_3500_2100/master/3500.jpg?width=1300&quality=45&fit=max&dpr=2&s=03c347d80f46b79b881576308c17a22d",
//             description: "You know what? In London there's this enormous square, right, and it's garishly bright the whole time and surrounded by nasty franchise restaurants. This certainly is an unmissable tourist attraction."
//         },
//         {
//             city: "Salisbury",
//             sublocation: "Stonehenge",
//             imageUrl: "https://www.planetware.com/photos-large/ENG/england-stonehenge.jpg",
//             description: "I took a bus and there was this enormous pile of stones. What fun! They were all piled up in the middle of a big field. I went and looked at them."
//         },
//         {
//             city: "London",
//             sublocation: "Heathrow Airport",
//             imageUrl: "https://static01.nyt.com/images/2022/07/12/business/12economy-briefing-heathrow1/merlin_209360577_693cf1c4-3b77-4886-8653-f4f9be651150-superJumbo.jpg",
//             description: "Went to the airport, huge queue, but then I did get the flight for €13.75 and it took off at 5:40am on a Tuesday. #backpacklife"
//         }
//     ]
// }

const Trip = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { onboarded } = useSelector(selectUser);

    const { tripId } = useParams();
    const thisTrip = useSelector(selectTrip(tripId));
    if (!thisTrip) {
        navigate(-1)
    }

    const [onboarding, setOnboarding] = useState(false)

    const [citySlave, setCitySlave] = useState(null);
    const [backgroundSlave, setBackgroundSlave] = useState(null);
    const [foregroundSlave, setForegroundSlave] = useState(null);
    const [control, setControl] = useState(null);
    
    const [index, setIndex] = useState(0);

    const [cities, cityIndexes] = (() => {
        const cityAt = index => thisTrip.stops[index].city;
        let cityArray = [cityAt(0)];
        let indexes = [];
        let currentIndex = 0;
        for (let i = 0; i < thisTrip.stops.length; i++) {
            if (cityAt(i) !== cityArray.at(-1)) {
                currentIndex += 1;
                cityArray.push(cityAt(i))
            }
            indexes.push(currentIndex);
        }
        return [ cityArray, indexes ]
    })();

    useEffect(() => {
        if ([citySlave, backgroundSlave, foregroundSlave, control].some(slave => !slave)) {
            return;
        };
        citySlave.slideTo(cityIndexes[index]);
        [backgroundSlave, foregroundSlave].forEach(slave => slave.slideTo(index));
    }, [index])
    
    useEffect(() => {
        if (onboarded || thisTrip.stops.length === 1) {
            return;
        }
        setOnboarding(true)
        setTimeout(() => {
            setOnboarding(false)
            dispatch(onboard())
        }, 2300)
    }, [])

    const reset = () => {
        setIndex(0);
        control.slideTo(0)
    }

    return (
        <>
            <div className={styles.backButton} onClick={() => navigate(-1)}>
                <IoIosArrowBack/>
            </div>
            <button className={styles.reset} disabled={!index} style={{opacity: index ? "1" : "0"}} onClick={reset}><VscDebugRestart/></button>
            <Swiper
                modules={[EffectFade]}
                onInit={setBackgroundSlave}
                effect="fade"
                className={styles["background-swiper"]}
                allowTouchMove={false}
            >
                {thisTrip.stops.map((stop, i) => (
                    <SwiperSlide key={`${stop.sublocation}${i}`}>
                        <img className={styles["background-swiper--image"]} src={stop.imageUrl} alt={stop.sublocation}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.filter}/>
            <div className={styles.container}>
                <Swiper
                    onInit={setCitySlave}
                    allowTouchMove={false}
                    className={styles["city-swiper"]}
                >
                    {cities.map((city, i) => (
                        <SwiperSlide key={`${city}${i}`}>
                            <p className={styles.city}>{city}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <p className={styles.country}>{thisTrip.country}</p>
                <Swiper
                    onInit={setForegroundSlave}
                    className={styles["foreground-swiper"]}
                    allowTouchMove={false}
                >
                    {thisTrip.stops.map((stop, i) => (
                        <SwiperSlide key={`${stop.sublocation}${i}`}>
                            <div className={styles["foreground-slide-container"]}>
                                <div className={styles["foreground-slide__image-container"]}>
                                    <img className={styles["foreground-swiper--image"]} src={stop.imageUrl} alt={stop.sublocation}/>
                                </div>
                                <p className={styles.sublocation}>{stop.sublocation}</p>
                                <p className={styles.description}>{stop.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Progress stops={thisTrip.stops.map(({city}) => city)} index={index}/>
            </div>
            <Swiper
                onInit={setControl}
                onRealIndexChange={swiper => setIndex(swiper.realIndex)}
                className={styles["control-swiper"]}
            >
                {thisTrip.stops.map((_, i) => <SwiperSlide className={styles["control-swiper--slide"]} key={i}/>)}
            </Swiper>
            {onboarding ? <SwiperOnboard/> : null}
        </>
    )
}

export default Trip;