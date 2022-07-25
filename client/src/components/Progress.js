import styles from "./Progress.module.css";
import pin from "../assets/pin.png";


const Progress = ({stops, index}) => {
    const dotSizes = (() => {
        let sizes = [];
        for (let i = 0; i < stops.length; i++) {
            if (stops[i] === stops[i - 1]) {
                sizes.push("SMALL")
            } else {
                sizes.push("LARGE")
            }
        }
        return sizes;
    })();
    const hasMultipleStops = stops.length > 1
    const getOffset = total => total / (stops.length - 1) * index;
    const pinOffsetPercent = hasMultipleStops ? getOffset(100) : 50;
    const pinOffsetPixels = hasMultipleStops ? getOffset(30) : 15;
    const dotContainerStyle = hasMultipleStops ? null : { justifyContent: "center"}
    return (
        <div className={styles.container}>
            {hasMultipleStops ? <div className={styles.line}/> : null}
            <div className={styles["pin-container"]}>
                <img className={styles.pin} src={pin} alt="pin icon"
                style={{left: `calc(${pinOffsetPercent}% - ${pinOffsetPixels}px)`}}/>
            </div>
            <div className={styles["dot-container"]} style={dotContainerStyle}>
                {dotSizes.map((size, i) => {
                    const dotStyle = size === "SMALL" ? {
                        transform: "scale(0.7)"
                    } : null;
                    return <div key={i} className={styles.dot} style={dotStyle}/>
                })}
            </div>
        </div>
    )
}

export default Progress;