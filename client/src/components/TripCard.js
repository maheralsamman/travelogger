import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./TripCard.module.css";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteTrip } from "../redux/tripSlice";
import { useDispatch } from "react-redux";
import ConfirmModal from "./ConfirmModal";

const TripCard = ({ trip }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const handleClick = () => {
    navigate(`/trip/${trip._id}`);
  };

  const navigateToEdit = (e) => {
    e.stopPropagation()
    navigate(`/edit/${trip._id}`)
  }

  const removeTrip = (e) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const handleModal = confirmed => {
    setShowModal(false);
    if (!confirmed) {
      return;
    }
    dispatch(deleteTrip(trip._id))
  }

  const { user } = useSelector(state => state.user)
  const userTrip = trip.userId === user?.uid;

  return (
    <>
      {showModal ? <ConfirmModal confirm={handleModal}>Delete your trip to {trip.country}?</ConfirmModal> : null}
      <div className={styles.card} onClick={handleClick}>
        <h3 className={styles.card__country}>{trip.country}</h3>
        {userTrip ?
          <>
            <AiOutlineEdit className={styles.card__editIcon} onClick={navigateToEdit} />
            <RiDeleteBin6Line className={styles.card__deleteIcon} onClick={removeTrip} />
          </>
          : ''}
        {trip.stops.length === 1 || trip.stops[0].city === trip.stops.at(-1).city ? (
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
    </>
  );
};

export default TripCard;
