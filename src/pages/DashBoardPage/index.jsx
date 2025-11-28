import RingProgressBar from "../../components/ProgressBar/RingProgressBar";

export const DashBoardPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <RingProgressBar totalkcal={2400} kcal={300} />
      </div>
    </div>
  );
};
