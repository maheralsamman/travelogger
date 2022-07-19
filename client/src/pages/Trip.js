import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from "swiper";
import styles from "./Trip.module.css";
import 'swiper/css';
import "swiper/css/effect-fade";

import Progress from '../components/Progress';

const DUMMY = {
    userId: "s0m3Us3riD",
    country: "England",
    stops: [
        {
            city: "London",
            sublocation: "The London Eye",
            imageUrl: "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg",
            description: "I went to the London Eye and had a totally wonderful time. Oh my God, you don't know how awesome a time I had. It went round and I was really high and then it went down again. Magic.",
        },
        {
            city: "London",
            sublocation: "Piccadilly Circus",
            imageUrl: "https://i.guim.co.uk/img/media/ca46db3a6170eebc0644c3b947cc87d0e19ae999/0_0_3500_2100/master/3500.jpg?width=1300&quality=45&fit=max&dpr=2&s=03c347d80f46b79b881576308c17a22d",
            description: "You know what? In London there's this enormous square, right, and it's garishly bright the whole time and surrounded by nasty franchise restaurants. This certainly is an unmissable tourist attraction."
        },
        {
            city: "Salisbury",
            sublocation: "Stonehenge",
            imageUrl: "https://www.planetware.com/photos-large/ENG/england-stonehenge.jpg",
            description: "I took a bus and there was this enormous pile of stones. What fun! They were all piled up in the middle of a big field. I went and looked at them."
        },
        {
            city: "London",
            sublocation: "Heathrow Airport",
            imageUrl: "https://static01.nyt.com/images/2022/07/12/business/12economy-briefing-heathrow1/merlin_209360577_693cf1c4-3b77-4886-8653-f4f9be651150-superJumbo.jpg",
            description: "Went to the airport, huge queue, but then I did get the flight for €13.75 and it took off at 5:40am on a Tuesday. #backpacklife"
        }
    ]
}

const Trip = () => {
    const navigate = useNavigate();
    const [citySlave, setCitySlave] = useState(null);
    const [backgroundSlave, setBackgroundSlave] = useState(null);
    const [foregroundSlave, setForegroundSlave] = useState(null);
    const [control, setControl] = useState(null);
    const [index, setIndex] = useState(0);

    const [cities, cityIndexes] = (() => {
        const cityAt = index => DUMMY.stops[index].city;
        let cityArray = [cityAt(0)];
        let indexes = [];
        let currentIndex = 0;
        for (let i = 0; i < DUMMY.stops.length; i++) {
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

    const reset = () => {
        setIndex(0);
        control.slideTo(0)
    }

    return (
        <>
            <Swiper
                modules={[EffectFade]}
                onInit={setBackgroundSlave}
                effect="fade"
                className={styles["background-swiper"]}
                allowTouchMove={false}
            >
                {DUMMY.stops.map(stop => (
                    <SwiperSlide key={stop.sublocation}>
                        <img className={styles["background-swiper--image"]} src={stop.imageUrl} alt={stop.sublocation}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.filter}/>
            <div className={styles.container}>
                <button className={styles.back} onClick={() => navigate(-1)}>Back</button>
                <p className={styles.country}>{DUMMY.country}</p>
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
                <Swiper
                    onInit={setForegroundSlave}
                    className={styles["foreground-swiper"]}
                    allowTouchMove={false}
                >
                    {DUMMY.stops.map(stop => (
                        <SwiperSlide key={stop.sublocation}>
                            <img className={styles["foreground-swiper--image"]} src={stop.imageUrl} alt={stop.sublocation}/>
                            <p className={styles.sublocation}>{stop.sublocation}</p>
                            <p className={styles.description}>{stop.description}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Progress stops={DUMMY.stops.map(({city}) => city)} index={index}/>
                {index === DUMMY.stops.length - 1
                    ? <button className={styles.reset} onClick={reset}>Go back to start</button>
                    : null
                }
            </div>
            <Swiper
                onInit={setControl}
                onRealIndexChange={swiper => setIndex(swiper.realIndex)}
                className={styles["control-swiper"]}
            >
                {DUMMY.stops.map((_, i) => <SwiperSlide className={styles["control-swiper--slide"]} key={i}/>)}
            </Swiper>
        </>
    )
}

export default Trip;