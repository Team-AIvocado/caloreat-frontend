export default function SummaryBox({ totalKcal }) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "10px",
        background: "#f3f8f3",
        border: "1px solid #d738d7",
      }}
    >
      <h3 style={{ margin: 0 }}>총 칼로리</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold", margin: "8px 0 0" }}>
        {totalKcal}kcal
      </p>
    </div>
  );
}
