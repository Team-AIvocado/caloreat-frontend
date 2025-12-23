export default function SummaryBox({ totalKcal }) {
  return (
    <div className="p-3.5 rounded-[10px] bg-[#f3f8f3] border border-[#d738d7]">
      <h3 className="m-0">총 칼로리</h3>
      <p className="text-2xl font-bold mt-2 mb-0">{totalKcal}kcal</p>
    </div>
  );
}
