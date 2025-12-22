import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function RingProgressBar({ totalkcal, kcal }) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const percentage = (kcal / totalkcal) * 100;

  useEffect(() => {
    setAnimatedPercentage(percentage);
  }, [percentage]);

  const displayPercentage = animatedPercentage;

  const customText = (
    <tspan>
      <tspan
        x="50%"
        dy="-0.2em"
        textAnchor="middle"
        fontSize="20px"
        fontWeight="bold"
        className="fill-primary_text"
      >
        {kcal}
      </tspan>
      <tspan
        x="50%"
        dy="1.5em"
        textAnchor="middle"
        fontSize="9px"
        className="fill-secondary_text"
      >
        /{totalkcal} kcal
      </tspan>
    </tspan>
  );

  return (
    <div style={{ width: 220, height: 220 }}>
      <CircularProgressbar
        value={displayPercentage}
        text={customText}
        styles={buildStyles({
          pathColor: "#3A7DFF",
          trailColor: "#d6d6d6",
          pathTransitionDuration: 1,
        })}
      />
    </div>
  );
}

export default RingProgressBar;
