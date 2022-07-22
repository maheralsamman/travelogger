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
    const getOffset = total => total / (stops.length - 1) * index;
    const pinOffsetPercent = getOffset(100);
    const pinOffsetPixels = getOffset(30);
    return (
        <div className={styles.container}>
            <div className={styles.line}/>
            <div className={styles["pin-container"]}>
                <img className={styles.pin} src={pin} alt="pin icon"
                style={{left: `calc(${pinOffsetPercent}% - ${pinOffsetPixels}px)`}}/>
            </div>
            <div className={styles["dot-container"]}>
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