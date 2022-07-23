import { useState, useEffect } from "react";
import TripCard from "../components/TripCard";
import { useSelector, useDispatch } from "react-redux";
import SearchTrips from "../components/SearchTrips";
import style from './AllTrips.module.css'
import { selectTrips, getAlltrips } from "../redux/tripSlice"
import DotLoader from "react-spinners/DotLoader";



/* const DUMMY = {
    userId: "s0m3Us3riD",
    country: "England",
    _id: "ojkaefpjawokgj",
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
 */
const AllTrips = () => {
    const dispatch = useDispatch()

    useEffect(() => {
           dispatch(getAlltrips())
      }, []); 
    const [search, setSearch] = useState("");

  const  trips  = useSelector(selectTrips(search));
  console.log(trips)

  return (
    <>
    <SearchTrips setSearch={setSearch} />
    <div className={style.tripsContainer}>
    
   {!trips.length ? (
    <div className={style.loading}>
    <DotLoader loading={true} size={150} color="#0091ad"/>
    </div>
      ) : (
        trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
      )} 
     </div> 
    </>
  );
};

export default AllTrips;
