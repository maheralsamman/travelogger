import styles from "./TripCard.module.css";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineEdit } from 'react-icons/ai'

const TripCard = ({ trip, userTrip }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/trip/${trip._id}`);
  };
  
  const navigateToEdit = (e) => {
    e.stopPropagation()
    navigate(`/edit/${trip._id}`)
  }

  return (
      <div className={styles.card} onClick={handleClick}>
        <div className={styles.card__editAndCountry}>
        <h3 className={styles.card__country}>{trip.country}</h3>
        {userTrip ? <AiOutlineEdit className={styles.card__editIcon} onClick={navigateToEdit}/> : ''}
        </div>
        {trip.stops.length === 1 ? (
          <p className={styles.card__city}>{trip.stops[0].city}</p>
        ) : (
          <p className={styles.card__city}>
            {trip.stops[0].city} <BsArrowRight className={styles.card__arrow} /> {trip.stops.at(-1).city}
          </p>
        )}
        <img className={styles.card__image} src={trip.stops[0].imageUrl} alt={trip.stops[0].city} />
        <div className={styles.card__dateAndUser}>
          <p className={styles.card__date} >{new Date(trip.createdAt).toLocaleDateString()}</p>
          <p className={styles.card__userName}>{trip.userName}</p>
        </div>
      </div>
  );
};

export default TripCard;
