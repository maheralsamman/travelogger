import styles from "./TripCard.module.css";
import { useNavigate } from "react-router-dom";

const TripCard = ({trip}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/trip/${trip._id}`)
    }
    return <div className={styles.card} onClick={handleClick}>Card</div>
}

export default TripCard