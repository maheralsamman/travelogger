import styles from "./TripCard.module.css";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const TripCard = ({ trip }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/trip/${trip._id}`);
  };
  return (
    <div className={styles.card} onClick={handleClick}>
      <h3 className={styles.card__country}>{trip.country}</h3>
      {trip.stops.length === 1 ? (
        <p  className={styles.card__city}>{trip.stops[0].city}</p>
      ) : (
        <p  className={styles.card__city}>
          {trip.stops[0].city} <BsArrowRight /> {trip.stops.at(-1).city}
        </p>
      )}
      <img className={styles.card__image} src={trip.stops[0].imageUrl} alt={trip.stops[0].city} />
      <p className={styles.card__date} >{new Date(trip.createdAt).toLocaleDateString()}</p>
      <p className={styles.card__userName}>{trip.userName}</p>
    </div>
  );
};

export default TripCard;
