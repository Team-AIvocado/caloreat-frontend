import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function RingProgressBar({ totalkcal, kcal }) {
  const percentage = (kcal / totalkcal) * 100;

  const customText = (
    <tspan>
      <tspan
        dx="3"
        font-size="20px"
        style={{ fill: "#1D2E50", fontWeight: "bold" }}
      >
        {kcal}
      </tspan>
      <tspan dx="-16" dy="12" fontSize="9px" style={{ fill: "#6C6C6C" }}>
        /{totalkcal} kcal
      </tspan>
    </tspan>
  );

  return (
    <div style={{ width: 220, height: 220 }}>
      <CircularProgressbar
        value={percentage}
        text={customText}
        styles={buildStyles({
          pathColor: "#3A7DFF",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
}

export default RingProgressBar;
